# Interaction — Hover Glow

## What it does
On hover, cards and interactive containers reveal a gold outer glow (box-shadow) and transition their border to the accent gold. Signals interactivity and creates warmth against the dark background.

**Source:** Portfolio `components/ProjectCard.tsx:14-17` · `portfolio/app/globals.css:9-12`

---

## Classes

```tsx
// Minimal
"hover:shadow-[0_0_16px_var(--accent-glow)] transition-shadow duration-200"

// Full (border + shadow)
"border border-[--border] hover:border-[--accent] hover:shadow-[0_0_16px_var(--accent-glow)] transition-all duration-200"
```

---

## CSS

```css
.card {
  border: 1px solid var(--border);
  box-shadow: none;
  transition: border-color 200ms ease, box-shadow 200ms ease;
}
.card:hover {
  border-color: var(--accent);
  box-shadow: 0 0 16px var(--accent-glow);
}
```

---

## Required Variables

```css
--accent:      #ffbd38;
--accent-glow: rgba(255, 189, 56, 0.35);
--border:      color-mix(in srgb, #ffe6cb 15%, transparent);
```

---

## Intensity Variants

| Spread | Use case |
|---|---|
| `0 0 8px` | Subtle — text links, small chips |
| `0 0 16px` | Standard — cards, panels |
| `0 0 24px` | Prominent — hero CTAs |
| `0 0 32px` | Maximum — featured/spotlighted item |

## When to Use / Not Use

**Use on:** Cards, buttons, nav items, any click target  
**Avoid on:** Decorative elements, static illustrations, disabled states
