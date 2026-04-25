# Effect — Gold Glow Shadow

## What it does

On hover, cards and interactive elements reveal a gold-tinted outer `box-shadow` and simultaneously transition their border color to the accent gold. The glow is soft and diffuse — not a sharp neon ring but a warm ambient light emanating from behind the element. Pairs with a border color transition for double reinforcement.

**Source:** Portfolio `components/ProjectCard.tsx:14-17` · `portfolio/app/globals.css:9-12`

---

## Tailwind Implementation

```tsx
// Full hover effect — border + shadow together
<div className="
  border border-[--border]
  hover:border-[--accent]
  hover:shadow-[0_0_16px_var(--accent-glow)]
  transition-all duration-200
">
```

### Broken out

```tsx
// Border transition
"border border-[--border] hover:border-[--accent] transition-colors duration-200"

// Shadow reveal
"hover:shadow-[0_0_16px_var(--accent-glow)]"

// Combined (canonical portfolio pattern)
"border border-[--border] hover:border-[--accent] hover:shadow-[0_0_16px_var(--accent-glow)] transition-all duration-200"
```

---

## CSS Equivalent

```css
.card {
  border: 1px solid var(--border);
  box-shadow: none;
  transition: border-color 200ms ease, box-shadow 200ms ease;
}

.card:hover {
  border-color: var(--accent);              /* #ffbd38 */
  box-shadow: 0 0 16px var(--accent-glow);  /* rgba(255, 189, 56, 0.35) */
}
```

---

## Glow Intensity Variants

| Use case | Shadow value | Notes |
|---|---|---|
| Subtle (text links) | `0 0 8px var(--accent-glow)` | 8px spread |
| Standard (cards) | `0 0 16px var(--accent-glow)` | 16px spread — canonical |
| Prominent (CTA) | `0 0 24px var(--accent-glow)` | 24px spread |
| Inset glow | `inset 0 0 12px var(--accent-glow)` | Glow inside element |

---

## CSS Variables Required

```css
:root {
  --accent:      #ffbd38;
  --accent-glow: rgba(255, 189, 56, 0.35);
  --border:      color-mix(in srgb, #ffe6cb 15%, transparent);
}
```

---

## Usage Notes

- **Only use gold glow** — never blue, purple, or green glow. Gold is the single accent.
- Use `transition-all duration-200` or `transition-colors` — avoid `transition-none` on interactive elements
- The glow works best against `#041c1c` — on lighter backgrounds the 35% opacity becomes invisible
- For image thumbnails: add `group` to the container and use `group-hover:` on the image wrapper
- Do NOT add glow to decorative elements that aren't interactive — it signals interactivity

---

## Full Card Example

```tsx
<article className="
  group relative
  border border-[--border] hover:border-[--accent]
  bg-[--surface]
  hover:shadow-[0_0_16px_var(--accent-glow)]
  transition-all duration-200
  overflow-hidden
">
  <div className="overflow-hidden bg-[--forest-surface] h-48">
    <img className="
      w-full h-full object-cover
      group-hover:scale-105 transition-transform duration-300
    " />
  </div>
  <div className="p-4">
    <h2 className="font-display text-lg uppercase tracking-[0.12em] text-[--foreground]">
      Project Title
    </h2>
  </div>
</article>
```

---

## Preview HTML

```html
<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #041c1c; }
  .card { width: 240px; padding: 24px; border: 1px solid rgba(255,230,203,0.15); color: #ffe6cb; transition: border-color 200ms ease, box-shadow 200ms ease; }
  .card:hover { border-color: #ffbd38; box-shadow: 0 0 16px rgba(255, 189, 56, 0.35); }
</style>
</head>
<body><div class="card">Glow on hover</div></body>
</html>
```
