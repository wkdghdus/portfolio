# Nous Research Design Reference Library

**Snapshot date:** 2026-04-25  
**Sources:** `PsycheFoundation/nousnet` (working-source references) · `NousResearch/hermes-agent` (working-source references) · portfolio local files

---

## What this is

A file-system design reference library capturing the primary tokens, visual effects, component patterns, layout blueprints, and interactions that informed the Nous-derived direction for this portfolio. No build step. No framework. Open a file, copy what you need.

**Aesthetic in one sentence:** Dark teal-black backgrounds, warm cream typography, gold-only accents, uppercase wide-tracked display type, and organic texture (grain + grid) — restrained but unmistakably Nous.

Start with [`NORTH_STAR.md`](./NORTH_STAR.md) before anything else.

---

## Index

### Tokens
| File | Contents |
|---|---|
| [tokens/colors.md](./tokens/colors.md) | Full 6-palette system (slate, forest, gold, lime, success, error) + semantic theme mapping |
| [tokens/typography.md](./tokens/typography.md) | Fonts, sizes, weights, letter-spacing, usage rules, portfolio substitutes |
| [tokens/css-variables.md](./tokens/css-variables.md) | Hermes and portfolio root tokens plus translated NousNet theme-variable mappings |
| [tokens/spacing.md](./tokens/spacing.md) | Gap, padding, icon sizing, density patterns |

### Effects
| File | Contents |
|---|---|
| [effects/noise-grain.md](./effects/noise-grain.md) | SVG data-URI turbulence noise overlay |
| [effects/dot-grid.md](./effects/dot-grid.md) | 28px repeating SVG dot-grid background |
| [effects/svg-background-pattern.md](./effects/svg-background-pattern.md) | NousNet theme-aware encoded SVG via CSS var |
| [effects/glow-shadow.md](./effects/glow-shadow.md) | Gold accent glow box-shadow on hover |
| [effects/bevel-button.md](./effects/bevel-button.md) | Inset box-shadow 3D bevel for buttons |
| [effects/shadow-card.md](./effects/shadow-card.md) | Layered translateZ shadow card |
| [effects/dithered-sphere.md](./effects/dithered-sphere.md) | WebGL icosphere pipeline notes, shader excerpts, and integration guidance |

### Components
| File | Contents |
|---|---|
| [components/badge.md](./components/badge.md) | 6-variant badge — font-compressed, 0.15em tracking |
| [components/button.md](./components/button.md) | 4-variant button — bevel, uppercase, gold primary |
| [components/card.md](./components/card.md) | CSS-var-driven card with theme override hooks |
| [components/outline-box.md](./components/outline-box.md) | Fieldset legend floating-label border |
| [components/progress-bar.md](./components/progress-bar.md) | Chunked repeating-gradient progress bar |
| [components/status-chip.md](./components/status-chip.md) | Status dot + 2s pulse animation |
| [components/tag.md](./components/tag.md) | Portfolio canonical forest-surface tag |

### Layout
| File | Contents |
|---|---|
| [layout/sidebar-layout.md](./layout/sidebar-layout.md) | Fixed→sticky sidebar, h-dvh, responsive mobile |
| [layout/card-grid.md](./layout/card-grid.md) | 1→2→3 column responsive project grid |
| [layout/navigation.md](./layout/navigation.md) | Nav font, spacing, opacity-reveal interaction |

### Interactions
| File | Contents |
|---|---|
| [interactions/hover-opacity-reveal.md](./interactions/hover-opacity-reveal.md) | opacity-60 → opacity-100 on hover |
| [interactions/hover-glow.md](./interactions/hover-glow.md) | Accent glow shadow reveal |
| [interactions/active-press.md](./interactions/active-press.md) | Invert bevel shadow on press |
| [interactions/pulse-animation.md](./interactions/pulse-animation.md) | Active status 2s scale+opacity pulse |
| [interactions/slide-transition.md](./interactions/slide-transition.md) | Mobile sidebar translateX 200ms ease-out |

### Assets
| File | Contents |
|---|---|
| [assets/palette-swatches.html](./assets/palette-swatches.html) | Standalone swatch browser — all 6 palettes |
| [assets/font-specimen.html](./assets/font-specimen.html) | Standalone type specimen — full hierarchy |
