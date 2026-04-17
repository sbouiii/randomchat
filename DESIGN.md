# Design Brief

## Tone & Purpose
Instant random video chat. Luxe minimalism + tech energy. Glassmorphic UI with vibrant gradients. Premium, immersive, no friction. Emotional tone: anticipation, excitement.

## Differentiation
Animated gradient backgrounds + real glassmorphism (not fake) + purple-cyan identity + instant matching (zero UX fluff) + mobile-first from day one.

## Color Palette

| Token | OKLCH | Purpose |
|-------|-------|---------|
| Background | 0.12 0 0 | Deep charcoal, premium darkness |
| Primary (Cyan) | 0.72 0.22 200 | Energetic, accessible, modern |
| Secondary (Purple) | 0.35 0.12 270 | Supporting accent, subtle depth |
| Accent Gradient | purple → cyan | Signature gradient for hero elements |
| Destructive (Red) | 0.60 0.20 15 | End/skip actions, warm contrast |
| Muted | 0.22 0 0 | Card backgrounds, subtle surfaces |
| Border | 0.25 0.05 0 | Ghosted separators, transparency-first |

## Typography

| Layer | Font | Usage |
|-------|------|-------|
| Display | General Sans (400–700) | Headers, CTA labels, match state |
| Body | DM Sans (400–700) | Body text, UI labels, descriptions |
| Mono | Geist Mono (400–700) | Status codes, technical text (rare) |

**Type Scale:** Hierarchy via size + weight. Heavy use of `font-medium` for emphasis.

## Elevation & Depth

- **Background**: Animated gradient base layer (purple → cyan flow)
- **Cards**: Muted surface, soft shadow (0.18 0 0)
- **Glass panels**: Backdrop blur (10–16px), semi-transparent overlay (0.6–0.8 opacity)
- **Floating buttons**: Elevated shadow + cyan glow on interaction

## Structural Zones

| Zone | Surface | Treatment | Purpose |
|------|---------|-----------|---------|
| Home Hero | Animated gradient | gradient-flow animation, full viewport | Immerse user in brand energy |
| Video Split | Muted cards | Rounded 12px, glass overlay controls | Split-screen video with glassmorphic overlays |
| Action Bar | Glass (strong) | Backdrop blur 16px, semi-transparent border | Controls float above video, always accessible |
| Header | Card | Soft muted background, minimal chrome | Status + user info |
| Match Wait | Gradient + spinner | Animated gradient bg + skeleton pulse | Suspense state, premium feel |

## Spacing & Rhythm

- **Grid**: 4px base unit (4, 8, 12, 16, 24, 32, 48px)
- **Padding**: 16px cards, 12px internal sections, 24px page margins (mobile)
- **Gap**: 8–12px between UI elements, 16px between sections

## Component Patterns

- **Buttons**: 44px min height (touch-friendly). Cyan primary, red destructive. Smooth hover → glow shadow.
- **Cards**: Rounded 12px, muted background, soft border.
- **Glass overlays**: Backdrop blur + semi-transparent background + delicate border.
- **Video frames**: Rounded 12px, 2px cyan border on active speaker.
- **Labels**: Medium weight, 14px body font, all-caps optional for action labels.
- **Skeleton**: Pulsing muted gradient (subtle animation, not aggressive).

## Motion & Choreography

| Interaction | Animation | Duration | Easing |
|-------------|-----------|----------|--------|
| State transitions | fade-in + slide-in-right | 0.3–0.4s | ease-out |
| Gradient background | gradient-flow (infinite) | 8s | ease-in-out |
| Button hover | glow shadow expand | 0.2s | ease-out |
| Match found | scale + fade | 0.4s | ease-out |
| Video end | fade-out | 0.3s | ease-out |

All transitions use `transition-smooth: cubic-bezier(0.4, 0, 0.2, 1)`.

## Constraints

- Mobile-first: optimized for iOS Safari + Android Chrome first.
- Dark mode always. No light mode.
- High contrast: all text meets WCAG AA against backgrounds.
- No transparency beyond 0.6 for readability.
- Glassmorphism only for controls/overlays, not structural containers.
- Max 2 accent colors in any viewport (cyan + purple primary).
- Minimal icons: rely on text labels first, icons secondary.

## Signature Detail

**Animated gradient flow on home screen**: A subtle 8s loop of purple-to-cyan gradient shifting position, creating motion without distraction. Used as hero background, reinforcing brand energy and premium feel. Deployed via `animate-gradient-flow` utility class.

## Exports

- **index.css**: OKLCH tokens (dark mode) + @font-face + .glass / .glass-strong / .gradient-* utilities + @layer utilities with animations
- **tailwind.config.js**: Custom keyframes (gradient-flow, fade-in, slide-in-right), boxShadow (glow, elevated), animation mappings

