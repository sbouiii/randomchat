import { u as useInternetIdentity, a as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-BcORI3wC.js";
import { c as createLucideIcon, L as Layout, m as motion } from "./Layout-CxuQYcH2.js";
import { V as Video } from "./video-T7dNve4k.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m18 14 4 4-4 4", key: "10pe0f" }],
  ["path", { d: "m18 2 4 4-4 4", key: "pucp1d" }],
  ["path", { d: "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22", key: "1ailkh" }],
  ["path", { d: "M2 6h1.972a4 4 0 0 1 3.6 2.2", key: "km57vx" }],
  ["path", { d: "M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45", key: "os18l9" }]
];
const Shuffle = createLucideIcon("shuffle", __iconNode);
const FEATURES = [
  { icon: Shuffle, label: "Random match" },
  { icon: Video, label: "Live video" },
  { icon: Lock, label: "Anonymous" }
];
function LoginPage() {
  const { login, isAuthenticated, isLoggingIn, isInitializing } = useInternetIdentity();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (isAuthenticated) {
      void navigate({ to: "/home" });
    }
  }, [isAuthenticated, navigate]);
  const isBusy = isLoggingIn || isInitializing;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { withGradient: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col items-center justify-center px-5 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 28, scale: 0.97 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        className: "w-full max-w-[360px]",
        "data-ocid": "login.card",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-strong rounded-[28px] px-7 py-9 flex flex-col items-center gap-7",
            style: {
              boxShadow: "0 8px 48px oklch(0 0 0 / 0.5), inset 0 1px 0 oklch(1 0 0 / 0.06)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { scale: 0.75, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  transition: { delay: 0.12, duration: 0.55, ease: "backOut" },
                  className: "relative",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute inset-0 rounded-full animate-gradient-flow opacity-60 blur-xl scale-125",
                        style: {
                          background: "linear-gradient(135deg, oklch(0.65 0.25 270), oklch(0.72 0.22 200))"
                        },
                        "aria-hidden": "true"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "relative h-[76px] w-[76px] rounded-full flex items-center justify-center border border-[oklch(0.72_0.22_200/0.35)]",
                        style: {
                          background: "linear-gradient(135deg, oklch(0.65 0.25 270 / 0.25), oklch(0.72 0.22 200 / 0.25))",
                          backdropFilter: "blur(12px)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "svg",
                          {
                            viewBox: "0 0 48 48",
                            fill: "none",
                            className: "h-11 w-11",
                            "aria-hidden": "true",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "circle",
                                {
                                  cx: "17",
                                  cy: "24",
                                  r: "10",
                                  stroke: "oklch(0.72 0.22 200)",
                                  strokeWidth: "2.5"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "circle",
                                {
                                  cx: "31",
                                  cy: "24",
                                  r: "10",
                                  stroke: "oklch(0.65 0.25 270)",
                                  strokeWidth: "2.5"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M22 24 C22 24 24 21 26 24",
                                  stroke: "white",
                                  strokeWidth: "1.8",
                                  strokeLinecap: "round"
                                }
                              )
                            ]
                          }
                        )
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.22, duration: 0.5 },
                  className: "text-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-[32px] font-bold leading-none tracking-tight", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "Random" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Chat" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground leading-snug", children: [
                      "Meet someone new, right now.",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      "No account. No history."
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: 0.32, duration: 0.5 },
                  className: "flex gap-2 flex-wrap justify-center",
                  children: FEATURES.map(({ icon: Icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "glass rounded-full px-3 py-1 text-xs text-muted-foreground flex items-center gap-1.5",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3 w-3 text-primary" }),
                        label
                      ]
                    },
                    label
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.42, duration: 0.5 },
                  className: "w-full",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => void login(),
                      disabled: isBusy,
                      "data-ocid": "login.submit_button",
                      className: "relative w-full overflow-hidden rounded-2xl py-4 font-display text-[15px] font-bold text-background transition-smooth disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.65 0.25 270), oklch(0.72 0.22 200))",
                        boxShadow: "0 0 24px oklch(0.72 0.22 200 / 0.45), 0 4px 16px oklch(0 0 0 / 0.3)"
                      },
                      children: isBusy ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 rounded-full border-2 border-background/30 border-t-background animate-spin" }),
                        "Connecting…"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4" }),
                        "Sign in with Internet Identity"
                      ] })
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground/60 leading-relaxed", children: "Sessions are ephemeral — no data is stored after you leave." })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.p,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.65 },
        className: "mt-8 text-xs text-muted-foreground/50",
        children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          ". Built with love using",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : ""
              )}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-primary/70 transition-smooth hover:text-primary",
              children: "caffeine.ai"
            }
          )
        ]
      }
    )
  ] }) });
}
export {
  LoginPage
};
