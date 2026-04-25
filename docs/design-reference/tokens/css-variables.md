# Design Tokens — CSS Custom Properties

This file records the actual custom-property layers used by the Nous references that matter for this portfolio: Hermes root tokens, the current portfolio root tokens, and the NousNet theme-scoped variables that drive its ornamental background system.

---

## hermes-agent — `web/src/index.css:4-11`

Snapshot note: the upstream raw file was retrieved as a compressed single-line export; the line references below point to the logical `:root` / theme-token span in that snapshot.

```css
:root {
  --foreground: color-mix(in srgb, #ffffff 0%, transparent);
  --foreground-base: #ffffff;
  --foreground-alpha: 0;
  --midground: color-mix(in srgb, #ffe6cb 100%, transparent);
  --midground-base: #ffe6cb;
  --midground-alpha: 1;
  --background: color-mix(in srgb, #041c1c 100%, transparent);
  --background-base: #041c1c;
  --background-alpha: 1;
  --warm-glow: rgba(255, 189, 56, 0.35);
  --noise-opacity-mul: 1;
  --theme-font-sans: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --theme-font-mono: ui-monospace, "SF Mono", "Cascadia Mono", Menlo, Consolas, monospace;
  --theme-font-display: var(--theme-font-sans);
  --theme-base-size: 15px;
  --theme-line-height: 1.55;
  --theme-letter-spacing: 0;
  --radius: 0.5rem;
  --theme-radius: 0.5rem;
  --theme-spacing-mul: 1;
  --theme-density: comfortable;
}
```

---

## portfolio — `app/globals.css:4-15`

```css
:root {
  --background:     #041c1c;
  --surface:        color-mix(in srgb, #ffe6cb 4%, #041c1c);
  --midground:      #ffe6cb;
  --foreground:     #fcfdfc;
  --accent:         #ffbd38;
  --accent-glow:    rgba(255, 189, 56, 0.35);
  --border:         color-mix(in srgb, #ffe6cb 15%, transparent);
  --border-subtle:  color-mix(in srgb, #ffe6cb 8%, transparent);
  --muted:          color-mix(in srgb, #ffe6cb 50%, transparent);
  --forest-surface: #0e1f0e;
  --forest-border:  #1f3320;
}
```

---

## nousnet — theme-scoped background variables

The original plan asked for `:root`-level CSS variables from both repos. In practice, the portfolio-relevant NousNet piece is not a standalone root palette block; it is the theme-level variable layer that carries the decorative SVG background and theme foreground/background pairings. That layer is captured here instead of pretending there is a second Hermes-style root token file.

**Source basis:** `PsycheFoundation/nousnet/website/frontend/src/themes.ts` (theme variable snapshot) and `effects/svg-background-pattern.md`.

```css
:root[data-theme="dark"] {
  --color-bg: #2a462d;
  --color-fg: #fcfdfc;
  --bg-svg: url("data:image/svg+xml,%3Csvg ... fill='%23396a3d' opacity='0.5' ...%3E%3C/svg%3E");
}

:root[data-theme="light"] {
  --color-bg: #ecf0eb;
  --color-fg: #2a462d;
  --bg-svg: url("data:image/svg+xml,%3Csvg ... fill='%23dfe3de' opacity='0.3' ...%3E%3C/svg%3E");
}
```

---

## Notes on Divergence

| Layer | What it controls | Why it matters here |
|---|---|---|
| Hermes root tokens | The canonical dark-teal + cream semantic system | Closest match to the portfolio’s current implementation |
| Portfolio root tokens | Current production variables in this repo | What actual UI work should consume |
| NousNet theme vars | Theme-specific background ornament and bg/fg pairing | Important reference for decorative surfaces and hero treatment |

- Hermes and the portfolio are semantic-token-first.
- NousNet is more palette- and ornament-driven.
- For future UI work in this repo, prefer the portfolio root layer while borrowing ornament/effect patterns from NousNet.
