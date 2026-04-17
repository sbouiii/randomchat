import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { LogOut, Users, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Layout } from "../components/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";

const ONLINE_COUNT = "24,530";

const FEATURES = [
  { icon: "🎲", label: "Random match" },
  { icon: "🔒", label: "Anonymous" },
  { icon: "⚡", label: "Instant" },
];

export function HomePage() {
  const { clear } = useInternetIdentity();
  const navigate = useNavigate();

  function handleLogout() {
    clear();
    void navigate({ to: "/login" });
  }

  function handleStart() {
    void navigate({ to: "/waiting" });
  }

  return (
    <ProtectedRoute>
      <Layout withGradient>
        <div className="flex min-h-screen flex-col">
          {/* Top bar */}
          <header
            className="glass-strong border-b border-border/25 sticky top-0 z-20 flex items-center justify-between px-4 py-3"
            data-ocid="home.header"
          >
            {/* Brand */}
            <div className="flex items-center gap-2">
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.25 270), oklch(0.72 0.22 200))",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
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
              <span className="font-display text-[17px] font-bold leading-none">
                <span className="gradient-text">Random</span>
                <span className="text-foreground">Chat</span>
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Online badge */}
              <div
                className="flex items-center gap-1.5 glass rounded-full px-3 py-1.5 text-xs font-medium"
                data-ocid="home.online_count"
              >
                <span
                  className="h-2 w-2 rounded-full pulse-dot"
                  style={{ background: "oklch(0.72 0.22 200)" }}
                />
                <Users className="h-3.5 w-3.5 text-primary" />
                <span className="text-foreground">{ONLINE_COUNT}</span>
              </div>

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                data-ocid="home.logout_button"
                className="glass rounded-full p-2 text-muted-foreground transition-smooth hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </header>

          {/* Hero */}
          <main
            className="flex flex-1 flex-col items-center justify-center px-6 py-14 text-center"
            data-ocid="home.hero"
          >
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-10 w-full max-w-[320px]"
            >
              {/* Headline */}
              <div className="flex flex-col gap-3">
                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.6 }}
                  className="font-display text-[52px] font-bold leading-[1.05] tracking-tight"
                >
                  <span className="gradient-text">Talk to</span>
                  <br />
                  <span className="text-foreground">Strangers</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.22, duration: 0.5 }}
                  className="text-muted-foreground text-[15px] leading-relaxed"
                >
                  One tap. One random person. No trace.
                </motion.p>
              </div>

              {/* Start button with pulse rings */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.32, duration: 0.6, ease: "backOut" }}
                className="relative flex items-center justify-center"
                data-ocid="home.start_section"
              >
                {/* Ripple rings */}
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="absolute rounded-full border border-primary/20 animate-ping"
                    style={{
                      width: `${116 + i * 50}px`,
                      height: `${116 + i * 50}px`,
                      animationDelay: `${i * 0.65}s`,
                      animationDuration: "2.6s",
                    }}
                    aria-hidden="true"
                  />
                ))}
                {/* Soft glow disc */}
                <div
                  className="absolute h-28 w-28 rounded-full blur-2xl opacity-55 animate-gradient-flow"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.65 0.25 270), oklch(0.72 0.22 200))",
                  }}
                  aria-hidden="true"
                />
                {/* Button */}
                <button
                  type="button"
                  onClick={handleStart}
                  data-ocid="home.start_button"
                  className="relative z-10 h-28 w-28 rounded-full font-display text-[20px] font-bold text-background transition-smooth hover:scale-[1.07] active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.65 0.25 270), oklch(0.72 0.22 200))",
                    boxShadow:
                      "0 0 36px oklch(0.72 0.22 200 / 0.5), 0 8px 28px oklch(0 0 0 / 0.45)",
                  }}
                >
                  <span className="flex flex-col items-center gap-1">
                    <Zap className="h-7 w-7" />
                    Start
                  </span>
                </button>
              </motion.div>

              {/* Feature chips */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.52, duration: 0.5 }}
                className="flex gap-2.5 flex-wrap justify-center"
              >
                {FEATURES.map(({ icon, label }) => (
                  <div
                    key={label}
                    className="glass rounded-full px-4 py-1.5 text-xs text-muted-foreground flex items-center gap-1.5"
                  >
                    <span>{icon}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </main>

          {/* Footer */}
          <footer className="glass-strong border-t border-border/20 px-4 py-3 text-center text-xs text-muted-foreground/60">
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
          </footer>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
