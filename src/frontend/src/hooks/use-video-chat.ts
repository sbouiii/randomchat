import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useCallback, useRef, useState } from "react";
import type { ChatMessage, SessionId, UserId } from "../types";
import { useBackend } from "./use-backend";
import { useMatchmaking } from "./use-matchmaking";

export type VideoChatPhase =
  | "idle"
  | "waiting"
  | "connecting"
  | "chatting"
  | "ended";

export interface VideoChatSession {
  sessionId: SessionId;
  peerId: UserId;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isMuted: boolean;
  isVideoOff: boolean;
  messages: ChatMessage[];
}

const ICE_SERVERS: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
];

const SIGNALING_POLL_MS = 1500;

export function useVideoChat() {
  const backend = useBackend();
  const matchmaking = useMatchmaking();
  const { identity } = useInternetIdentity();

  const [phase, setPhase] = useState<VideoChatPhase>("idle");
  const [session, setSession] = useState<VideoChatSession | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const sessionIdRef = useRef<SessionId | null>(null);
  const peerIdRef = useRef<UserId | null>(null);
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const processedRef = useRef<Set<string>>(new Set());
  const remoteDescSetRef = useRef(false);
  const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);

  const stopPolling = useCallback(() => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  }, []);

  const cleanupPC = useCallback(() => {
    stopPolling();
    if (localStreamRef.current) {
      for (const t of localStreamRef.current.getTracks()) t.stop();
    }
    pcRef.current?.close();
    pcRef.current = null;
    localStreamRef.current = null;
    remoteStreamRef.current = null;
    processedRef.current.clear();
    remoteDescSetRef.current = false;
    pendingCandidatesRef.current = [];
  }, [stopPolling]);

  const updateSessionStreams = useCallback(() => {
    setSession((prev) =>
      prev
        ? {
            ...prev,
            localStream: localStreamRef.current,
            remoteStream: remoteStreamRef.current,
          }
        : prev,
    );
  }, []);

  const startRTC = useCallback(
    async (sessionId: SessionId, peerId: UserId, isOfferer: boolean) => {
      sessionIdRef.current = sessionId;
      peerIdRef.current = peerId;
      remoteDescSetRef.current = false;
      pendingCandidatesRef.current = [];

      // Acquire local media
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
      } catch {
        stream = new MediaStream();
      }
      localStreamRef.current = stream;

      const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
      pcRef.current = pc;

      for (const track of stream.getTracks()) pc.addTrack(track, stream);

      const remote = new MediaStream();
      remoteStreamRef.current = remote;
      pc.ontrack = (e) => {
        for (const t of e.streams[0]?.getTracks() ?? []) remote.addTrack(t);
        updateSessionStreams();
      };

      pc.onicecandidate = async (e) => {
        if (!e.candidate || !sessionIdRef.current) return;
        await backend.sendIceCandidate(
          sessionIdRef.current,
          e.candidate.candidate,
          e.candidate.sdpMid ?? undefined,
          e.candidate.sdpMLineIndex ?? undefined,
        );
      };

      pc.onconnectionstatechange = () => {
        if (pc.connectionState === "connected") {
          setPhase("chatting");
        } else if (
          ["disconnected", "failed", "closed"].includes(pc.connectionState)
        ) {
          stopPolling();
          setPhase("ended");
        }
      };

      const sess: VideoChatSession = {
        sessionId,
        peerId,
        localStream: stream,
        remoteStream: remote,
        isMuted: false,
        isVideoOff: false,
        messages: [],
      };
      setSession(sess);
      setPhase("connecting");
      setMessages([]);

      // Start signaling poll
      pollTimerRef.current = setInterval(async () => {
        if (!sessionIdRef.current) return;
        try {
          const envelopes = await backend.pollSignaling(sessionIdRef.current);
          for (const envelope of envelopes) {
            const key = `${envelope.from}-${envelope.sentAt}`;
            if (processedRef.current.has(key)) continue;
            processedRef.current.add(key);

            const { msg } = envelope;

            if (msg.kind === "offer" && !isOfferer) {
              await pc.setRemoteDescription({ type: "offer", sdp: msg.sdp });
              remoteDescSetRef.current = true;
              for (const c of pendingCandidatesRef.current) {
                await pc
                  .addIceCandidate(new RTCIceCandidate(c))
                  .catch(() => {});
              }
              pendingCandidatesRef.current = [];
              const answer = await pc.createAnswer();
              await pc.setLocalDescription(answer);
              await backend.sendAnswer(sessionId, answer.sdp ?? "");
            }

            if (msg.kind === "answer" && isOfferer) {
              await pc.setRemoteDescription({ type: "answer", sdp: msg.sdp });
              remoteDescSetRef.current = true;
              for (const c of pendingCandidatesRef.current) {
                await pc
                  .addIceCandidate(new RTCIceCandidate(c))
                  .catch(() => {});
              }
              pendingCandidatesRef.current = [];
            }

            if (msg.kind === "iceCandidate") {
              const init: RTCIceCandidateInit = {
                candidate: msg.candidate,
                sdpMid: msg.sdpMid,
                sdpMLineIndex: msg.sdpMLineIndex,
              };
              if (remoteDescSetRef.current) {
                await pc
                  .addIceCandidate(new RTCIceCandidate(init))
                  .catch(() => {});
              } else {
                pendingCandidatesRef.current.push(init);
              }
            }
          }
        } catch {
          // Network hiccup
        }
      }, SIGNALING_POLL_MS);

      // Create and send offer if offerer
      if (isOfferer) {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        await backend.sendOffer(sessionId, offer.sdp ?? "");
      }
    },
    [backend, stopPolling, updateSessionStreams],
  );

  const start = useCallback(async () => {
    if (phase !== "idle" && phase !== "ended") return;
    setPhase("waiting");
    await matchmaking.enterQueue();
  }, [phase, matchmaking]);

  // React to matchmaking state changes
  const prevMatchStateRef = useRef(matchmaking.state.status);
  if (matchmaking.state.status !== prevMatchStateRef.current) {
    prevMatchStateRef.current = matchmaking.state.status;
    if (matchmaking.state.status === "matched") {
      const { sessionId, peerId } = matchmaking.state;
      // Determine offerer: compare own principal string vs peer principal string
      const ownPrincipal = identity?.getPrincipal().toText() ?? "";
      const isOfferer = ownPrincipal < peerId;
      void startRTC(sessionId, peerId, isOfferer);
    }
  }

  const hangUp = useCallback(async () => {
    const sid = sessionIdRef.current;
    cleanupPC();
    sessionIdRef.current = null;
    peerIdRef.current = null;
    if (sid) {
      await backend.endSession(sid).catch(() => {});
    }
    setSession(null);
    setPhase("ended");
  }, [backend, cleanupPC]);

  const skipToNext = useCallback(async () => {
    await hangUp();
    // Brief pause then re-enter queue
    setTimeout(() => {
      setPhase("idle");
    }, 500);
  }, [hangUp]);

  const reset = useCallback(() => {
    cleanupPC();
    sessionIdRef.current = null;
    peerIdRef.current = null;
    setSession(null);
    setPhase("idle");
    setMessages([]);
    setIsMuted(false);
    setIsVideoOff(false);
  }, [cleanupPC]);

  const toggleMute = useCallback(() => {
    if (localStreamRef.current) {
      const audio = localStreamRef.current.getAudioTracks();
      const next = !isMuted;
      for (const t of audio) t.enabled = !next;
      setIsMuted(next);
    }
  }, [isMuted]);

  const toggleVideo = useCallback(() => {
    if (localStreamRef.current) {
      const video = localStreamRef.current.getVideoTracks();
      const next = !isVideoOff;
      for (const t of video) t.enabled = !next;
      setIsVideoOff(next);
    }
  }, [isVideoOff]);

  const sendMessage = useCallback((text: string) => {
    const msg: ChatMessage = {
      id: `${Date.now()}`,
      from: "me",
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, msg]);
    // In a real app we'd relay this through the signaling channel
  }, []);

  return {
    phase,
    session,
    isMuted,
    isVideoOff,
    messages,
    start,
    hangUp,
    skipToNext,
    reset,
    toggleMute,
    toggleVideo,
    sendMessage,
    matchmakingState: matchmaking.state,
  };
}
