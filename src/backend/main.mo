import Types "types/matching-signaling";
import MatchingSignalingApi "mixins/matching-signaling-api";
import Queue "mo:core/Queue";
import Map "mo:core/Map";
import List "mo:core/List";

actor {
  let matchQueue = Queue.empty<Types.QueueEntry>();
  let inQueue = Map.empty<Types.UserId, Bool>();
  let sessions = Map.empty<Types.SessionId, Types.Session>();
  let signalingStore = Map.empty<Types.SessionId, List.List<Types.SignalingEnvelope>>();
  let nextSessionId = [var 0 : Nat];

  include MatchingSignalingApi(matchQueue, inQueue, sessions, signalingStore, nextSessionId);
};
