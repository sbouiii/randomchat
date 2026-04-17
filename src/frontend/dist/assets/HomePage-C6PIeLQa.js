import { u as useInternetIdentity, a as useNavigate, j as jsxRuntimeExports } from "./index-BcORI3wC.js";
import { c as createLucideIcon, L as Layout, m as motion } from "./Layout-CxuQYcH2.js";
import { P as ProtectedRoute } from "./ProtectedRoute-BnFlWhG4.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const ONLINE_COUNT = "24,530";
const FEATURES = [
  { icon: "🎲", label: "Random match" },
  { icon: "🔒", label: "Anonymous" },
  { icon: "⚡", label: "Instant" }
];
function HomePage() {
  const { clear } = useInternetIdentity();
  const navigate = useNavigate();
  function handleLogout() {
    clear();
    void navigate({ to: "/login" });
  }
  function handleStart() {
    void navigate({ to: "/waiting" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { withGradient: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "header",
      {
        className: "glass-strong border-b border-border/25 sticky top-0 z-20 flex items-center justify-between px-4 py-3",
        "data-ocid": "home.header",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                style: {
                  background: "linear-gradient(135deg, oklch(0.65 0.25 270), oklch(0.72 0.22 200))"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "svg",
                  {
                    viewBox: "0 0 24 24",
                    fill: "none",
                    className: "h-5 w-5",
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
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-[17px] font-bold leading-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "Random" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Chat" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-1.5 glass rounded-full px-3 py-1.5 text-xs font-medium",
                "data-ocid": "home.online_count",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "h-2 w-2 rounded-full pulse-dot",
                      style: { background: "oklch(0.72 0.22 200)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: ONLINE_COUNT })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleLogout,
                "data-ocid": "home.logout_button",
                className: "glass rounded-full p-2 text-muted-foreground transition-smooth hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "aria-label": "Sign out",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" })
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "main",
      {
        className: "flex flex-1 flex-col items-center justify-center px-6 py-14 text-center",
        "data-ocid": "home.hero",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 22 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            className: "flex flex-col items-center gap-10 w-full max-w-[320px]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.h1,
                  {
                    initial: { opacity: 0, y: 16 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.08, duration: 0.6 },
                    className: "font-display text-[52px] font-bold leading-[1.05] tracking-tight",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "Talk to" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Strangers" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.p,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: 0.22, duration: 0.5 },
                    className: "text-muted-foreground text-[15px] leading-relaxed",
                    children: "One tap. One random person. No trace."
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { delay: 0.32, duration: 0.6, ease: "backOut" },
                  className: "relative flex items-center justify-center",
                  "data-ocid": "home.start_section",
                  children: [
                    [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "absolute rounded-full border border-primary/20 animate-ping",
                        style: {
                          width: `${116 + i * 50}px`,
                          height: `${116 + i * 50}px`,
                          animationDelay: `${i * 0.65}s`,
                          animationDuration: "2.6s"
                        },
                        "aria-hidden": "true"
                      },
                      i
                    )),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute h-28 w-28 rounded-full blur-2xl opacity-55 animate-gradient-flow",
                        style: {
                          background: "linear-gradient(135deg, oklch(0.65 0.25 270), oklch(0.72 0.22 200))"
                        },
                        "aria-hidden": "true"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: handleStart,
                        "data-ocid": "home.start_button",
                        className: "relative z-10 h-28 w-28 rounded-full font-display text-[20px] font-bold text-background transition-smooth hover:scale-[1.07] active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background",
                        style: {
                          background: "linear-gradient(135deg, oklch(0.65 0.25 270), oklch(0.72 0.22 200))",
                          boxShadow: "0 0 36px oklch(0.72 0.22 200 / 0.5), 0 8px 28px oklch(0 0 0 / 0.45)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-col items-center gap-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-7 w-7" }),
                          "Start"
                        ] })
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: 0.52, duration: 0.5 },
                  className: "flex gap-2.5 flex-wrap justify-center",
                  children: FEATURES.map(({ icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "glass rounded-full px-4 py-1.5 text-xs text-muted-foreground flex items-center gap-1.5",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: icon }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
                      ]
                    },
                    label
                  ))
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "glass-strong border-t border-border/20 px-4 py-3 text-center text-xs text-muted-foreground/60", children: [
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
    ] })
  ] }) }) });
}
export {
  HomePage
};
