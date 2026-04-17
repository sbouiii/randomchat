import type { backendInterface } from "../backend";

export const mockBackend: backendInterface = {
  checkMatch: async () => ({
    __kind__: "waiting",
    waiting: { position: BigInt(1) },
  }),
  endSession: async (_sessionId) => undefined,
  enterQueue: async () => BigInt(1),
  getSessionStatus: async (_sessionId) => ({
    __kind__: "active",
    active: { peerConnected: true },
  }),
  leaveQueue: async () => undefined,
  pollSignaling: async (_sessionId) => [],
  sendAnswer: async (_sessionId, _sdp) => undefined,
  sendIceCandidate: async (_sessionId, _candidate, _sdpMid, _sdpMLineIndex) => undefined,
  sendOffer: async (_sessionId, _sdp) => undefined,
};
