import { useNavigate } from "@tanstack/react-router";
import {
  MessageSquare,
  Mic,
  MicOff,
  PhoneOff,
  SkipForward,
  Video,
  VideoOff,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Layout } from "../components/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { useVideoChat } from "../hooks/use-video-chat";
import type { ChatMessage } from "../types";

// ─── Call timer ───────────────────────────────────────────────────────────────

function CallTimer() {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const m = Math.floor(secs / 60)
    .toString()
    .padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  const h = Math.floor(secs / 3600);
  return (
    <span
      className="font-mono text-xs tabular-nums text-foreground"
      data-ocid="chat.call_timer"
    >
      {h > 0 ? `${h.toString().padStart(2, "0")}:` : ""}
      {m}:{s}
    </span>
  );
}

// ─── Video tile ───────────────────────────────────────────────────────────────

interface VideoTileProps {
  stream: MediaStream | null;
  label: string;
  glowClass: string;
  muted?: boolean;
  videoOff?: boolean;
  isWaiting?: boolean;
}

function VideoTile({
  stream,
  label,
  glowClass,
  muted = false,
  videoOff = false,
  isWaiting = false,
}: VideoTileProps) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (ref.current && stream) ref.current.srcObject = stream;
  }, [stream]);

  return (
    <div
      className={`relative flex-1 min-h-0 rounded-2xl overflow-hidden bg-card ${glowClass}`}
    >
      {/* Video element */}
      {!videoOff && stream ? (
        <video
          ref={ref}
          autoPlay
          playsInline
          muted={muted}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <track kind="captions" />
        </video>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-card">
          <div
            className="h-14 w-14 rounded-full flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.25 270 / 0.3), oklch(0.72 0.22 200 / 0.3))",
            }}
          >
            {isWaiting ? (
              <div className="h-5 w-5 rounded-full border-2 border-primary/40 border-t-primary animate-spin" />
            ) : (
              <VideoOff className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
        </div>
      )}
      {/* Label chip */}
      <div className="absolute bottom-2 left-2">
        <span className="glass text-xs font-medium text-foreground rounded-lg px-2 py-0.5">
          {label}
        </span>
      </div>
    </div>
  );
}

// ─── Control button ───────────────────────────────────────────────────────────

interface CtrlBtnProps {
  onClick: () => void;
  label: string;
  ocid: string;
  active?: boolean;
  variant?: "default" | "danger" | "accent";
  children: React.ReactNode;
  size?: "sm" | "md";
}

function CtrlBtn({
  onClick,
  label,
  ocid,
  active = true,
  variant = "default",
  children,
  size = "md",
}: CtrlBtnProps) {
  const dim = size === "md" ? "h-12 w-12" : "h-11 w-11";
  const baseStyle =
    variant === "danger"
      ? {
          background: "oklch(0.55 0.2 15)",
          boxShadow: "0 0 16px oklch(0.55 0.2 15 / 0.5)",
        }
      : variant === "accent"
        ? {
            background:
              "linear-gradient(135deg, oklch(0.65 0.25 270), oklch(0.72 0.22 200))",
            boxShadow: "0 0 18px oklch(0.72 0.22 200 / 0.45)",
          }
        : {};
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={ocid}
      aria-label={label}
      aria-pressed={variant === "default" ? !active : undefined}
      className={`${dim} rounded-xl flex items-center justify-center transition-smooth hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0 ${
        variant === "default"
          ? active
            ? "glass border-primary/35"
            : "glass border-border/25"
          : ""
      }`}
      style={baseStyle}
    >
      {children}
    </button>
  );
}

// ─── Chat page ────────────────────────────────────────────────────────────────

export function ChatPage() {
  const navigate = useNavigate();
  const vc = useVideoChat();
  const [showText, setShowText] = useState(false);
  const msgEndRef = useRef<HTMLDivElement>(null);

  const isChatting = vc.phase === "chatting";
  const isConnecting = vc.phase === "connecting";

  const statusLabel = isChatting
    ? "connected"
    : isConnecting
      ? "connecting"
      : "disconnected";
  const statusColor = isChatting
    ? "oklch(0.72 0.22 200)"
    : isConnecting
      ? "oklch(0.7 0.18 60)"
      : "oklch(0.6 0.2 15)";

  // Redirect idle → home
  useEffect(() => {
    if (vc.phase === "idle") void navigate({ to: "/home" });
  }, [vc.phase, navigate]);

  // Auto-scroll messages using a ref callback instead of useEffect
  const messageCount = vc.messages.length;
  const prevMsgCountRef = useRef(0);
  if (prevMsgCountRef.current !== messageCount) {
    prevMsgCountRef.current = messageCount;
    // Schedule scroll after render
    setTimeout(
      () => msgEndRef.current?.scrollIntoView({ behavior: "smooth" }),
      0,
    );
  }

  const handleHangUp = useCallback(async () => {
    await vc.hangUp();
    void navigate({ to: "/home" });
  }, [vc, navigate]);

  const handleNext = useCallback(async () => {
    await vc.skipToNext();
    void navigate({ to: "/waiting" });
  }, [vc, navigate]);

  return (
    <ProtectedRoute>
      <Layout withGradient={false}>
        <div className="flex flex-col h-screen bg-background overflow-hidden">
          {/* ── Header ── */}
          <header
            className="glass-strong border-b border-border/25 flex items-center justify-between px-4 py-2.5 shrink-0 z-20"
            data-ocid="chat.header"
          >
            <div className="flex items-center gap-2">
              <div
                className="h-7 w-7 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.25 270), oklch(0.72 0.22 200))",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <circle cx="9" cy="12" r="5" stroke="white" strokeWidth="2" />
                  <circle
                    cx="15"
                    cy="12"
                    r="5"
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray="2.5 1.5"
                  />
                </svg>
              </div>
              <span className="font-display text-[16px] font-bold leading-none">
                <span className="gradient-text">Random</span>
                <span className="text-foreground">Chat</span>
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Connection indicator */}
              <div
                className="flex items-center gap-1.5 glass rounded-full px-2.5 py-1 text-xs"
                data-ocid="chat.connection_status"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: statusColor }}
                />
                <span className="text-muted-foreground capitalize">
                  {statusLabel}
                </span>
              </div>
              {/* Timer */}
              <div className="glass rounded-full px-2.5 py-1">
                <CallTimer />
              </div>
            </div>
          </header>

          {/* ── Connected banner ── */}
          <AnimatePresence>
            {isChatting && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="shrink-0 text-center py-1.5 text-xs font-medium text-foreground"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.65 0.25 270 / 0.14), oklch(0.72 0.22 200 / 0.14))",
                  borderBottom: "1px solid oklch(0.72 0.22 200 / 0.25)",
                }}
                data-ocid="chat.connected_banner"
              >
                Now connected — say hello! 👋
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Video panels ── */}
          <div className="flex gap-2.5 px-3 pt-3 pb-2 flex-1 min-h-0">
            <VideoTile
              stream={vc.session?.remoteStream ?? null}
              label="Stranger"
              glowClass="video-glow-purple"
              isWaiting={isConnecting}
            />
            <VideoTile
              stream={vc.session?.localStream ?? null}
              label="You"
              glowClass="video-glow-cyan"
              muted
              videoOff={vc.isVideoOff}
            />
          </div>

          {/* ── Gradient divider ── */}
          <div
            className="h-px mx-3 mb-2 shrink-0"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.65 0.25 270 / 0.35), oklch(0.72 0.22 200 / 0.35))",
            }}
            aria-hidden="true"
          />

          {/* ── Controls bar ── */}
          <div
            className="glass-strong mx-3 mb-3 rounded-2xl p-3 flex items-center justify-between gap-2 shrink-0"
            style={{ boxShadow: "0 -4px 24px oklch(0 0 0 / 0.35)" }}
            data-ocid="chat.controls"
          >
            {/* End call */}
            <CtrlBtn
              onClick={() => void handleHangUp()}
              label="End call"
              ocid="chat.end_call_button"
              variant="danger"
              size="md"
            >
              <PhoneOff className="h-5 w-5 text-[oklch(0.95_0_0)]" />
            </CtrlBtn>

            {/* Mic */}
            <CtrlBtn
              onClick={vc.toggleMute}
              label={vc.isMuted ? "Unmute microphone" : "Mute microphone"}
              ocid="chat.mic_toggle"
              active={!vc.isMuted}
              size="sm"
            >
              {vc.isMuted ? (
                <MicOff className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Mic className="h-5 w-5 text-primary" />
              )}
            </CtrlBtn>

            {/* Camera */}
            <CtrlBtn
              onClick={vc.toggleVideo}
              label={vc.isVideoOff ? "Turn camera on" : "Turn camera off"}
              ocid="chat.camera_toggle"
              active={!vc.isVideoOff}
              size="sm"
            >
              {vc.isVideoOff ? (
                <VideoOff className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Video className="h-5 w-5 text-primary" />
              )}
            </CtrlBtn>

            {/* Text chat */}
            <CtrlBtn
              onClick={() => setShowText((v) => !v)}
              label="Toggle text chat"
              ocid="chat.chat_toggle"
              active={showText}
              size="sm"
            >
              <MessageSquare
                className={`h-5 w-5 ${showText ? "text-primary" : "text-muted-foreground"}`}
              />
            </CtrlBtn>

            {/* Next */}
            <CtrlBtn
              onClick={() => void handleNext()}
              label="Skip to next match"
              ocid="chat.next_button"
              variant="accent"
              size="md"
            >
              <SkipForward className="h-5 w-5 text-background" />
            </CtrlBtn>
          </div>

          {/* ── Text chat drawer ── */}
          <AnimatePresence>
            {showText && (
              <motion.div
                key="text-drawer"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                className="fixed bottom-0 left-0 right-0 z-30 glass-strong border-t border-border/35 rounded-t-[28px] flex flex-col"
                style={{ maxHeight: "52vh" }}
                data-ocid="chat.text_drawer"
              >
                {/* Drawer handle + title */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border/25 shrink-0">
                  <span className="font-display text-sm font-semibold text-foreground">
                    Messages
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowText(false)}
                    data-ocid="chat.close_button"
                    className="text-muted-foreground transition-smooth hover:text-foreground p-1 -mr-1"
                    aria-label="Close chat"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Message list */}
                <div
                  className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2 min-h-0"
                  data-ocid="chat.list"
                >
                  {vc.messages.length === 0 ? (
                    <p
                      className="text-center text-xs text-muted-foreground py-6"
                      data-ocid="chat.messages_empty_state"
                    >
                      No messages yet — peer messages appear here.
                    </p>
                  ) : (
                    vc.messages.map((msg: ChatMessage, idx: number) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                        data-ocid={`chat.message.${idx + 1}`}
                      >
                        <div
                          className={`max-w-[76%] rounded-2xl px-3 py-1.5 text-sm ${
                            msg.from === "me"
                              ? "text-background font-medium"
                              : "glass text-foreground"
                          }`}
                          style={
                            msg.from === "me"
                              ? {
                                  background:
                                    "linear-gradient(135deg, oklch(0.65 0.25 270), oklch(0.72 0.22 200))",
                                }
                              : {}
                          }
                        >
                          {msg.text}
                        </div>
                      </motion.div>
                    ))
                  )}
                  <div ref={msgEndRef} />
                </div>

                {/* Input bar — hidden until outgoing relay is available */}
                {/* Messages from the peer appear above; sending is not yet supported */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
