# Effect — SVG Background Pattern (NousNet)

## What it does

NousNet injects a decorative SVG as a CSS custom property (`--bg-svg`), allowing the entire background ornament to be swapped by changing a single variable at theme level. The SVG is typically a geometric/botanical ornamental element positioned in a corner or as a repeating tile. In dark theme it uses `forest[4]` (`#396a3d`) fill at 0.5 opacity; in light theme it uses `slate[3]` at 0.3 opacity.

**Source:** `PsycheFoundation/nousnet/website/frontend/src/themes.ts:39-52` (theme exports translated to CSS here)

---

## Architecture Pattern

```css
/* translated from themes.ts darkTheme export */
:root[data-theme="dark"] {
  --bg-svg: url("data:image/svg+xml,%3Csvg ... fill='%232a462d' opacity='0.5' ...%3E%3C/svg%3E");
}

/* translated from themes.ts lightTheme export */
:root[data-theme="light"] {
  --bg-svg: url("data:image/svg+xml,%3Csvg ... fill='%23dfe3de' opacity='0.3' ...%3E%3C/svg%3E");
}

/* Applied to root element */
html {
  background-image: var(--bg-svg);
  background-repeat: no-repeat;
  background-position: top right;
  background-size: 40vmax;
}
```

The key architectural insight: **the CSS var carries the entire `url(...)` string**, not just a color. This means themes can swap not just the color but the whole ornament payload. The snippet above is a CSS translation of the source theme exports, not a verbatim copy.

---

## CornerFleur Pattern

NousNet's `Header.tsx` references a `CornerFleur` SVG component positioned absolutely in the corner:

```tsx
// Header.tsx — decorative corner element
<CornerFleur
  style={{
    position: "absolute",
    top: 0,
    right: 0,
    width: "25vw",  // responsive: 25vw on small screens
  }}
/>
```

The fleur SVG uses `svgFillCurrentColor` utility to inherit the current text color, making it automatically theme-responsive without custom fill values.

---

## Portfolio Application

For the portfolio, a simplified version using a CSS background image:

```css
:root {
  --bg-ornament: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='80' fill='none' stroke='%231f3320' stroke-width='1'/%3E%3Ccircle cx='100' cy='100' r='40' fill='none' stroke='%231f3320' stroke-width='1'/%3E%3C/svg%3E");
}

.hero-section {
  background-image: var(--bg-ornament);
  background-repeat: no-repeat;
  background-position: top right -10%;
  background-size: 50vmax;
  opacity: 0.4;
}
```

---

## Usage Notes

- The SVG custom property approach is ideal for multi-theme systems — swap the whole ornament per theme
- Keep ornamental SVGs at low opacity (0.3–0.5) so they read as texture, not content
- For static single-theme sites (like the portfolio), a simple `background-image` on the root or hero is sufficient
- Use `background-size: contain` or a vmax-based size to keep the ornament proportional across viewports
- Forest green strokes (`#1f3320`, `#2a462d`) are the canonical ornament colors on dark backgrounds

---

## Preview HTML

```html
<!DOCTYPE html>
<html>
<head>
<style>
  :root {
    --bg-svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='160' cy='40' r='28' fill='none' stroke='%232a462d' stroke-width='2' opacity='0.5'/%3E%3Ccircle cx='160' cy='40' r='52' fill='none' stroke='%232a462d' stroke-width='1' opacity='0.35'/%3E%3C/svg%3E");
  }
  body { margin: 0; min-height: 100vh; background: #041c1c var(--bg-svg) no-repeat top right / 40vmax; }
</style>
</head>
<body></body>
</html>
```
