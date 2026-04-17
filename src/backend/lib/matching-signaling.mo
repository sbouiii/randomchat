import Types "../types/matching-signaling";
import Queue "mo:core/Queue";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Int "mo:core/Int";

module {
  // Session timeout: 10 minutes in nanoseconds
  public let SESSION_TIMEOUT_NS : Int = 600_000_000_000;

  // Build a session ID from counter
  func makeSessionId(counter : Nat) : Types.SessionId {
    "session-" # counter.toText();
  };

  // Append a signaling message to the store for the given session
  func appendSignaling(
    signalingStore : Map.Map<Types.SessionId, List.List<Types.SignalingEnvelope>>,
    sessionId : Types.SessionId,
    envelope : Types.SignalingEnvelope,
  ) {
    switch (signalingStore.get(sessionId)) {
      case (?msgs) { msgs.add(envelope) };
      case null {
        let msgs = List.empty<Types.SignalingEnvelope>();
        msgs.add(envelope);
        signalingStore.add(sessionId, msgs);
      };
    };
  };

  /// Add a user to the matching queue. Returns queue position (1-based).
  public func enterQueue(
    matchQueue : Queue.Queue<Types.QueueEntry>,
    inQueue : Map.Map<Types.UserId, Bool>,
    sessions : Map.Map<Types.SessionId, Types.Session>,
    caller : Types.UserId,
  ) : Nat {
    // If already in queue, return current position
    switch (inQueue.get(caller)) {
      case (?true) {
        // Find position in queue
        var pos = 0;
        var found = false;
        for (entry in matchQueue.values()) {
          if (not found) {
            pos += 1;
            if (Principal.equal(entry.userId, caller)) { found := true };
          };
        };
        return pos;
      };
      case (_) {};
    };

    // Add to queue
    let entry : Types.QueueEntry = {
      userId = caller;
      joinedAt = Time.now();
    };
    matchQueue.pushBack(entry);
    inQueue.add(caller, true);

    // Return position (size of queue after adding)
    matchQueue.size();
  };

  /// Remove a user from the matching queue.
  public func leaveQueue(
    matchQueue : Queue.Queue<Types.QueueEntry>,
    inQueue : Map.Map<Types.UserId, Bool>,
    caller : Types.UserId,
  ) : () {
    inQueue.remove(caller);
    // Rebuild queue without caller
    let remaining = matchQueue.filter(func(e : Types.QueueEntry) : Bool {
      not Principal.equal(e.userId, caller)
    });
    matchQueue.clear();
    for (entry in remaining.values()) {
      matchQueue.pushBack(entry);
    };
  };

  /// Check if the caller has been matched. Triggers pairing if 2+ users in queue.
  /// Returns (MatchResult, updated nextSessionId).
  public func checkMatch(
    matchQueue : Queue.Queue<Types.QueueEntry>,
    inQueue : Map.Map<Types.UserId, Bool>,
    sessions : Map.Map<Types.SessionId, Types.Session>,
    signalingStore : Map.Map<Types.SessionId, List.List<Types.SignalingEnvelope>>,
    nextSessionId : Nat,
    caller : Types.UserId,
  ) : (Types.MatchResult, Nat) {
    // Cleanup expired sessions first
    cleanupExpiredSessions(sessions, signalingStore);

    // Check if already in an active session
    for ((sid, session) in sessions.entries()) {
      let isCaller = Principal.equal(session.caller, caller);
      let isPeer = Principal.equal(session.peer, caller);
      if (isCaller or isPeer) {
        return (#matched { sessionId = sid; peerId = if (isCaller) session.peer else session.caller }, nextSessionId);
      };
    };

    // Check if caller is in queue
    switch (inQueue.get(caller)) {
      case null {
        // Not in queue — auto-enter them
        let entry : Types.QueueEntry = { userId = caller; joinedAt = Time.now() };
        matchQueue.pushBack(entry);
        inQueue.add(caller, true);
      };
      case (?_) {};
    };

    // Try to form a match if 2+ users in queue
    var newNextId = nextSessionId;
    if (matchQueue.size() >= 2) {
      // Dequeue two users
      switch (matchQueue.popFront()) {
        case (?first) {
          switch (matchQueue.popFront()) {
            case (?second) {
              inQueue.remove(first.userId);
              inQueue.remove(second.userId);

              let sessionId = makeSessionId(newNextId);
              newNextId += 1;

              let session : Types.Session = {
                id = sessionId;
                caller = first.userId;
                peer = second.userId;
                createdAt = Time.now();
                var callerActive = true;
                var peerActive = true;
              };
              sessions.add(sessionId, session);

              // Initialize empty signaling queues
              signalingStore.add(sessionId, List.empty<Types.SignalingEnvelope>());

              // Return result for the caller
              let result : Types.MatchResult = if (Principal.equal(first.userId, caller)) {
                #matched { sessionId; peerId = second.userId }
              } else if (Principal.equal(second.userId, caller)) {
                #matched { sessionId; peerId = first.userId }
              } else {
                // Caller was not one of the two paired — put them back
                matchQueue.pushFront(second);
                matchQueue.pushFront(first);
                inQueue.add(first.userId, true);
                inQueue.add(second.userId, true);
                // Find caller position
                var pos = 0;
                var found = false;
                for (entry in matchQueue.values()) {
                  if (not found) {
                    pos += 1;
                    if (Principal.equal(entry.userId, caller)) { found := true };
                  };
                };
                return (#waiting { position = pos }, newNextId);
              };
              return (result, newNextId);
            };
            case null {
              // Only one item was in queue, put first back
              matchQueue.pushFront(first);
            };
          };
        };
        case null {};
      };
    };

    // Still waiting — compute position
    var pos = 0;
    var found = false;
    for (entry in matchQueue.values()) {
      if (not found) {
        pos += 1;
        if (Principal.equal(entry.userId, caller)) { found := true };
      };
    };
    (#waiting { position = pos }, newNextId);
  };

  /// Store a WebRTC offer SDP for a session.
  public func sendOffer(
    sessions : Map.Map<Types.SessionId, Types.Session>,
    signalingStore : Map.Map<Types.SessionId, List.List<Types.SignalingEnvelope>>,
    sessionId : Types.SessionId,
    sdp : Text,
    caller : Types.UserId,
  ) : () {
    switch (sessions.get(sessionId)) {
      case null {};
      case (?_session) {
        let envelope : Types.SignalingEnvelope = {
          from = caller;
          msg = #offer { sdp };
          sentAt = Time.now();
        };
        appendSignaling(signalingStore, sessionId, envelope);
      };
    };
  };

  /// Store a WebRTC answer SDP for a session.
  public func sendAnswer(
    sessions : Map.Map<Types.SessionId, Types.Session>,
    signalingStore : Map.Map<Types.SessionId, List.List<Types.SignalingEnvelope>>,
    sessionId : Types.SessionId,
    sdp : Text,
    caller : Types.UserId,
  ) : () {
    switch (sessions.get(sessionId)) {
      case null {};
      case (?_session) {
        let envelope : Types.SignalingEnvelope = {
          from = caller;
          msg = #answer { sdp };
          sentAt = Time.now();
        };
        appendSignaling(signalingStore, sessionId, envelope);
      };
    };
  };

  /// Store an ICE candidate for a session.
  public func sendIceCandidate(
    sessions : Map.Map<Types.SessionId, Types.Session>,
    signalingStore : Map.Map<Types.SessionId, List.List<Types.SignalingEnvelope>>,
    sessionId : Types.SessionId,
    candidate : Text,
    sdpMid : ?Text,
    sdpMLineIndex : ?Nat,
    caller : Types.UserId,
  ) : () {
    switch (sessions.get(sessionId)) {
      case null {};
      case (?_session) {
        let envelope : Types.SignalingEnvelope = {
          from = caller;
          msg = #iceCandidate { candidate; sdpMid; sdpMLineIndex };
          sentAt = Time.now();
        };
        appendSignaling(signalingStore, sessionId, envelope);
      };
    };
  };

  /// Poll for pending signaling messages for the caller in a session (consuming them).
  public func pollSignaling(
    sessions : Map.Map<Types.SessionId, Types.Session>,
    signalingStore : Map.Map<Types.SessionId, List.List<Types.SignalingEnvelope>>,
    sessionId : Types.SessionId,
    caller : Types.UserId,
  ) : [Types.SignalingEnvelope] {
    switch (sessions.get(sessionId)) {
      case null { [] };
      case (?_session) {
        switch (signalingStore.get(sessionId)) {
          case null { [] };
          case (?msgs) {
            // Return only messages NOT from the caller (they are for the caller)
            let forCaller = msgs.filter(func(e : Types.SignalingEnvelope) : Bool {
              not Principal.equal(e.from, caller)
            });
            let result = forCaller.toArray();
            // Remove consumed messages from store — keep only messages FROM caller
            let remaining = msgs.filter(func(e : Types.SignalingEnvelope) : Bool {
              Principal.equal(e.from, caller)
            });
            msgs.clear();
            for (e in remaining.values()) {
              msgs.add(e);
            };
            result;
          };
        };
      };
    };
  };

  /// Tear down a session and clean up all associated data.
  public func endSession(
    sessions : Map.Map<Types.SessionId, Types.Session>,
    signalingStore : Map.Map<Types.SessionId, List.List<Types.SignalingEnvelope>>,
    sessionId : Types.SessionId,
    caller : Types.UserId,
  ) : () {
    switch (sessions.get(sessionId)) {
      case null {};
      case (?session) {
        // Mark the caller as inactive
        if (Principal.equal(session.caller, caller)) {
          session.callerActive := false;
        } else if (Principal.equal(session.peer, caller)) {
          session.peerActive := false;
        };
        // If both inactive, fully remove the session
        if (not session.callerActive and not session.peerActive) {
          sessions.remove(sessionId);
          signalingStore.remove(sessionId);
        };
      };
    };
  };

  /// Get the current connection status of a session.
  public func getSessionStatus(
    sessions : Map.Map<Types.SessionId, Types.Session>,
    sessionId : Types.SessionId,
    caller : Types.UserId,
  ) : Types.SessionStatus {
    switch (sessions.get(sessionId)) {
      case null { #notFound };
      case (?session) {
        let peerConnected = if (Principal.equal(session.caller, caller)) {
          session.peerActive
        } else if (Principal.equal(session.peer, caller)) {
          session.callerActive
        } else {
          false
        };
        #active { peerConnected };
      };
    };
  };

  /// Remove sessions older than SESSION_TIMEOUT_NS. Called periodically from checkMatch.
  public func cleanupExpiredSessions(
    sessions : Map.Map<Types.SessionId, Types.Session>,
    signalingStore : Map.Map<Types.SessionId, List.List<Types.SignalingEnvelope>>,
  ) : () {
    let now = Time.now();
    let expiredIds = List.empty<Types.SessionId>();
    for ((sid, session) in sessions.entries()) {
      if (now - session.createdAt > SESSION_TIMEOUT_NS) {
        expiredIds.add(sid);
      };
    };
    for (sid in expiredIds.values()) {
      sessions.remove(sid);
      signalingStore.remove(sid);
    };
  };
};
