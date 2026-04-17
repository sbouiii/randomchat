import { useCallback, useEffect, useRef, useState } from "react";
import type { SessionId, SignalingEnvelope } from "../types";
import { useBackend } from "./use-backend";

export type WebRTCState =
  | "idle"
  | "creating-offer"
  | "waiting-answer"
  | "connecting"
  | "connected"
  | "failed"
  | "closed";

interface UseWebRTCOptions {
  sessionId: SessionId;
  isOfferer: boolean;
  onConnected?: () => void;
  onDisconnected?: () => void;
}

const ICE_SERVERS: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
];

const SIGNALING_POLL_MS = 1500;

export function useWebRTC({
  sessionId,
  isOfferer,
  onConnected,
  onDisconnected,
}: UseWebRTCOptions) {
  const backend = useBackend();
  const [state, setState] = useState<WebRTCState>("idle");
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const processedMsgsRef = useRef<Set<string>>(new Set());
  const remoteDescSetRef = useRef(false);
  const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);

  const stopPolling = useCallback(() => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  }, []);

  const flushPendingCandidates = useCallback(async (pc: RTCPeerConnection) => {
    for (const c of pendingCandidatesRef.current) {
      await pc.addIceCandidate(new RTCIceCandidate(c)).catch(() => {});
    }
    pendingCandidatesRef.current = [];
  }, []);

  const handleSignalingMessages = useCallback(
    async (envelopes: SignalingEnvelope[]) => {
      const pc = pcRef.current;
      if (!pc) return;

      for (const envelope of envelopes) {
        const key = `${envelope.from}-${envelope.sentAt}`;
        if (processedMsgsRef.current.has(key)) continue;
        processedMsgsRef.current.add(key);

        const { msg } = envelope;

        if (msg.kind === "offer" && !isOfferer) {
          await pc.setRemoteDescription({ type: "offer", sdp: msg.sdp });
          remoteDescSetRef.current = true;
          await flushPendingCandidates(pc);
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          await backend.sendAnswer(sessionId, answer.sdp ?? "");
          setState("waiting-answer");
        }

        if (msg.kind === "answer" && isOfferer) {
          await pc.setRemoteDescription({ type: "answer", sdp: msg.sdp });
          remoteDescSetRef.current = true;
          await flushPendingCandidates(pc);
        }

        if (msg.kind === "iceCandidate") {
          const init: RTCIceCandidateInit = {
            candidate: msg.candidate,
            sdpMid: msg.sdpMid,
            sdpMLineIndex: msg.sdpMLineIndex,
          };
          if (remoteDescSetRef.current) {
            await pc.addIceCandidate(new RTCIceCandidate(init)).catch(() => {});
          } else {
            pendingCandidatesRef.current.push(init);
          }
        }
      }
    },
    [isOfferer, sessionId, backend, flushPendingCandidates],
  );

  const startPolling = useCallback(() => {
    pollTimerRef.current = setInterval(async () => {
      try {
        const envelopes = await backend.pollSignaling(sessionId);
        await handleSignalingMessages(envelopes);
      } catch {
        // Network hiccup
      }
    }, SIGNALING_POLL_MS);
  }, [backend, sessionId, handleSignalingMessages]);

  const start = useCallback(async () => {
    // Get local media
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
    } catch {
      stream = new MediaStream();
    }
    setLocalStream(stream);

    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    pcRef.current = pc;

    // Add local tracks
    for (const track of stream.getTracks()) pc.addTrack(track, stream);

    // Remote stream
    const remoteMs = new MediaStream();
    setRemoteStream(remoteMs);
    pc.ontrack = (e) => {
      for (const t of e.streams[0]?.getTracks() ?? []) remoteMs.addTrack(t);
    };

    // ICE candidates
    pc.onicecandidate = async (e) => {
      if (!e.candidate) return;
      await backend.sendIceCandidate(
        sessionId,
        e.candidate.candidate,
        e.candidate.sdpMid ?? undefined,
        e.candidate.sdpMLineIndex ?? undefined,
      );
    };

    // Connection state
    pc.onconnectionstatechange = () => {
      if (pc.connectionState === "connected") {
        setState("connected");
        onConnected?.();
      } else if (
        ["disconnected", "failed", "closed"].includes(pc.connectionState)
      ) {
        setState(pc.connectionState === "failed" ? "failed" : "closed");
        onDisconnected?.();
        stopPolling();
      }
    };

    setState("connecting");
    startPolling();

    // Offerer creates and sends offer
    if (isOfferer) {
      setState("creating-offer");
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      await backend.sendOffer(sessionId, offer.sdp ?? "");
      setState("waiting-answer");
    }
  }, [
    isOfferer,
    sessionId,
    backend,
    startPolling,
    stopPolling,
    onConnected,
    onDisconnected,
  ]);

  const close = useCallback(() => {
    stopPolling();
    if (localStream) {
      for (const t of localStream.getTracks()) t.stop();
    }
    pcRef.current?.close();
    pcRef.current = null;
    setLocalStream(null);
    setRemoteStream(null);
    setState("closed");
  }, [localStream, stopPolling]);

  const toggleMute = useCallback(() => {
    if (localStream) {
      for (const t of localStream.getAudioTracks()) t.enabled = !t.enabled;
    }
  }, [localStream]);

  const toggleVideo = useCallback(() => {
    if (localStream) {
      for (const t of localStream.getVideoTracks()) t.enabled = !t.enabled;
    }
  }, [localStream]);

  // Cleanup on unmount
  useEffect(
    () => () => {
      stopPolling();
      pcRef.current?.close();
    },
    [stopPolling],
  );

  return {
    state,
    localStream,
    remoteStream,
    start,
    close,
    toggleMute,
    toggleVideo,
  };
}
