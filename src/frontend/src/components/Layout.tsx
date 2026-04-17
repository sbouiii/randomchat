import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  /** When true, the animated gradient background is shown (used on all pages) */
  withGradient?: boolean;
}

export function Layout({ children, withGradient = true }: LayoutProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground font-body">
      {/* Animated gradient background blobs */}
      {withGradient && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        >
          {/* Purple blob — top left */}
          <div
            className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl animate-gradient-flow"
            style={{ background: "oklch(0.65 0.25 270)" }}
          />
          {/* Cyan blob — bottom right */}
          <div
            className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full opacity-25 blur-3xl animate-gradient-flow"
            style={{
              background: "oklch(0.72 0.22 200)",
              animationDelay: "4s",
            }}
          />
          {/* Mid purple accent */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full opacity-10 blur-3xl animate-gradient-flow"
            style={{
              background: "oklch(0.60 0.22 260)",
              animationDelay: "2s",
            }}
          />
        </div>
      )}

      {/* Page content */}
      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
}
