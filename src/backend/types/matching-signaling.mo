import Time "mo:core/Time";
import Principal "mo:core/Principal";

module {
  public type SessionId = Text;
  public type UserId = Principal;
  public type Timestamp = Time.Time;

  // Queue entry for a user waiting to be matched
  public type QueueEntry = {
    userId : UserId;
    joinedAt : Timestamp;
  };

  // Ephemeral session pairing two users
  public type Session = {
    id : SessionId;
    caller : UserId;
    peer : UserId;
    createdAt : Timestamp;
    var callerActive : Bool;
    var peerActive : Bool;
  };

  // WebRTC signaling message types
  public type SignalingMsg = {
    #offer : { sdp : Text };
    #answer : { sdp : Text };
    #iceCandidate : { candidate : Text; sdpMid : ?Text; sdpMLineIndex : ?Nat };
  };

  // A queued signaling message with sender info
  public type SignalingEnvelope = {
    from : UserId;
    msg : SignalingMsg;
    sentAt : Timestamp;
  };

  // Public shared types (no mutable fields) for API boundary
  public type MatchResult = {
    #waiting : { position : Nat };
    #matched : { sessionId : SessionId; peerId : UserId };
  };

  public type SessionStatus = {
    #active : { peerConnected : Bool };
    #notFound;
  };
};
