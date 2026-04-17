import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { Lock, Shuffle, Video } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { Layout } from "../components/Layout";

const FEATURES = [
  { icon: Shuffle, label: "Random match" },
  { icon: Video, label: "Live video" },
  { icon: Lock, label: "Anonymous" },
];

export function LoginPage() {
  const { login, isAuthenticated, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      void navigate({ to: "/home" });
    }
  }, [isAuthenticated, navigate]);

  const isBusy = isLoggingIn || isInitializing;

  return (
    <Layout withGradient>
      <div className="flex min-h-screen flex-col items-center justify-center px-5 py-12">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[360px]"
          data-ocid="login.card"
        >
          <div
            className="glass-strong rounded-[28px] px-7 py-9 flex flex-col items-center gap-7"
            style={{
              boxShadow:
                "0 8px 48px oklch(0 0 0 / 0.5), inset 0 1px 0 oklch(1 0 0 / 0.06)",
            }}
          >
            {/* Animated logo orb */}
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.12, duration: 0.55, ease: "backOut" }}
              className="relative"
            >
              {/* Glow halo */}
              <div
                className="absolute inset-0 rounded-full animate-gradient-flow opacity-60 blur-xl scale-125"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.25 270), oklch(0.72 0.22 200))",
                }}
                aria-hidden="true"
              />
              <div
                className="relative h-[76px] w-[76px] rounded-full flex items-center justify-center border border-[oklch(0.72_0.22_200/0.35)]"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.25 270 / 0.25), oklch(0.72 0.22 200 / 0.25))",
                  backdropFilter: "blur(12px)",
                }}
              >
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  className="h-11 w-11"
                  aria-hidden="true"
                >
                  <circle
                    cx="17"
                    cy="24"
                    r="10"
                    stroke="oklch(0.72 0.22 200)"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx="31"
                    cy="24"
                    r="10"
                    stroke="oklch(0.65 0.25 270)"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M22 24 C22 24 24 21 26 24"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.5 }}
              className="text-center"
            >
              <h1 className="font-display text-[32px] font-bold leading-none tracking-tight">
                <span className="gradient-text">Random</span>
                <span className="text-foreground">Chat</span>
              </h1>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">
                Meet someone new, right now.
                <br />
                No account. No history.
              </p>
            </motion.div>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32, duration: 0.5 }}
              className="flex gap-2 flex-wrap justify-center"
            >
              {FEATURES.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="glass rounded-full px-3 py-1 text-xs text-muted-foreground flex items-center gap-1.5"
                >
                  <Icon className="h-3 w-3 text-primary" />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.5 }}
              className="w-full"
            >
              <button
                type="button"
                onClick={() => void login()}
                disabled={isBusy}
                data-ocid="login.submit_button"
                className="relative w-full overflow-hidden rounded-2xl py-4 font-display text-[15px] font-bold text-background transition-smooth disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.25 270), oklch(0.72 0.22 200))",
                  boxShadow:
                    "0 0 24px oklch(0.72 0.22 200 / 0.45), 0 4px 16px oklch(0 0 0 / 0.3)",
                }}
              >
                {isBusy ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-background/30 border-t-background animate-spin" />
                    Connecting…
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Lock className="h-4 w-4" />
                    Sign in with Internet Identity
                  </span>
                )}
              </button>
            </motion.div>

            <p className="text-center text-xs text-muted-foreground/60 leading-relaxed">
              Sessions are ephemeral — no data is stored after you leave.
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="mt-8 text-xs text-muted-foreground/50"
        >
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary/70 transition-smooth hover:text-primary"
          >
            caffeine.ai
          </a>
        </motion.p>
      </div>
    </Layout>
  );
}
