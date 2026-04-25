# Effect — Dot Grid Background

## What it does

A 28×28px repeating SVG radial-gradient pattern that renders as a fine grid of cream-colored dots over the dark background. Creates geometric structure and depth — the grid reads as a technical drawing surface, reinforcing the research/engineering identity.

**Source:** Portfolio `app/globals.css:35-45` — `body` background pattern

---

## CSS Implementation

```css
body {
  background-color: var(--background);         /* #041c1c base */
  background-image: radial-gradient(
    circle,
    rgba(255, 230, 203, 0.08) 1px,
    transparent 1px
  );
  background-size: 28px 28px;
}
```

### Layered with noise grain

When combining dot-grid with noise, use separate properties or pseudo-elements:

```css
body {
  background-color: var(--background);
  background-image: radial-gradient(
    circle,
    rgba(255, 230, 203, 0.08) 1px,
    transparent 1px
  );
  background-size: 28px 28px;
}

body::after {
  /* noise overlay — see noise-grain.md */
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.03;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,...");
  background-size: 200px 200px;
}
```

### SVG version (for CSS background-image)

```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28'%3E%3Ccircle cx='14' cy='14' r='1' fill='rgba(255,230,203,0.08)'/%3E%3C/svg%3E");
background-size: 28px 28px;
```

---

## Parameterization

| Parameter | Default | Effect of changing |
|---|---|---|
| Grid cell size | `28px 28px` | Larger = more open / airy; smaller = denser grid |
| Dot radius | `1px` | Larger dots become visible squares at scale |
| Dot opacity | `0.08` | Keep 0.05–0.15; above 0.2 becomes dominant |
| Dot color | `rgba(255,230,203,...)` | Use `--midground` base — never pure white |
| Dot position | `cx/cy = 14` (half of 28) | Center dot in cell by setting cx/cy = size/2 |

---

## Usage Notes

- **Keep `background-attachment: fixed`** if the grid should stay locked while content scrolls (parallax effect)
- Omit `background-attachment: fixed` if the grid should scroll with the page content
- On section panels / feature cards, the dot-grid can be applied locally to add surface texture without affecting the whole page
- Never use on white/light surfaces — the cream dots are invisible below ~30% lightness

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
    background-color: #041c1c;
    background-image: radial-gradient(circle, rgba(255,230,203,0.08) 1px, transparent 1px);
    background-size: 28px 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffe6cb;
    font-family: monospace;
  }
  h1 {
    font-size: 2rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #fcfdfc;
  }
</style>
</head>
<body>
  <h1>Dot Grid Surface</h1>
</body>
</html>
```
