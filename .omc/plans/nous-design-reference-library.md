# Plan: Nous Research Design Reference Library

**Date:** 2026-04-25
**Status:** Ready for execution
**Goal:** Build a self-contained, static design reference library under `docs/design-reference/` that captures every visual element, token, effect, and component pattern from the Nous Research aesthetic — drawing directly from source code in `PsycheFoundation/nousnet` and `NousResearch/hermes-agent`. This library becomes the north star that all future UI decisions reference.

---

## Requirements Summary

Create a file-system reference library (no CMS, no build step) that:

1. **Documents all design tokens** — colors, typography, spacing, radii extracted verbatim from source repos
2. **Captures component patterns** — with working code snippets for each UI primitive
3. **Encodes visual effects** — noise texture, dot-grid, dithered sphere, SVG patterns, shadow card, bevel buttons, chunked progress bars
4. **Provides interaction catalog** — hover states, opacity reveals, glow shadows, pulse animations
5. **Includes layout blueprints** — sidebar layout, card grids, navigation patterns
6. **Links everything to source** — every entry cites its origin file and line

Execution is documentation + code authoring only. No changes to existing `app/`, `components/`, or `lib/` files.

---

## Acceptance Criteria

- [ ] `docs/design-reference/` directory exists with no build dependency
- [ ] `docs/design-reference/README.md` serves as navigable index of all sections
- [ ] Every color swatch in `tokens/colors.md` includes hex value, palette name, and source citation
- [ ] Every font in `tokens/typography.md` includes name, weight, letter-spacing, and usage rule
- [ ] Each effect in `effects/` has a self-contained HTML snippet that renders in-browser without framework
- [ ] Each component in `components/` has a Tailwind v4 + React implementation snippet ready to copy
- [ ] `NORTH_STAR.md` summarizes the 5 non-negotiable aesthetic rules (1 page max)
- [ ] `npm run build` is unaffected (no imports of reference docs into app code)

---

## Directory Structure to Create

```
docs/
└── design-reference/
    ├── README.md                     # Navigable index + visual overview
    ├── NORTH_STAR.md                 # 5 inviolable aesthetic rules (the "what never changes")
    ├── tokens/
    │   ├── colors.md                 # Full palette: slate, forest, gold, lime, success, error + semantic mappings
    │   ├── typography.md             # Fonts, sizes, weights, letter-spacing, usage rules
    │   ├── spacing.md                # Gap, padding, icon sizing patterns
    │   └── css-variables.md          # All :root CSS custom properties verbatim from both repos
    ├── effects/
    │   ├── noise-grain.md            # SVG data-URI noise overlay — code + preview HTML
    │   ├── dot-grid.md               # Repeating SVG dot-grid background — code + preview HTML
    │   ├── svg-background-pattern.md # NousNet encoded SVG pattern (theme-aware) — code
    │   ├── dithered-sphere.md        # WebGL icosphere with dither+noise shaders — full GLSL + TS code
    │   ├── glow-shadow.md            # Gold glow hover shadow — Tailwind snippet + CSS
    │   ├── bevel-button.md           # Inset box-shadow 3D bevel — CSS snippet
    │   └── shadow-card.md            # Layered 3D translateZ shadow card — code + description
    ├── components/
    │   ├── badge.md                  # font-compressed, 0.15em tracking, 6 variants
    │   ├── button.md                 # 4 variants (primary/secondary/theme/action), bevel, uppercase
    │   ├── card.md                   # CSS-var-driven card, clip-path slots, CardHeader/Title/Content
    │   ├── outline-box.md            # Fieldset legend floating-label border pattern
    │   ├── progress-bar.md           # Chunked repeating gradient segments
    │   ├── status-chip.md            # Colored dot + pulse animation, 5 status states
    │   └── tag.md                    # forest-surface bg + gold text tag (already in portfolio)
    ├── layout/
    │   ├── sidebar-layout.md         # Fixed→sticky sidebar, h-dvh, responsive mobile pattern
    │   ├── card-grid.md              # 1→2→3 col responsive grid
    │   └── navigation.md             # Nav font, spacing, opacity-reveal interaction
    ├── interactions/
    │   ├── hover-opacity-reveal.md   # opacity-60 → opacity-100 on hover
    │   ├── hover-glow.md             # box-shadow accent-glow reveal
    │   ├── active-press.md           # Invert inset shadow on active/pressed
    │   ├── pulse-animation.md        # Active status 2s scale+opacity pulse keyframe
    │   └── slide-transition.md       # Mobile sidebar translateX ease-out 200ms
    └── assets/
        ├── palette-swatches.html     # Self-contained swatch browser (no framework)
        └── font-specimen.html        # Self-contained font specimen page
```

---

## Implementation Steps

### Step 1 — Scaffold & Index (30 min)
**Files:** `docs/design-reference/README.md`, `docs/design-reference/NORTH_STAR.md`

Create the directory and write two anchor documents:

**README.md** is the navigable index — links to every sub-document in the tree above. Must include a one-paragraph aesthetic summary usable as a brief for any future AI agent or collaborator.

**NORTH_STAR.md** codifies 5 non-negotiable rules derived from source:
1. Dark teal-black base (`#041c1c`) — never white, never neutral gray
2. Warm cream text (`#ffe6cb`) — body copy is never pure white; white is reserved for max-contrast headings
3. Gold accent (`#ffbd38` / `#ecae13`) — the only interactive accent color; no blue links
4. Uppercase + wide tracking for all display type — `tracking-[0.12em]` minimum on headings
5. Texture always present — at minimum noise grain overlay; dot-grid or SVG pattern on feature surfaces

---

### Step 2 — Token Documentation (45 min)
**Files:** `tokens/colors.md`, `tokens/typography.md`, `tokens/spacing.md`, `tokens/css-variables.md`

#### `tokens/colors.md`
Document all palettes from `nousnet/website/frontend/src/colors.ts` verbatim:

```
Slate (11 shades): #fcfdfc → #0c100a
Forest (7 shades): #dcf4de → #1f3320
Gold (6 shades):   #faecc6 → #956f0e
Lime (6 shades):   #e6ffd1 → #2f5e08
Success (6 shades): #e3fcfc → #0c5555
Error (6 shades):  #feede7 → #5e2308
```

Include semantic mapping table:

| Role | Dark Theme | Light Theme | Palette Index |
|---|---|---|---|
| Background | `#2a462d` (forest[6]) | `#ecf0eb` (slate[2]) | — |
| Foreground | `#fcfdfc` (slate[0]) | `#2a462d` (forest[6]) | — |
| Primary text | `#ffe6cb` (midground-base) | `#0c100a` (slate[10]) | — |
| Accent | `#ecae13` (gold[3]) / `#ffbd38` | `#396a3d` (forest[4]) | — |
| Surface | forest[7] + 4% cream | slate[1] | — |
| Tag bg | `#0e1f0e` (forest-surface) | `#ecf0eb` | — |
| Active status | `#4b9551` (forest[3]) | same | — |
| Warning | `#ffbd38` | same | gold[~] |
| Destructive | `#fb2c36` | same | — |

**Source citations:**
- Palettes: `nousnet/website/frontend/src/colors.ts`
- Semantic mapping dark: `nousnet/website/frontend/src/themes.ts`
- Midground/background/warm-glow: `hermes-agent/web/src/index.css` lines ~1-20

#### `tokens/typography.md`
Document fonts from `nousnet/website/frontend/src/fonts.ts` and `hermes-agent/web/src/App.tsx`:

**Font Families:**
| Name | Role | Source |
|---|---|---|
| Soufflet Vert Hybrid 106R | Display (nousnet brand marks) | nousnet/fonts.ts |
| Geist Mono | Headline, Body, Button (nousnet) | nousnet/fonts.ts |
| Geist | Auxiliary (nousnet) | nousnet/fonts.ts |
| Mondwest | Brand, Nav, Badges (hermes-agent) | hermes-agent/App.tsx |
| font-expanded | Card titles (hermes-agent) | hermes-agent/card.tsx |
| font-compressed | Badge labels (hermes-agent) | hermes-agent/badge.tsx |
| Bebas Neue | Display headings (portfolio current) | app/layout.tsx |
| JetBrains Mono | Code/terminal (hermes-agent) | hermes-agent/index.css |

**Portfolio-safe equivalents** (free/Google Fonts for Mondwest/Soufflet):
- Mondwest → Bebas Neue (already installed) — condensed, uppercase only
- Soufflet → Big Shoulders Display — wide display serif-adjacent
- font-compressed → any narrowly-tracked monospace

**Usage rules:**
```
Display:  sizes 2xl–7xl, any weight, letter-spacing ≥ 0.1em, UPPERCASE required
Headline: sizes 2xl–5xl, regular/semibold/bold
Body:     sizes xs–xl, letter-spacing -0.25px (tight mono)
Button:   sizes sm–xl, letter-spacing +0.5px, UPPERCASE
Badge:    0.65rem, tracking-[0.15em], UPPERCASE
Nav:      0.8rem, tracking-[0.12em], UPPERCASE
Muted:    0.6rem, tracking-[0.15em], UPPERCASE, opacity-30
```

#### `tokens/css-variables.md`
Paste the full `:root` block from `hermes-agent/web/src/index.css` verbatim, then add the portfolio's current custom properties from `app/globals.css`. Annotate each with its origin repo and intended use.

---

### Step 3 — Effects Documentation (60 min)
**Files:** all 7 files under `effects/`

Each file follows this template:
```
# Effect: [Name]

## What it does
[One paragraph visual description]

## Source
[repo/file/line]

## Code
[Self-contained snippet]

## Usage Notes
[When to use, when NOT to use, opacity/opacity-mul guidance]

## Preview HTML
[Optional: < 20-line standalone HTML that renders the effect]
```

#### `effects/noise-grain.md`
Source: `hermes-agent/web/src/index.css` — `.grain` utility class and `body::after` pseudo-element.

The noise overlay is a tiling SVG turbulence filter encoded as a `data:image/svg+xml` base64 URL, applied as a `background-image` at 3% opacity via `mix-blend-mode: overlay` on `body::after` (position: fixed, pointer-events: none, z-index: 9999). The key parameters: `baseFrequency="0.65"`, `numOctaves="3"`, `stitchTiles="stitch"`.

**Preview HTML snippet** — a `<div>` with the grain CSS applied over a teal background.

#### `effects/dot-grid.md`
Source: `app/globals.css` (portfolio current implementation).

28×28px repeating SVG circle (r=1, fill: cream 8% opacity) as `background-image` on `body`. Pattern creates a subtle tactile grid without distracting from content.

**Parameterization guidance:**
- `cx/cy` = half the grid cell size (14 for 28px grid)
- `fill-opacity` keep ≤ 0.15
- Color: `--midground` at low opacity (never use white directly)

#### `effects/svg-background-pattern.md`
Source: `nousnet/website/frontend/src/themes.ts` — the encoded SVG injected as `--bg-svg`.

NousNet uses a decorative SVG (cornered fleur/ornamental element) as a CSS custom property, allowing themes to swap it. Dark theme uses `forest[600]` fill at 0.5 opacity. Document the architecture: custom property carries the whole `url("data:image/svg+xml,...")` string, allowing single-point theme switching.

#### `effects/dithered-sphere.md`
Source: `nousnet/website/frontend/src/gl/` — full pipeline.

Document the complete WebGL rendering setup:

1. **Geometry:** `icosphere.ts` — generates subdivided sphere (level 6) as position array + triangle cells
2. **Vertex shader (`vert.glsl`):** applies MVP matrix, computes noise using `snoise(vec4(position, time * 0.4))` for organic surface animation
3. **Fragment shader (`frag.glsl`):** maps noise to color spectrum (dark red → blue/purple → cyan), applies diffuse+specular lighting, then passes through dither
4. **Dither shader (`dither.glsl`):** 8×8 Bayer matrix ordered dithering — quantizes to binary alpha channel creating the characteristic pixelated edge
5. **Noise shader (`noise.glsl`):** Simplex 4D noise (Ian McEwan / Ashima Arts implementation)
6. **Orchestration (`regl.ts`):** `createSphereAnimation(canvas, ditherColor)` — regl frame loop, mouse tracking uniform, AbortController for cleanup

Paste all GLSL verbatim. Note: `ditherColor` is the only external input — the portfolio passes its accent color (`#ffbd38`) to tint the dither pattern.

**Implementation note:** This is the most visually distinctive Nous effect. Suitable for hero/landing sections. Requires `regl` and `gl-matrix` npm packages.

#### `effects/glow-shadow.md`
Source: `hermes-agent` + portfolio `components/ProjectCard.tsx`.

```css
/* Tailwind utility */
shadow-[0_0_16px_var(--accent-glow)]

/* CSS equiv */
box-shadow: 0 0 16px rgba(255, 189, 56, 0.35);

/* Pair with border transition */
border-color: var(--border);         /* default */
border-color: var(--accent);         /* on hover */
```

Apply on `group-hover:` with `transition-shadow duration-200`.

#### `effects/bevel-button.md`
Source: `nousnet/website/frontend/src/components/Button.tsx`.

```css
/* Default — light raised bevel */
box-shadow: inset 0 1px 0 rgba(255,255,255,0.15),
            inset 0 -1px 0 rgba(0,0,0,0.25);

/* Active/pressed — invert depth */
box-shadow: inset 0 -1px 0 rgba(255,255,255,0.15),
            inset 0 1px 0 rgba(0,0,0,0.25);
```

Combined with `uppercase` + `tracking-[0.1em]` + gold background for primary CTA buttons.

#### `effects/shadow-card.md`
Source: `nousnet/website/frontend/src/components/ShadowCard.tsx`.

3D layered shadow via CSS transforms:
```css
/* Shadow layer — positioned behind card */
transform: translateZ(-10px);
background: forest[700];
position: absolute;
top: 8px; left: 8px; right: -8px; bottom: -8px;

/* Inner dark layer — hides on hover */
top: 2px; left: 2px;
display: none; /* on :hover */
```

Creates the illusion of a card floating above a colored shadow. Pairs with `transform-style: preserve-3d` on parent.

---

### Step 4 — Component Snippets (60 min)
**Files:** all 7 files under `components/`

Each component file includes:
- **Purpose** — one sentence
- **Source** — repo + file
- **Key classes** — annotated list
- **Full implementation** — copy-paste ready, Tailwind v4 + React TSX
- **Variants table** — visual variants with their class strings
- **Do/Don't** — one example of correct vs incorrect usage

#### `components/badge.md`
```tsx
// Source: hermes-agent/web/src/components/ui/badge.tsx
// Base: inline-flex items-center border px-2 py-0.5
//       font-compressed text-[0.65rem] tracking-[0.15em] uppercase transition-colors

const variants = {
  default:     "border-[--border] bg-[--foreground]/10 text-[--midground]",
  destructive: "border-[--destructive]/30 bg-[--destructive]/15 text-[--destructive]",
  success:     "border-[--success]/30 bg-[--success]/15 text-[--success] grain",
  warning:     "border-[--accent]/30 bg-[--accent]/15 text-[--accent]",
  outline:     "border-[--border] text-[--muted]",
  secondary:   "border-[--border-subtle] bg-[--surface] text-[--midground]",
}
```

#### `components/button.md`
```tsx
// Source: nousnet/website/frontend/src/components/Button.tsx (adapted for Tailwind v4)

const variants = {
  primary:   "bg-[--accent] text-[--background] uppercase tracking-[0.1em] font-mono",
  secondary: "bg-[--surface] text-[--midground] border border-[--border]",
  action:    "border border-[--border] bg-transparent text-[--midground] hover:border-[--accent]",
  ghost:     "bg-transparent text-[--midground] hover:text-[--foreground]",
}

// Bevel: add to primary/secondary
// "shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.25)]"
// "active:shadow-[inset_0_-1px_0_rgba(255,255,255,0.15),inset_0_1px_0_rgba(0,0,0,0.25)]"
```

#### `components/card.md`
```tsx
// Source: hermes-agent/web/src/components/ui/card.tsx
// Key insight: CSS vars as hooks for theme-level overrides
//   --component-card-clip-path
//   --component-card-border-image
//   --component-card-background
//   --component-card-box-shadow

// CardTitle: font-expanded text-sm font-bold tracking-[0.08em] uppercase blend-lighter
// CardDescription: font-mondwest text-xs text-[--muted]
```

Document the CSS-var override pattern that allows a single theme-level change to restyle all cards.

#### `components/outline-box.md`
```tsx
// Source: nousnet/website/frontend/src/components/OutlineBox.tsx
// Pattern: <fieldset> + <legend> "floating label" border effect

// border: 2px solid forest[500] (dark theme)
// legend: margin: 0 1ch; transform: translateY(-10%)
// legend span: padding: 0 0.4ch (creates visible gap in border)
```

#### `components/progress-bar.md`
```tsx
// Source: nousnet/website/frontend/src/components/ProgressBar.tsx
// Chunked segments via repeating-linear-gradient

// Pattern:
background: repeating-linear-gradient(
  90deg,
  var(--color-active) 0,
  var(--color-active) calc(var(--chunk-width) * 1px),
  transparent calc(var(--chunk-width) * 1px),
  transparent calc((var(--chunk-width) + var(--chunk-spacing)) * 1px)
);
background-size: calc((var(--chunk-width) + var(--chunk-spacing)) * 1px) 16px;

// Color: forest[500] = #396a3d (normal), lime[300] = #90f53d (big/prominent)
```

#### `components/status-chip.md`
```tsx
// Source: nousnet/website/frontend/src/components/StatusChip.tsx

const statusColors = {
  active:           "success[400] = #4ade80",  // + pulse animation
  funding:          "lime[300]    = #90f53d",
  completed:        "forest[500]  = #396a3d",
  paused:           "slate[400]   = #b9beb6",
  waitingForMembers:"gold[300]    = #f6c955",
}

// Pulse keyframe (active only):
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(2); opacity: 0; }
}
animation: pulse 2s ease-in-out infinite;
```

#### `components/tag.md`
Document the portfolio's current implementation as canonical for simple tags:
```tsx
// Source: components/ProjectCard.tsx (portfolio)
"bg-[--forest-surface] border border-[--forest-border] 
 text-[--accent] text-xs font-mono uppercase tracking-[0.08em] px-2 py-0.5"
```

---

### Step 5 — Layout Blueprints (30 min)
**Files:** `layout/sidebar-layout.md`, `layout/card-grid.md`, `layout/navigation.md`

#### `layout/sidebar-layout.md`
Source: `hermes-agent/web/src/App.tsx`.

```
Root (h-dvh max-h-dvh min-h-0 flex flex-col overflow-hidden)
├── Mobile header (lg:hidden fixed top-0 left-0 right-0)
│   └── Hamburger + brand logo
└── Flex wrapper (flex-1 flex min-h-0)
    ├── Sidebar (fixed lg:sticky w-64 h-dvh max-h-dvh)
    │   border-r border-current/20
    │   Mobile: transition-transform duration-200 ease-out + translate offsets
    └── Content (flex-1 min-h-0 min-w-0 flex flex-col overflow-y-auto)
        px-3 sm:px-6
```

Key: `h-dvh` (not `h-screen`) avoids mobile browser chrome issues. `min-h-0` on flex children prevents scroll overflow bugs.

#### `layout/card-grid.md`
Source: portfolio `app/page.tsx`.
```
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6
```
Cards fill column width. Cover image: fixed 48px height container with `object-cover`. Hover: `scale-105 transition-transform duration-300`.

#### `layout/navigation.md`
```
// Font: font-mondwest (Bebas Neue equivalent) text-[0.8rem] tracking-[0.12em] uppercase
// Active: text-[--midground] (full opacity)
// Inactive: opacity-60 hover:opacity-100 transition-opacity duration-200
// Icon: h-3.5 w-3.5 shrink-0 (14px, never rescales)
// Gap: gap-2 (tight), gap-3 (standard), gap-6 (between sections)
```

---

### Step 6 — Interaction Catalog (20 min)
**Files:** all 5 files under `interactions/`

Each file: purpose + trigger + CSS/Tailwind snippet + example component context.

| File | Trigger | Classes |
|---|---|---|
| hover-opacity-reveal | inactive nav items | `opacity-60 hover:opacity-100 transition-opacity duration-200` |
| hover-glow | card hover | `hover:shadow-[0_0_16px_var(--accent-glow)] hover:border-[--accent] transition-all duration-200` |
| active-press | bevel buttons | `active:shadow-[inset...]` (see bevel-button.md) |
| pulse-animation | active status dot | `@keyframes pulse` 2s scale+opacity |
| slide-transition | mobile sidebar | `transition-transform duration-200 ease-out translate-x-0 / -translate-x-full` |

---

### Step 7 — Visual Assets (30 min)
**Files:** `assets/palette-swatches.html`, `assets/font-specimen.html`

#### `assets/palette-swatches.html`
Self-contained single HTML file (no framework, no build step). Renders all 6 palettes as color grid with:
- Swatch square (48px)
- Hex value label
- CSS variable name (if mapped)
- Palette name + index

Uses inline CSS only. Background: `#041c1c`. Font: system-ui monospace. Two themes: dark (default) + light toggle.

#### `assets/font-specimen.html`
Self-contained HTML showcasing typography hierarchy:
- H1: Bebas Neue, 4xl, uppercase, tracking-[0.15em]
- H2: Bebas Neue, 2xl, uppercase, tracking-[0.12em]
- Body: Geist/system-ui, base, -0.25px tracking
- Badge: compressed, 0.65rem, tracking-[0.15em], uppercase
- Button: Bebas Neue, sm, tracking-[0.1em], uppercase

Uses Google Fonts CDN links. No JS required.

---

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Source repos change / go private | All relevant code is pasted verbatim into reference docs, not linked. Snapshot as of 2026-04-25. |
| Mondwest / Soufflet are proprietary fonts | Document exact substitutes (Bebas Neue, Big Shoulders Display) with comparison notes. |
| WebGL dithered sphere too complex to maintain | Isolate as a standalone `demo/sphere.html` with zero framework deps — copy-paste to use. |
| Reference gets stale as portfolio evolves | `NORTH_STAR.md` codifies principles (not implementations) — principles change rarely. |
| `docs/` accidentally imported into Next.js build | Add `docs/` to `.gitignore` exclusion from next build? No — docs are static markdown/html, Next.js won't pick them up unless explicitly imported. Safe. |

---

## Verification Steps

1. `ls docs/design-reference/` — confirm all 4 subdirs + 2 root files exist
2. `find docs/design-reference -name "*.md" | wc -l` — should return ≥ 20 files
3. Open `assets/palette-swatches.html` in browser — all swatches render with correct hex labels
4. Open `assets/font-specimen.html` in browser — Bebas Neue loads and renders uppercase headings
5. `npm run build` — zero errors, no reference files imported by app code
6. Each `effects/*.md` file contains at minimum 1 code block
7. Each `components/*.md` file contains a copy-pasteable TSX snippet

---

## ADR

**Decision:** Create a static file-system reference library under `docs/design-reference/`

**Drivers:**
1. North star consistency — all future UI work should cite the same ground truth
2. No build dependency — must work as plain files, no Storybook/MDX/CMS overhead
3. AI-agent friendly — structured markdown + code blocks so future agents can read and apply without ambiguity

**Alternatives considered:**

- **Storybook** — provides live component previews but adds heavy build dependency, overkill for a personal portfolio
- **Figma design file** — visual but not version-controlled, inaccessible to AI agents working in code
- **Inline comments in globals.css** — loses structure, cannot document effects/interactions/layout as distinct categories

**Why chosen:** Static markdown in `docs/` is zero-dependency, git-versioned, readable by both humans and AI agents, and co-located with the codebase. The self-contained HTML assets (`palette-swatches.html`, `font-specimen.html`) provide visual confirmation without any build step.

**Consequences:**
- Positive: Any future feature request can begin with "see docs/design-reference/NORTH_STAR.md"
- Positive: New components can be scaffolded by copying snippets from `components/`
- Negative: Preview HTML requires manual browser open (no hot reload)
- Negative: If Nous Research updates their source repos, the reference captures the 2026-04-25 snapshot and will drift

**Follow-ups:**
- After library is created, add a one-liner to `CLAUDE.md`: "Design reference: see `docs/design-reference/NORTH_STAR.md`"
- Consider adding a `demo/sphere.html` as a bonus — the WebGL dithered sphere is the most visually distinctive Nous effect and worth having as a runnable demo
- Audit existing portfolio components against the reference after creation to identify gaps

---

## Source Map

All design data in this library was extracted from:

| Source | Files Accessed | Date |
|---|---|---|
| `PsycheFoundation/nousnet` | `website/frontend/src/colors.ts`, `themes.ts`, `fonts.ts`, `components/Header.tsx`, `components/OutlineBox.tsx`, `components/ShadowCard.tsx`, `components/StatusChip.tsx`, `components/ProgressBar.tsx`, `components/Button.tsx`, `gl/frag.glsl`, `gl/dither.glsl`, `gl/noise.glsl`, `gl/regl.ts` | 2026-04-25 |
| `NousResearch/hermes-agent` | `web/src/index.css`, `web/src/App.tsx`, `web/src/components/ui/badge.tsx`, `web/src/components/ui/button.tsx`, `web/src/components/ui/card.tsx` | 2026-04-25 |
| Portfolio current | `app/globals.css`, `app/layout.tsx`, `components/ProjectCard.tsx`, `components/ProjectHeader.tsx`, `app/page.tsx` | 2026-04-25 |
