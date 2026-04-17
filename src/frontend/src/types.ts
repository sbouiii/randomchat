// ─── Shared App Types ────────────────────────────────────────────────────────

export type UserId = string;
export type SessionId = string;
export type Timestamp = bigint;

/** Matchmaking result from the backend */
export type MatchResult =
  | { kind: "waiting"; position: number }
  | { kind: "matched"; sessionId: SessionId; peerId: UserId };

/** Session lifecycle status */
export type SessionStatus =
  | { kind: "active"; peerConnected: boolean }
  | { kind: "notFound" };

/** WebRTC signaling messages exchanged via backend relay */
export type SignalingMsg =
  | { kind: "offer"; sdp: string }
  | { kind: "answer"; sdp: string }
  | {
      kind: "iceCandidate";
      candidate: string;
      sdpMid?: string;
      sdpMLineIndex?: number;
    };

/** Envelope wrapping a signaling message with metadata */
export interface SignalingEnvelope {
  from: UserId;
  msg: SignalingMsg;
  sentAt: Timestamp;
}

/** Top-level app state machine */
export type AppState =
  | "idle"
  | "authenticating"
  | "home"
  | "waiting"
  | "connecting"
  | "chatting"
  | "ended";

/** A single text chat message */
export interface ChatMessage {
  id: string;
  from: "me" | "peer";
  text: string;
  timestamp: Date;
}

/** Full video session state passed to chat page */
export interface VideoSession {
  sessionId: SessionId;
  peerId: UserId;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isMuted: boolean;
  isVideoOff: boolean;
  messages: ChatMessage[];
}
