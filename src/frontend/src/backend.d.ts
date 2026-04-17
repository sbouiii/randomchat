import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = Principal;
export type Timestamp = bigint;
export type SignalingMsg = {
    __kind__: "iceCandidate";
    iceCandidate: {
        candidate: string;
        sdpMid?: string;
        sdpMLineIndex?: bigint;
    };
} | {
    __kind__: "offer";
    offer: {
        sdp: string;
    };
} | {
    __kind__: "answer";
    answer: {
        sdp: string;
    };
};
export type MatchResult = {
    __kind__: "matched";
    matched: {
        peerId: UserId;
        sessionId: SessionId;
    };
} | {
    __kind__: "waiting";
    waiting: {
        position: bigint;
    };
};
export type SessionStatus = {
    __kind__: "active";
    active: {
        peerConnected: boolean;
    };
} | {
    __kind__: "notFound";
    notFound: null;
};
export interface SignalingEnvelope {
    msg: SignalingMsg;
    from: UserId;
    sentAt: Timestamp;
}
export type SessionId = string;
export interface backendInterface {
    checkMatch(): Promise<MatchResult>;
    endSession(sessionId: SessionId): Promise<void>;
    enterQueue(): Promise<bigint>;
    getSessionStatus(sessionId: SessionId): Promise<SessionStatus>;
    leaveQueue(): Promise<void>;
    pollSignaling(sessionId: SessionId): Promise<Array<SignalingEnvelope>>;
    sendAnswer(sessionId: SessionId, sdp: string): Promise<void>;
    sendIceCandidate(sessionId: SessionId, candidate: string, sdpMid: string | null, sdpMLineIndex: bigint | null): Promise<void>;
    sendOffer(sessionId: SessionId, sdp: string): Promise<void>;
}
