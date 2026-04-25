# Design Tokens — Typography

**Primary sources:** `PsycheFoundation/nousnet/website/frontend/src/fonts.ts:1` (snapshot) · `NousResearch/hermes-agent/web/src/index.css:0-8` (JetBrains Mono + theme typography tokens) · `portfolio/app/layout.tsx:1-19` and `portfolio/app/globals.css:18-22` (current font wiring)

---

## Source Snapshot Map

| Concern | Source |
|---|---|
| Nous font declarations | `nousnet/website/frontend/src/fonts.ts:1` |
| Hermes terminal/code font + theme typography | `hermes-agent/web/src/index.css:0-8` |
| Portfolio installed display/body/mono fonts | `app/layout.tsx:1-19` |
| Portfolio Tailwind font aliases | `app/globals.css:18-22` |

The nousnet font snapshot was retrieved as a single-line raw source export, so its literal declarations are cited at `:1`.

---

## Font Families

| Name | Role | Typical weight | Letter-spacing rule | Usage rule | Source |
|---|---|---|---|---|---|
| `Soufflet Vert Hybrid 106R` | Nous brand/display mark | varies | wide-tracked display | Use only for hero/display branding; uppercase treatment preferred | `fonts.ts:1` |
| `Geist Mono` | Nous headline/body/button text | 400–700 | `-0.25px` body, `+0.5px` button | Dense technical copy, controls, mono-flavored UI | `fonts.ts:1` |
| `Geist` | Auxiliary sans text | 400–600 | normal/tight | Secondary copy when mono is too rigid | `fonts.ts:1` |
| `Mondwest` | Hermes brand/nav/badges | 400–700 | `0.1em` to `0.15em` uppercase UI tracking | Navigation, labels, action text | `hermes-agent` usage snapshot reflected in this guide |
| `font-expanded` | Hermes card titles | 700 | `0.08em` | Compact uppercase titles inside cards | `hermes-agent` usage snapshot reflected in this guide |
| `font-compressed` | Hermes badge labels | 400 | `0.15em` | Always uppercase, always small | `hermes-agent` usage snapshot reflected in this guide |
| `Bebas Neue` | Portfolio-safe display substitute | 400 | `0.12em` to `0.15em` | Current installed display font for headings/buttons | `app/layout.tsx:15-19` |
| `JetBrains Mono` | Hermes code / embedded terminal | 400 / 700 | default mono spacing | Terminal and code surfaces only | `index.css:0-2` |

---

## Portfolio-Safe Substitutes

| Target source font | Substitute | Why it works | Current install path |
|---|---|---|---|
| Mondwest | `Bebas Neue` | Condensed uppercase display energy, strong nav/button presence | `app/layout.tsx:15-19` |
| Soufflet Vert | `Bebas Neue` or `Big Shoulders Display` | Wide display replacement without licensing friction | `Bebas Neue` is already wired; `Big Shoulders Display` is optional |
| font-compressed | `Geist Mono` with tighter tracking | Keeps labels narrow and technical | `app/layout.tsx:10-13`, `app/globals.css:19-21` |

---

## Usage Rules

| Role | Font | Size band | Weight | Letter spacing | Transform | Source |
|---|---|---|---|---|---|---|
| Display | `Bebas Neue` / Soufflet-class display | `2xl`–`7xl` | 400+ | minimum `0.1em`, prefer `0.12em`–`0.15em` | uppercase required | `fonts.ts:1`, `app/layout.tsx:15-19` |
| Headline | `Bebas Neue`, `Geist Mono`, or project display face | `2xl`–`5xl` | 400–700 | at least `0.08em` when display-styled | usually uppercase | `fonts.ts:1` |
| Body | `Geist` / `Geist Mono` / system sans | `xs`–`xl` | 400–500 | `-0.25px` for tight mono body | sentence case | `fonts.ts:1` |
| Button | `Bebas Neue` / Mondwest / mono UI | `sm`–`xl` | 400–700 | `+0.5px` or `tracking-[0.1em]` | uppercase required | `fonts.ts:1` |
| Badge | compressed/mono label face | `0.65rem` | 400 | `tracking-[0.15em]` | uppercase required | `fonts.ts:1` |
| Nav | `Mondwest` / `Bebas Neue` | `0.8rem` | 400 | `tracking-[0.12em]` | uppercase required | Hermes usage pattern reflected in this guide |
| Muted metadata | mono or utility label face | `0.6rem` | 400 | `tracking-[0.15em]` | uppercase + low opacity | Hermes usage pattern reflected in this guide |

---

## Current Portfolio Wiring

```tsx
// app/layout.tsx:1-19
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const bebasNeue = Bebas_Neue({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: "400",
});
```

```css
/* app/globals.css:18-22 */
@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --font-display: var(--font-big-shoulders);
}
```

---

## Notes

- The portfolio currently uses `Bebas Neue` as its practical display stand-in for the Nous reference look.
- The strict takeaway is not the exact proprietary font; it is the typography system behavior: uppercase display text, wide tracking, restrained body copy, and mono-leaning utility text.
