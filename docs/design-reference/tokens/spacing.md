# Design Tokens — Spacing

**Source:** `NousResearch/hermes-agent/web/src/App.tsx:1` · `NousResearch/hermes-agent/web/src/components/ui/:1` · portfolio `app/page.tsx:8-38`, `components/ProjectCard.tsx:28-50`

---

## Gap Patterns

| Scale | Value | Context |
|---|---|---|
| `gap-1` | 4px | Icon + text within a tight inline element |
| `gap-2` | 8px | Tight list items, icon + label in nav |
| `gap-3` | 12px | Standard navigation item spacing |
| `gap-4` | 16px | Card internal sections |
| `gap-6` | 24px | Between navigation sections / groups |
| `gap-8` | 32px | Between major layout sections |

From `hermes-agent/App.tsx`: nav uses `gap-2` (icon+label), `gap-3` (items), `gap-6` (section groups).

---

## Padding Patterns

| Context | Classes | Notes |
|---|---|---|
| Card inner | `p-4` | 16px all sides — canonical card padding |
| Card header | `p-4` + `border-b border-border` | Bottom border divides header from content |
| Badge | `px-2 py-0.5` | 8px × 2px — tight horizontal badge |
| Button (default) | `px-5 py-2.5` | Nav/action buttons |
| Button (small) | `px-3 py-1.5` | System action buttons |
| Button (large) | `px-6 py-3` | CTA buttons |
| Sidebar | `px-3 py-2` (items) | Per nav item |
| Page content | `px-3 sm:px-6` | Responsive horizontal content padding |
| Section top | `pt-2 sm:pt-4 lg:pt-6` | Progressive vertical breathing room |
| Section bottom | `pb-4 sm:pb-8` | Generous bottom on non-chat routes |

---

## Icon Sizing

**Canonical icon size: `h-3.5 w-3.5` (14px)**

```tsx
// hermes-agent/App.tsx — never rescale this
"h-3.5 w-3.5 shrink-0"
```

`shrink-0` prevents flex compression. Always include it on icons inside flex containers.

| Context | Size | Classes |
|---|---|---|
| Navigation icons | 14px | `h-3.5 w-3.5 shrink-0` |
| Button icons | 14–16px | `h-4 w-4 shrink-0` |
| Status dots | 1em | `w-[1em] h-[1em] rounded-full` |
| Large feature icons | 24–32px | `h-6 w-6` / `h-8 w-8` |

---

## Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius` | `0.5rem` (8px) | Default (hermes-agent) |
| `rounded-none` | 0 | Nousnet buttons and cards — sharp corners are Nous |
| `rounded-sm` | 0.125rem | Subtle rounding on badges only |
| `rounded-full` | 9999px | Status dots only |

**Default recommendation:** Use `rounded-none` for cards and buttons (Nous aesthetic favors sharp geometry). Use `rounded-sm` on badges. Never `rounded-lg` or `rounded-xl` — they read as generic SaaS, not Nous.

---

## Density

From `hermes-agent/index.css`:
```css
--theme-density:      comfortable;   /* default */
--theme-spacing-mul:  1;             /* 1 = normal, < 1 = compact, > 1 = spacious */
```

The `spacing-mul` variable is an architectural hook — multiply base spacing values by this scalar to enable compact/comfortable/spacious density modes without component changes.
