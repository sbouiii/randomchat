import { useActor } from "@caffeineai/core-infrastructure";
import { useCallback } from "react";
import { createActor } from "../backend";
import type {
  MatchResult,
  SessionId,
  SessionStatus,
  SignalingEnvelope,
  SignalingMsg,
} from "../types";

// ─── Raw Candid shapes returned by the backend ──────────────────────────────

type RawMatchResult =
  | { waiting: { position: bigint } }
  | { matched: { sessionId: string; peerId: string } };

type RawSessionStatus =
  | { active: { peerConnected: boolean } }
  | { notFound: null };

type RawSignalingMsg =
  | { offer: { sdp: string } }
  | { answer: { sdp: string } }
  | {
      iceCandidate: {
        candidate: string;
        sdpMid: [] | [string];
        sdpMLineIndex: [] | [bigint];
      };
    };

interface RawSignalingEnvelope {
  from: string;
  msg: RawSignalingMsg;
  sentAt: bigint;
}

interface BackendMethods {
  enterQueue: () => Promise<bigint>;
  leaveQueue: () => Promise<void>;
  checkMatch: () => Promise<RawMatchResult>;
  sendOffer: (sessionId: string, sdp: string) => Promise<void>;
  sendAnswer: (sessionId: string, sdp: string) => Promise<void>;
  sendIceCandidate: (
    sessionId: string,
    candidate: string,
    sdpMid: [] | [string],
    sdpMLineIndex: [] | [bigint],
  ) => Promise<void>;
  pollSignaling: (sessionId: string) => Promise<RawSignalingEnvelope[]>;
  endSession: (sessionId: string) => Promise<void>;
  getSessionStatus: (sessionId: string) => Promise<RawSessionStatus>;
}

// ─── Converters ─────────────────────────────────────────────────────────────

function convertMatchResult(raw: RawMatchResult): MatchResult {
  if ("waiting" in raw) {
    return { kind: "waiting", position: Number(raw.waiting.position) };
  }
  return {
    kind: "matched",
    sessionId: raw.matched.sessionId,
    peerId: raw.matched.peerId,
  };
}

function convertSessionStatus(raw: RawSessionStatus): SessionStatus {
  if ("active" in raw) {
    return { kind: "active", peerConnected: raw.active.peerConnected };
  }
  return { kind: "notFound" };
}

function convertSignalingMsg(raw: RawSignalingMsg): SignalingMsg {
  if ("offer" in raw) return { kind: "offer", sdp: raw.offer.sdp };
  if ("answer" in raw) return { kind: "answer", sdp: raw.answer.sdp };
  const ic = raw.iceCandidate;
  return {
    kind: "iceCandidate",
    candidate: ic.candidate,
    sdpMid: ic.sdpMid.length > 0 ? ic.sdpMid[0] : undefined,
    sdpMLineIndex:
      ic.sdpMLineIndex.length > 0 ? Number(ic.sdpMLineIndex[0]) : undefined,
  };
}

function convertEnvelopes(raw: RawSignalingEnvelope[]): SignalingEnvelope[] {
  return raw.map((e) => ({
    from: e.from,
    msg: convertSignalingMsg(e.msg),
    sentAt: e.sentAt,
  }));
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useBackend() {
  const { actor: rawActor, isFetching } = useActor(createActor);
  // Cast to the real backend methods shape (generated _SERVICE is currently empty)
  const actor = rawActor as unknown as BackendMethods | null;

  const enterQueue = useCallback(async (): Promise<number> => {
    if (!actor) throw new Error("Not authenticated");
    const result = await actor.enterQueue();
    return Number(result);
  }, [actor]);

  const leaveQueue = useCallback(async (): Promise<void> => {
    if (!actor) throw new Error("Not authenticated");
    await actor.leaveQueue();
  }, [actor]);

  const checkMatch = useCallback(async (): Promise<MatchResult> => {
    if (!actor) throw new Error("Not authenticated");
    const raw = await actor.checkMatch();
    return convertMatchResult(raw);
  }, [actor]);

  const sendOffer = useCallback(
    async (sessionId: SessionId, sdp: string): Promise<void> => {
      if (!actor) throw new Error("Not authenticated");
      await actor.sendOffer(sessionId, sdp);
    },
    [actor],
  );

  const sendAnswer = useCallback(
    async (sessionId: SessionId, sdp: string): Promise<void> => {
      if (!actor) throw new Error("Not authenticated");
      await actor.sendAnswer(sessionId, sdp);
    },
    [actor],
  );

  const sendIceCandidate = useCallback(
    async (
      sessionId: SessionId,
      candidate: string,
      sdpMid?: string,
      sdpMLineIndex?: number,
    ): Promise<void> => {
      if (!actor) throw new Error("Not authenticated");
      const mid: [] | [string] = sdpMid !== undefined ? [sdpMid] : [];
      const idx: [] | [bigint] =
        sdpMLineIndex !== undefined ? [BigInt(sdpMLineIndex)] : [];
      await actor.sendIceCandidate(sessionId, candidate, mid, idx);
    },
    [actor],
  );

  const pollSignaling = useCallback(
    async (sessionId: SessionId): Promise<SignalingEnvelope[]> => {
      if (!actor) throw new Error("Not authenticated");
      const raw = await actor.pollSignaling(sessionId);
      return convertEnvelopes(raw);
    },
    [actor],
  );

  const endSession = useCallback(
    async (sessionId: SessionId): Promise<void> => {
      if (!actor) throw new Error("Not authenticated");
      await actor.endSession(sessionId);
    },
    [actor],
  );

  const getSessionStatus = useCallback(
    async (sessionId: SessionId): Promise<SessionStatus> => {
      if (!actor) throw new Error("Not authenticated");
      const raw = await actor.getSessionStatus(sessionId);
      return convertSessionStatus(raw);
    },
    [actor],
  );

  return {
    isReady: !!actor && !isFetching,
    enterQueue,
    leaveQueue,
    checkMatch,
    sendOffer,
    sendAnswer,
    sendIceCandidate,
    pollSignaling,
    endSession,
    getSessionStatus,
  };
}
