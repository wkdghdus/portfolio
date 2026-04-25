# Nous Research — North Star Aesthetic Rules

Five rules that define whether something looks like Nous. If a design decision violates any of these, it is not Nous.

---

## Rule 1 — Dark Teal-Black Base

**The background is always `#041c1c` (dark teal-black). Never neutral gray. Never pure black. Never white.**

The specific hue is non-negotiable. `#041c1c` is a near-black with a perceptible deep teal tint — it reads as black in dim environments but reveals its character under bright display. Neutral grays (`#111`, `#1a1a1a`, `#0f0f0f`) flatten the palette and lose the Nous identity entirely.

```css
--background: #041c1c;
```

*Source: `hermes-agent/web/src/index.css` — `--background-base: #041c1c`*

---

## Rule 2 — Warm Cream Primary Text

**Body copy is `#ffe6cb` (warm cream). Pure white is reserved for maximum-contrast headings only.**

Two-tier text contrast: warm cream (`--midground`) for reading text, bright white (`--foreground: #fcfdfc`) for display headings that need to pop. Using pure white for body text destroys the warmth that defines the Nous palette. Using cream for headings loses contrast hierarchy.

```css
--midground:  #ffe6cb;   /* body, descriptions, secondary text */
--foreground: #fcfdfc;   /* h1, h2, max-contrast display */
--muted: color-mix(in srgb, #ffe6cb 50%, transparent); /* metadata, timestamps */
```

*Source: `hermes-agent/web/src/index.css` — `--midground-base: #ffe6cb`*

---

## Rule 3 — Gold Is the Only Accent

**The single interactive/accent color is gold: `#ffbd38` (portfolio) / `#ecae13` (nousnet). No blue links. No purple. No green highlights.**

Gold serves every active state: hover borders, tag text, link color, button primary background, glow shadows. The forest green palette (`#0e1f0e` surface, `#1f3320` border) is a *background* tone for tags and surfaces — not an accent. If you reach for any color other than gold for an interactive state, you've broken the palette.

```css
--accent:      #ffbd38;
--accent-glow: rgba(255, 189, 56, 0.35);
```

*Source: `hermes-agent/web/src/index.css` — `--warning: #ffbd38`; nousnet `colors.ts` — `gold[3]: #ecae13`*

---

## Rule 4 — Uppercase Wide Tracking on All Display Type

**Every heading, label, badge, button, and navigation item is uppercase with letter-spacing ≥ 0.1em.**

This is the single most distinctive typographic marker of the Nous aesthetic. Mixed-case headings immediately read as non-Nous. The tracking creates the architectural, grid-like density that pairs with the geometric dark background.

```
h1:    tracking-[0.15em] uppercase  (font-display)
h2:    tracking-[0.12em] uppercase  (font-display)
badge: tracking-[0.15em] uppercase  (font-compressed / text-[0.65rem])
nav:   tracking-[0.12em] uppercase  (font-mondwest / text-[0.8rem])
btn:   tracking-[0.1em]  uppercase  (font-mondwest / text-xs)
muted: tracking-[0.15em] uppercase  opacity-30
```

*Source: `hermes-agent/web/src/App.tsx`, `badge.tsx`, `button.tsx`; nousnet `fonts.ts`*

---

## Rule 5 — Texture Is Always Present

**Every surface has at minimum a noise grain overlay. Feature surfaces add the dot-grid or SVG pattern underneath.**

A flat `#041c1c` background without texture reads as a generic dark theme. The noise overlay (portfolio current source: `baseFrequency: 0.85`, `numOctaves: 4`, 3% opacity, `mix-blend-mode: overlay`) is what makes the background feel like a material rather than a color fill. On hero sections or feature panels, add the dot-grid (`28px × 28px`, 8% opacity cream dots) or NousNet's SVG encoded pattern. Never ship a texture-free surface.

```css
/* Minimum — noise grain (body::before or body::after) */
background-image: url("data:image/svg+xml,..."); /* SVG feTurbulence */
opacity: 0.03;
mix-blend-mode: overlay;
position: fixed; inset: 0; pointer-events: none;

/* Feature surfaces — add dot-grid */
background-image: radial-gradient(circle, rgba(255,230,203,0.08) 1px, transparent 1px);
background-size: 28px 28px;
```

*Source: portfolio `app/globals.css`; `hermes-agent/web/src/index.css` — `.grain` utility*
