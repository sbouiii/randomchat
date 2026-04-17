import { useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Layout } from "../components/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { useMatchmaking } from "../hooks/use-matchmaking";

export function WaitingPage() {
  const navigate = useNavigate();
  const { state, enterQueue, leaveQueue } = useMatchmaking();
  const startedRef = useRef(false);
  const [dotCount, setDotCount] = useState(1);

  // Enter queue on mount (once)
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    void enterQueue();
  }, [enterQueue]);

  // Navigate to chat when matched
  useEffect(() => {
    if (state.status === "matched") {
      void navigate({ to: "/chat" });
    }
  }, [state.status, navigate]);

  // Animated ellipsis
  useEffect(() => {
    const id = setInterval(() => setDotCount((d) => (d % 3) + 1), 550);
    return () => clearInterval(id);
  }, []);

  async function handleCancel() {
    await leaveQueue();
    void navigate({ to: "/home" });
  }

  const queuePos = state.status === "waiting" ? state.position : 0;

  return (
    <ProtectedRoute>
      <Layout withGradient>
        <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-10 w-full max-w-[300px] text-center"
            data-ocid="waiting.section"
          >
            {/* Sonar animation */}
            <div
              className="relative flex items-center justify-center"
              data-ocid="waiting.loading_state"
            >
              {[0, 1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: `${68 + i * 46}px`,
                    height: `${68 + i * 46}px`,
                    border: `1.5px solid oklch(0.72 0.22 200 / ${0.55 - i * 0.11})`,
                  }}
                  animate={{
                    scale: [1, 1.06, 1],
                    opacity: [0.55 - i * 0.11, 0.15, 0.55 - i * 0.11],
                  }}
                  transition={{
                    duration: 2.2,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.42,
                  }}
                  aria-hidden="true"
                />
              ))}

              {/* Center orb */}
              <motion.div
                className="relative z-10 h-16 w-16 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.07, 1] }}
                transition={{
                  duration: 1.9,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                }}
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.25 270), oklch(0.72 0.22 200))",
                  boxShadow:
                    "0 0 36px oklch(0.72 0.22 200 / 0.5), 0 0 72px oklch(0.65 0.25 270 / 0.3)",
                }}
              >
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  className="h-10 w-10"
                  aria-hidden="true"
                >
                  <circle
                    cx="17"
                    cy="24"
                    r="10"
                    stroke="white"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx="31"
                    cy="24"
                    r="10"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeDasharray="3 2"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-2.5">
              <h2
                className="font-display text-[22px] font-bold text-foreground"
                data-ocid="waiting.title"
              >
                Searching for someone
                <span
                  className="inline-block w-6 text-left text-primary"
                  aria-live="polite"
                >
                  {".".repeat(dotCount)}
                </span>
              </h2>
              <p className="text-[13px] text-muted-foreground leading-snug">
                Scanning the globe for your next chat partner
              </p>

              <AnimatePresence>
                {queuePos > 0 && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-muted-foreground/70"
                    data-ocid="waiting.queue_position"
                  >
                    Queue position:{" "}
                    <span className="text-primary font-semibold">
                      #{queuePos}
                    </span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Skeleton shimmer rows */}
            <div
              className="w-full flex flex-col gap-3"
              aria-hidden="true"
              role="presentation"
            >
              {([0.85, 0.65, 0.45] as const).map((op, i) => (
                <motion.div
                  key={op}
                  className="glass rounded-xl h-11 overflow-hidden relative"
                  style={{ opacity: op }}
                  animate={{ opacity: [op, op * 0.45, op] }}
                  transition={{
                    duration: 1.7,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.28,
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, oklch(0.72 0.22 200 / 0.07) 50%, transparent 100%)",
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Cancel */}
            <motion.button
              type="button"
              onClick={() => void handleCancel()}
              data-ocid="waiting.cancel_button"
              className="glass rounded-2xl px-8 py-3 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground hover:border-border/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <X className="h-4 w-4" />
              Cancel search
            </motion.button>
          </motion.div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
