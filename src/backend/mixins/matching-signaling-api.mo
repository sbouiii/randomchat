import Types "../types/matching-signaling";
import Lib "../lib/matching-signaling";
import Queue "mo:core/Queue";
import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";

mixin (
  matchQueue : Queue.Queue<Types.QueueEntry>,
  inQueue : Map.Map<Types.UserId, Bool>,
  sessions : Map.Map<Types.SessionId, Types.Session>,
  signalingStore : Map.Map<Types.SessionId, List.List<Types.SignalingEnvelope>>,
  nextSessionId : [var Nat],
) {

  /// Join the random match queue. Returns queue position (1-based).
  public shared ({ caller }) func enterQueue() : async Nat {
    Lib.enterQueue(matchQueue, inQueue, sessions, caller);
  };

  /// Leave the match queue.
  public shared ({ caller }) func leaveQueue() : async () {
    Lib.leaveQueue(matchQueue, inQueue, caller);
  };

  /// Poll for match status. Triggers random pairing when 2+ users are queued.
  public shared ({ caller }) func checkMatch() : async Types.MatchResult {
    let (result, newId) = Lib.checkMatch(
      matchQueue,
      inQueue,
      sessions,
      signalingStore,
      nextSessionId[0],
      caller,
    );
    nextSessionId[0] := newId;
    result;
  };

  /// Send a WebRTC offer SDP to the peer in a session.
  public shared ({ caller }) func sendOffer(sessionId : Types.SessionId, sdp : Text) : async () {
    Lib.sendOffer(sessions, signalingStore, sessionId, sdp, caller);
  };

  /// Send a WebRTC answer SDP to the peer in a session.
  public shared ({ caller }) func sendAnswer(sessionId : Types.SessionId, sdp : Text) : async () {
    Lib.sendAnswer(sessions, signalingStore, sessionId, sdp, caller);
  };

  /// Send an ICE candidate to the peer in a session.
  public shared ({ caller }) func sendIceCandidate(
    sessionId : Types.SessionId,
    candidate : Text,
    sdpMid : ?Text,
    sdpMLineIndex : ?Nat,
  ) : async () {
    Lib.sendIceCandidate(sessions, signalingStore, sessionId, candidate, sdpMid, sdpMLineIndex, caller);
  };

  /// Poll for pending signaling messages from the peer in a session.
  public shared ({ caller }) func pollSignaling(sessionId : Types.SessionId) : async [Types.SignalingEnvelope] {
    Lib.pollSignaling(sessions, signalingStore, sessionId, caller);
  };

  /// End the session and clean up all ephemeral data.
  public shared ({ caller }) func endSession(sessionId : Types.SessionId) : async () {
    Lib.endSession(sessions, signalingStore, sessionId, caller);
  };

  /// Get the connection status of a session (is peer still active?).
  public shared ({ caller }) func getSessionStatus(sessionId : Types.SessionId) : async Types.SessionStatus {
    Lib.getSessionStatus(sessions, sessionId, caller);
  };
};
