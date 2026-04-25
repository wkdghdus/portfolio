# Plan: Nous Research Aesthetic Redesign

**Date:** 2026-04-25  
**Goal:** Restyle the portfolio to match the Nous Research visual identity — dark teal/forest backgrounds, warm cream text, gold accents, uppercase wide-tracked typography, noise textures, and SVG grid patterns.

---

## Requirements Summary

Replicate three pillars of the Nous aesthetic across all portfolio pages:

1. **Color palette** — Deep dark teal-black bg (`#041c1c`), warm cream midground text (`#ffe6cb`), bright white (`#fcfdfc`), gold/amber accent (`#ffbd38`), forest green surfaces
2. **Typography** — Display headings: uppercase + wide letter-spacing (`tracking-[0.15em]`), using `Big Shoulders Display` (free Google Font, closest match to Mondwest); body: Geist (existing)
3. **Texture & pattern** — Subtle CSS noise overlay (SVG data-URI, ~3% opacity, `mix-blend-mode: overlay`) + repeating dot-grid SVG background pattern

Source references:
- Hermes: `web/src/index.css` — `--background-base: #041c1c`, `--midground-base: #ffe6cb`, `--warm-glow: rgba(255, 189, 56, 0.35)`, `font-mondwest` uppercase
- NousNet: `website/frontend/src/colors.ts` + `themes.ts` — forest/slate/gold palette, SVG pattern backgrounds

---

## Acceptance Criteria

- [ ] `npm run build` passes with zero TypeScript errors
- [ ] Background is visibly dark teal (`#041c1c`), not black or neutral gray
- [ ] Primary text color is warm cream (`#ffe6cb`), not pure white
- [ ] At least one gold accent (`#ffbd38`) is visible on every page (tags, borders, or hover states)
- [ ] All `<h1>` and `<h2>` headings render uppercase with `letter-spacing >= 0.1em`
- [ ] `Big Shoulders Display` font loads and applies to headings (verifiable in DevTools)
- [ ] A subtle noise texture is visible on the background (not distracting, ≤5% opacity)
- [ ] A dot-grid SVG pattern is visible behind the main content area
- [ ] ProjectCard hover state shows a gold border or glow effect
- [ ] Dark mode is removed — single dark theme only (Nous products are always dark)
- [ ] All pages remain responsive at 375px, 768px, 1280px viewports

---

## Implementation Steps

### Step 1 — Update `app/globals.css` (color tokens + texture)

**File:** `app/globals.css`

Replace the current light/dark dual-theme with a single always-dark Nous theme:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

:root {
  /* Nous color palette */
  --background:     #041c1c;
  --surface:        color-mix(in srgb, #ffe6cb 4%, #041c1c);
  --midground:      #ffe6cb;
  --foreground:     #fcfdfc;
  --accent:         #ffbd38;
  --accent-glow:    rgba(255, 189, 56, 0.35);
  --border:         color-mix(in srgb, #ffe6cb 15%, transparent);
  --border-subtle:  color-mix(in srgb, #ffe6cb 8%, transparent);
  --muted:          color-mix(in srgb, #ffe6cb 50%, transparent);

  /* Forest surface for tags/badges */
  --forest-surface: #1a2d1a;
  --forest-border:  #2d4f1e;
}

@theme inline {
  --color-background:    var(--background);
  --color-foreground:    var(--foreground);
  --color-midground:     var(--midground);
  --color-accent:        var(--accent);
  --color-surface:       var(--surface);
  --color-border:        var(--border);
  --color-muted:         var(--muted);
  --font-sans:           var(--font-geist-sans);
  --font-mono:           var(--font-geist-mono);
  --font-display:        var(--font-big-shoulders);
}

/* Noise overlay on body pseudo-element */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: overlay;
}

/* Dot-grid background pattern on body */
body {
  background-color: var(--background);
  color: var(--midground);
  font-family: Arial, Helvetica, sans-serif;
  background-image: radial-gradient(circle, color-mix(in srgb, #ffe6cb 12%, transparent) 1px, transparent 1px);
  background-size: 28px 28px;
}
```

### Step 2 — Add `Big Shoulders Display` font to `app/layout.tsx`

**File:** `app/layout.tsx`

Add the display font alongside existing Geist fonts and wire it to `--font-big-shoulders` CSS variable:

```tsx
import { Big_Shoulders_Display } from "next/font/google";

const bigShoulders = Big_Shoulders_Display({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

// Add bigShoulders.variable to <html> className
```

### Step 3 — Update `components/ProjectCard.tsx`

**File:** `components/ProjectCard.tsx`

Replace neutral classes with Nous palette:

| Before | After |
|--------|-------|
| `border-neutral-200 dark:border-neutral-800` | `border-[--border]` |
| `bg-white dark:bg-neutral-900` | `bg-[--surface]` |
| `shadow-sm hover:shadow-md` | `hover:border-[--accent] hover:shadow-[0_0_16px_var(--accent-glow)]` |
| `bg-neutral-100 dark:bg-neutral-800` | `bg-[--forest-surface]` (image placeholder) |
| `text-neutral-900 dark:text-neutral-50` | `text-[--foreground]` |
| `text-neutral-500 dark:text-neutral-400` | `text-[--muted]` |
| `text-neutral-600 dark:text-neutral-300` | `text-[--midground]` |
| Tags: `bg-neutral-100 dark:bg-neutral-800 text-neutral-700` | `bg-[--forest-surface] border border-[--forest-border] text-[--accent]` |

Card title font: add `font-display uppercase tracking-[0.12em]`

### Step 4 — Update `components/ProjectHeader.tsx`

**File:** `components/ProjectHeader.tsx`

- `h1` title: add `font-display uppercase tracking-[0.15em]` + `text-[--foreground]`
- Border: change to `border-[--border]`
- Date text: `text-[--muted]`
- Description: `text-[--midground]`
- Tags: same as card tags (forest surface + gold accent text)

### Step 5 — Update `app/page.tsx`

**File:** `app/page.tsx`

- Page heading ("Projects" or similar): `font-display uppercase tracking-[0.15em] text-[--foreground]`
- Subtitle: `text-[--muted]`
- No other layout changes needed (grid structure stays the same)

### Step 6 — Update `app/projects/[slug]/page.tsx`

**File:** `app/projects/[slug]/page.tsx`

- Add `prose-invert`-equivalent custom prose overrides in globals.css so markdown body text uses `--midground` color:

```css
.prose {
  --tw-prose-body: var(--midground);
  --tw-prose-headings: var(--foreground);
  --tw-prose-links: var(--accent);
  --tw-prose-code: var(--accent);
  --tw-prose-bold: var(--foreground);
  --tw-prose-hr: var(--border);
  --tw-prose-quotes: var(--midground);
}
```

### Step 7 — Verify build

Run `npm run build` and confirm zero errors. Spot-check:
- DevTools: `--background` computed = `#041c1c`
- DevTools: `Big Shoulders Display` loaded in Network tab
- Visual: noise overlay visible (very subtle grain)
- Visual: dot-grid pattern visible on background

---

## Risks and Mitigations

| Risk | Mitigation |
|------|-----------|
| `color-mix()` not supported in older browsers | Acceptable — portfolio targets modern browsers; Next.js 16 output |
| `Big Shoulders Display` FOUT during font load | `next/font` handles preloading/subsetting automatically |
| CSS custom property syntax in Tailwind v4 `bg-[--var]` | Tailwind v4 supports arbitrary values with CSS vars natively |
| Noise overlay z-index interferes with interactive elements | `pointer-events: none` on `body::before` prevents any interaction blocking |
| Removing dark mode breaks existing `dark:` classes | All `dark:` classes will be replaced in Steps 3–5; no residuals |

---

## Verification Steps

1. `npm run build` exits 0 — TypeScript + lint clean
2. `npm run dev`, open `http://localhost:3000`:
   - Background: dark teal, not black (`#041c1c`)
   - Text: warm cream (`#ffe6cb`), not pure white
   - Heading font: Big Shoulders Display, uppercase, wide-tracked
   - Hover a ProjectCard: gold glow border appears
   - Open a project detail page: same palette, prose text readable
3. Resize to 375px: grid collapses to 1-col, no overflow
4. Check DevTools > Sources > Fonts: `Big Shoulders Display` present
5. Check DevTools > Elements > body::before: noise overlay at `opacity: 0.03`

---

## Files Changed

| File | Change |
|------|--------|
| `app/globals.css` | Full rewrite — new Nous color tokens, noise overlay, dot-grid pattern, prose overrides |
| `app/layout.tsx` | Add `Big_Shoulders_Display` font, wire CSS var |
| `app/page.tsx` | Heading style: uppercase + tracking |
| `components/ProjectCard.tsx` | Replace all neutral/dark: classes with Nous palette |
| `components/ProjectHeader.tsx` | Replace all neutral/dark: classes with Nous palette |
| `app/projects/[slug]/page.tsx` | Minor: remove `dark:prose-invert` (handled via CSS vars) |

No new files created. No changes to `lib/projects.ts`, `types/project.ts`, or `public/projects` symlink.
