import { u as useInternetIdentity, r as reactExports, a as useNavigate, j as jsxRuntimeExports } from "./index-BcORI3wC.js";
import { c as createLucideIcon, L as Layout, m as motion } from "./Layout-CxuQYcH2.js";
import { P as ProtectedRoute } from "./ProtectedRoute-BnFlWhG4.js";
import { a as useBackend, u as useMatchmaking, A as AnimatePresence, X } from "./use-matchmaking-D1VtHzqs.js";
import { V as Video } from "./video-T7dNve4k.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
const MessageSquare = createLucideIcon("message-square", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }],
  ["path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2", key: "80xlxr" }],
  ["path", { d: "M5 10v2a7 7 0 0 0 12 5", key: "p2k8kg" }],
  ["path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33", key: "1gzdoj" }],
  ["path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12", key: "r2i35w" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }]
];
const MicOff = createLucideIcon("mic-off", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z", key: "131961" }],
  ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2", key: "1vc78b" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }]
];
const Mic = createLucideIcon("mic", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M10.1 13.9a14 14 0 0 0 3.732 2.668 1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2 18 18 0 0 1-12.728-5.272",
      key: "1wngk7"
    }
  ],
  ["path", { d: "M22 2 2 22", key: "y4kqgn" }],
  [
    "path",
    {
      d: "M4.76 13.582A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 .244.473",
      key: "10hv5p"
    }
  ]
];
const PhoneOff = createLucideIcon("phone-off", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["polygon", { points: "5 4 15 12 5 20 5 4", key: "16p6eg" }],
  ["line", { x1: "19", x2: "19", y1: "5", y2: "19", key: "futhcm" }]
];
const SkipForward = createLucideIcon("skip-forward", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    { d: "M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196", key: "w8jjjt" }
  ],
  ["path", { d: "M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2", key: "1xawa7" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const VideoOff = createLucideIcon("video-off", __iconNode);
const ICE_SERVERS = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" }
];
const SIGNALING_POLL_MS = 1500;
function useVideoChat() {
  const backend = useBackend();
  const matchmaking = useMatchmaking();
  const { identity } = useInternetIdentity();
  const [phase, setPhase] = reactExports.useState("idle");
  const [session, setSession] = reactExports.useState(null);
  const [isMuted, setIsMuted] = reactExports.useState(false);
  const [isVideoOff, setIsVideoOff] = reactExports.useState(false);
  const [messages, setMessages] = reactExports.useState([]);
  const pcRef = reactExports.useRef(null);
  const localStreamRef = reactExports.useRef(null);
  const remoteStreamRef = reactExports.useRef(null);
  const sessionIdRef = reactExports.useRef(null);
  const peerIdRef = reactExports.useRef(null);
  const pollTimerRef = reactExports.useRef(null);
  const processedRef = reactExports.useRef(/* @__PURE__ */ new Set());
  const remoteDescSetRef = reactExports.useRef(false);
  const pendingCandidatesRef = reactExports.useRef([]);
  const stopPolling = reactExports.useCallback(() => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  }, []);
  const cleanupPC = reactExports.useCallback(() => {
    var _a;
    stopPolling();
    if (localStreamRef.current) {
      for (const t of localStreamRef.current.getTracks()) t.stop();
    }
    (_a = pcRef.current) == null ? void 0 : _a.close();
    pcRef.current = null;
    localStreamRef.current = null;
    remoteStreamRef.current = null;
    processedRef.current.clear();
    remoteDescSetRef.current = false;
    pendingCandidatesRef.current = [];
  }, [stopPolling]);
  const updateSessionStreams = reactExports.useCallback(() => {
    setSession(
      (prev) => prev ? {
        ...prev,
        localStream: localStreamRef.current,
        remoteStream: remoteStreamRef.current
      } : prev
    );
  }, []);
  const startRTC = reactExports.useCallback(
    async (sessionId, peerId, isOfferer) => {
      sessionIdRef.current = sessionId;
      peerIdRef.current = peerId;
      remoteDescSetRef.current = false;
      pendingCandidatesRef.current = [];
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
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
        var _a;
        for (const t of ((_a = e.streams[0]) == null ? void 0 : _a.getTracks()) ?? []) remote.addTrack(t);
        updateSessionStreams();
      };
      pc.onicecandidate = async (e) => {
        if (!e.candidate || !sessionIdRef.current) return;
        await backend.sendIceCandidate(
          sessionIdRef.current,
          e.candidate.candidate,
          e.candidate.sdpMid ?? void 0,
          e.candidate.sdpMLineIndex ?? void 0
        );
      };
      pc.onconnectionstatechange = () => {
        if (pc.connectionState === "connected") {
          setPhase("chatting");
        } else if (["disconnected", "failed", "closed"].includes(pc.connectionState)) {
          stopPolling();
          setPhase("ended");
        }
      };
      const sess = {
        sessionId,
        peerId,
        localStream: stream,
        remoteStream: remote,
        isMuted: false,
        isVideoOff: false,
        messages: []
      };
      setSession(sess);
      setPhase("connecting");
      setMessages([]);
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
                await pc.addIceCandidate(new RTCIceCandidate(c)).catch(() => {
                });
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
                await pc.addIceCandidate(new RTCIceCandidate(c)).catch(() => {
                });
              }
              pendingCandidatesRef.current = [];
            }
            if (msg.kind === "iceCandidate") {
              const init = {
                candidate: msg.candidate,
                sdpMid: msg.sdpMid,
                sdpMLineIndex: msg.sdpMLineIndex
              };
              if (remoteDescSetRef.current) {
                await pc.addIceCandidate(new RTCIceCandidate(init)).catch(() => {
                });
              } else {
                pendingCandidatesRef.current.push(init);
              }
            }
          }
        } catch {
        }
      }, SIGNALING_POLL_MS);
      if (isOfferer) {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        await backend.sendOffer(sessionId, offer.sdp ?? "");
      }
    },
    [backend, stopPolling, updateSessionStreams]
  );
  const start = reactExports.useCallback(async () => {
    if (phase !== "idle" && phase !== "ended") return;
    setPhase("waiting");
    await matchmaking.enterQueue();
  }, [phase, matchmaking]);
  const prevMatchStateRef = reactExports.useRef(matchmaking.state.status);
  if (matchmaking.state.status !== prevMatchStateRef.current) {
    prevMatchStateRef.current = matchmaking.state.status;
    if (matchmaking.state.status === "matched") {
      const { sessionId, peerId } = matchmaking.state;
      const ownPrincipal = (identity == null ? void 0 : identity.getPrincipal().toText()) ?? "";
      const isOfferer = ownPrincipal < peerId;
      void startRTC(sessionId, peerId, isOfferer);
    }
  }
  const hangUp = reactExports.useCallback(async () => {
    const sid = sessionIdRef.current;
    cleanupPC();
    sessionIdRef.current = null;
    peerIdRef.current = null;
    if (sid) {
      await backend.endSession(sid).catch(() => {
      });
    }
    setSession(null);
    setPhase("ended");
  }, [backend, cleanupPC]);
  const skipToNext = reactExports.useCallback(async () => {
    await hangUp();
    setTimeout(() => {
      setPhase("idle");
    }, 500);
  }, [hangUp]);
  const reset = reactExports.useCallback(() => {
    cleanupPC();
    sessionIdRef.current = null;
    peerIdRef.current = null;
    setSession(null);
    setPhase("idle");
    setMessages([]);
    setIsMuted(false);
    setIsVideoOff(false);
  }, [cleanupPC]);
  const toggleMute = reactExports.useCallback(() => {
    if (localStreamRef.current) {
      const audio = localStreamRef.current.getAudioTracks();
      const next = !isMuted;
      for (const t of audio) t.enabled = !next;
      setIsMuted(next);
    }
  }, [isMuted]);
  const toggleVideo = reactExports.useCallback(() => {
    if (localStreamRef.current) {
      const video = localStreamRef.current.getVideoTracks();
      const next = !isVideoOff;
      for (const t of video) t.enabled = !next;
      setIsVideoOff(next);
    }
  }, [isVideoOff]);
  const sendMessage = reactExports.useCallback((text) => {
    const msg = {
      id: `${Date.now()}`,
      from: "me",
      text,
      timestamp: /* @__PURE__ */ new Date()
    };
    setMessages((prev) => [...prev, msg]);
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
    matchmakingState: matchmaking.state
  };
}
function CallTimer() {
  const [secs, setSecs] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const id = setInterval(() => setSecs((s2) => s2 + 1), 1e3);
    return () => clearInterval(id);
  }, []);
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  const h = Math.floor(secs / 3600);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: "font-mono text-xs tabular-nums text-foreground",
      "data-ocid": "chat.call_timer",
      children: [
        h > 0 ? `${h.toString().padStart(2, "0")}:` : "",
        m,
        ":",
        s
      ]
    }
  );
}
function VideoTile({
  stream,
  label,
  glowClass,
  muted = false,
  videoOff = false,
  isWaiting = false
}) {
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (ref.current && stream) ref.current.srcObject = stream;
  }, [stream]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `relative flex-1 min-h-0 rounded-2xl overflow-hidden bg-card ${glowClass}`,
      children: [
        !videoOff && stream ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "video",
          {
            ref,
            autoPlay: true,
            playsInline: true,
            muted,
            className: "absolute inset-0 h-full w-full object-cover",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("track", { kind: "captions" })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-14 w-14 rounded-full flex items-center justify-center",
            style: {
              background: "linear-gradient(135deg, oklch(0.65 0.25 270 / 0.3), oklch(0.72 0.22 200 / 0.3))"
            },
            children: isWaiting ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-5 rounded-full border-2 border-primary/40 border-t-primary animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(VideoOff, { className: "h-6 w-6 text-muted-foreground" })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "glass text-xs font-medium text-foreground rounded-lg px-2 py-0.5", children: label }) })
      ]
    }
  );
}
function CtrlBtn({
  onClick,
  label,
  ocid,
  active = true,
  variant = "default",
  children,
  size = "md"
}) {
  const dim = size === "md" ? "h-12 w-12" : "h-11 w-11";
  const baseStyle = variant === "danger" ? {
    background: "oklch(0.55 0.2 15)",
    boxShadow: "0 0 16px oklch(0.55 0.2 15 / 0.5)"
  } : variant === "accent" ? {
    background: "linear-gradient(135deg, oklch(0.65 0.25 270), oklch(0.72 0.22 200))",
    boxShadow: "0 0 18px oklch(0.72 0.22 200 / 0.45)"
  } : {};
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick,
      "data-ocid": ocid,
      "aria-label": label,
      "aria-pressed": variant === "default" ? !active : void 0,
      className: `${dim} rounded-xl flex items-center justify-center transition-smooth hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0 ${variant === "default" ? active ? "glass border-primary/35" : "glass border-border/25" : ""}`,
      style: baseStyle,
      children
    }
  );
}
function ChatPage() {
  var _a, _b;
  const navigate = useNavigate();
  const vc = useVideoChat();
  const [showText, setShowText] = reactExports.useState(false);
  const msgEndRef = reactExports.useRef(null);
  const isChatting = vc.phase === "chatting";
  const isConnecting = vc.phase === "connecting";
  const statusLabel = isChatting ? "connected" : isConnecting ? "connecting" : "disconnected";
  const statusColor = isChatting ? "oklch(0.72 0.22 200)" : isConnecting ? "oklch(0.7 0.18 60)" : "oklch(0.6 0.2 15)";
  reactExports.useEffect(() => {
    if (vc.phase === "idle") void navigate({ to: "/home" });
  }, [vc.phase, navigate]);
  const messageCount = vc.messages.length;
  const prevMsgCountRef = reactExports.useRef(0);
  if (prevMsgCountRef.current !== messageCount) {
    prevMsgCountRef.current = messageCount;
    setTimeout(
      () => {
        var _a2;
        return (_a2 = msgEndRef.current) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth" });
      },
      0
    );
  }
  const handleHangUp = reactExports.useCallback(async () => {
    await vc.hangUp();
    void navigate({ to: "/home" });
  }, [vc, navigate]);
  const handleNext = reactExports.useCallback(async () => {
    await vc.skipToNext();
    void navigate({ to: "/waiting" });
  }, [vc, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { withGradient: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-screen bg-background overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "header",
      {
        className: "glass-strong border-b border-border/25 flex items-center justify-between px-4 py-2.5 shrink-0 z-20",
        "data-ocid": "chat.header",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-7 w-7 rounded-full flex items-center justify-center shrink-0",
                style: {
                  background: "linear-gradient(135deg, oklch(0.65 0.25 270), oklch(0.72 0.22 200))"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "svg",
                  {
                    viewBox: "0 0 24 24",
                    fill: "none",
                    className: "h-4 w-4",
                    "aria-hidden": "true",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "9", cy: "12", r: "5", stroke: "white", strokeWidth: "2" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "circle",
                        {
                          cx: "15",
                          cy: "12",
                          r: "5",
                          stroke: "white",
                          strokeWidth: "2",
                          strokeDasharray: "2.5 1.5"
                        }
                      )
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-[16px] font-bold leading-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "Random" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Chat" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-1.5 glass rounded-full px-2.5 py-1 text-xs",
                "data-ocid": "chat.connection_status",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "h-1.5 w-1.5 rounded-full",
                      style: { background: statusColor }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground capitalize", children: statusLabel })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-full px-2.5 py-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CallTimer, {}) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isChatting && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        exit: { opacity: 0, height: 0 },
        className: "shrink-0 text-center py-1.5 text-xs font-medium text-foreground",
        style: {
          background: "linear-gradient(90deg, oklch(0.65 0.25 270 / 0.14), oklch(0.72 0.22 200 / 0.14))",
          borderBottom: "1px solid oklch(0.72 0.22 200 / 0.25)"
        },
        "data-ocid": "chat.connected_banner",
        children: "Now connected — say hello! 👋"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2.5 px-3 pt-3 pb-2 flex-1 min-h-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        VideoTile,
        {
          stream: ((_a = vc.session) == null ? void 0 : _a.remoteStream) ?? null,
          label: "Stranger",
          glowClass: "video-glow-purple",
          isWaiting: isConnecting
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        VideoTile,
        {
          stream: ((_b = vc.session) == null ? void 0 : _b.localStream) ?? null,
          label: "You",
          glowClass: "video-glow-cyan",
          muted: true,
          videoOff: vc.isVideoOff
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-px mx-3 mb-2 shrink-0",
        style: {
          background: "linear-gradient(90deg, oklch(0.65 0.25 270 / 0.35), oklch(0.72 0.22 200 / 0.35))"
        },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-strong mx-3 mb-3 rounded-2xl p-3 flex items-center justify-between gap-2 shrink-0",
        style: { boxShadow: "0 -4px 24px oklch(0 0 0 / 0.35)" },
        "data-ocid": "chat.controls",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CtrlBtn,
            {
              onClick: () => void handleHangUp(),
              label: "End call",
              ocid: "chat.end_call_button",
              variant: "danger",
              size: "md",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneOff, { className: "h-5 w-5 text-[oklch(0.95_0_0)]" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CtrlBtn,
            {
              onClick: vc.toggleMute,
              label: vc.isMuted ? "Unmute microphone" : "Mute microphone",
              ocid: "chat.mic_toggle",
              active: !vc.isMuted,
              size: "sm",
              children: vc.isMuted ? /* @__PURE__ */ jsxRuntimeExports.jsx(MicOff, { className: "h-5 w-5 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "h-5 w-5 text-primary" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CtrlBtn,
            {
              onClick: vc.toggleVideo,
              label: vc.isVideoOff ? "Turn camera on" : "Turn camera off",
              ocid: "chat.camera_toggle",
              active: !vc.isVideoOff,
              size: "sm",
              children: vc.isVideoOff ? /* @__PURE__ */ jsxRuntimeExports.jsx(VideoOff, { className: "h-5 w-5 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-5 w-5 text-primary" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CtrlBtn,
            {
              onClick: () => setShowText((v) => !v),
              label: "Toggle text chat",
              ocid: "chat.chat_toggle",
              active: showText,
              size: "sm",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                MessageSquare,
                {
                  className: `h-5 w-5 ${showText ? "text-primary" : "text-muted-foreground"}`
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CtrlBtn,
            {
              onClick: () => void handleNext(),
              label: "Skip to next match",
              ocid: "chat.next_button",
              variant: "accent",
              size: "md",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { className: "h-5 w-5 text-background" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showText && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { y: "100%", opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: "100%", opacity: 0 },
        transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
        className: "fixed bottom-0 left-0 right-0 z-30 glass-strong border-t border-border/35 rounded-t-[28px] flex flex-col",
        style: { maxHeight: "52vh" },
        "data-ocid": "chat.text_drawer",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border/25 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm font-semibold text-foreground", children: "Messages" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowText(false),
                "data-ocid": "chat.close_button",
                className: "text-muted-foreground transition-smooth hover:text-foreground p-1 -mr-1",
                "aria-label": "Close chat",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2 min-h-0",
              "data-ocid": "chat.list",
              children: [
                vc.messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-center text-xs text-muted-foreground py-6",
                    "data-ocid": "chat.messages_empty_state",
                    children: "No messages yet — peer messages appear here."
                  }
                ) : vc.messages.map((msg, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 6 },
                    animate: { opacity: 1, y: 0 },
                    className: `flex ${msg.from === "me" ? "justify-end" : "justify-start"}`,
                    "data-ocid": `chat.message.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `max-w-[76%] rounded-2xl px-3 py-1.5 text-sm ${msg.from === "me" ? "text-background font-medium" : "glass text-foreground"}`,
                        style: msg.from === "me" ? {
                          background: "linear-gradient(135deg, oklch(0.65 0.25 270), oklch(0.72 0.22 200))"
                        } : {},
                        children: msg.text
                      }
                    )
                  },
                  msg.id
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: msgEndRef })
              ]
            }
          )
        ]
      },
      "text-drawer"
    ) })
  ] }) }) });
}
export {
  ChatPage
};
