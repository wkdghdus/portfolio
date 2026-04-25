# Effect — Noise Grain Overlay

## What it does

A fixed-position, full-viewport SVG turbulence noise texture layered over every surface at ~3% opacity with `mix-blend-mode: overlay`. Creates the impression of a physical material — paper, film, coated metal — rather than a flat color fill. The effect is barely perceptible in isolation but immediately noticeable by its absence.

**Source:** `NousResearch/hermes-agent/web/src/index.css:14-15` — `.grain` utility class · `portfolio/app/globals.css:24-33` — global page grain

---

## CSS Implementation

```css
/* Portfolio global implementation — apply to body */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.03;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px 200px;
}
```

### From hermes-agent — `.grain` utility class

```css
.grain {
  position: relative;
}
.grain::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.12;
  background: repeating-conic-gradient(currentColor 0% 25%, #0000 0% 50%) 0 0 / 2px 2px;
  border-radius: inherit;
}
```

The Hermes `.grain` version is a local element texture, not the page-wide body overlay. `border-radius: inherit` ensures the grain respects the element's corner radius.

---

## Key Parameters

| Parameter | Value | Effect of changing |
|---|---|---|
| `baseFrequency` | `0.85` (portfolio global) | Lower = coarser grain; higher = finer grain |
| `numOctaves` | `4` (portfolio global) | More octaves = richer texture; +perf cost |
| `opacity` | `0.03` (global) / `0.12` (Hermes local) | Lower = subtler; local utility can run slightly stronger |
| `mix-blend-mode` | `overlay` | Lightens lights, darkens darks — gives texture depth |
| `background-size` | `200px 200px` | Tile repeat size; smaller = more visible tiling |
| `stitchTiles` | `stitch` | Eliminates seam at tile edges — always use |

---

## Usage Notes

- **Always use `pointer-events: none`** — otherwise the overlay blocks clicks
- **`position: fixed` for global** (body::after) so it doesn't scroll with content
- **`position: absolute` for local** (.grain::after) so it clips to the element
- Keep global opacity ≤ 0.05 — higher values look like a broken render on OLED displays
- Multiply by `--noise-opacity-mul` CSS variable to allow theme-level intensity control

---

## Preview HTML

```html
<!DOCTYPE html>
<html>
<head>
<style>
  body {
    margin: 0;
    min-height: 100vh;
    background: #041c1c;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: monospace;
    color: #ffe6cb;
  }
  body::after {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.04;
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 200px 200px;
  }
  .card {
    padding: 2rem 3rem;
    border: 1px solid rgba(255,230,203,0.15);
    font-size: 0.875rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
</style>
</head>
<body>
  <div class="card">Hover to feel the grain</div>
</body>
</html>
```
