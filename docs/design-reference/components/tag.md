# Component — Tag

## Purpose
Small inline label for project categories, technology names, and topic classifications. The portfolio's canonical tag uses forest-surface background with gold text — visually distinct from the body while reading as part of the same dark palette.

**Source:** Portfolio `components/ProjectCard.tsx:40-49` · `components/ProjectHeader.tsx:25-35`

---

## Canonical Implementation

```tsx
type TagProps = {
  children: React.ReactNode;
  asButton?: boolean;
};

export function Tag({ children, asButton = false }: TagProps) {
  const className = `
    inline-flex items-center
    bg-[--forest-surface] border border-[--forest-border]
    text-[--accent] text-xs font-mono
    uppercase tracking-[0.08em]
    px-2 py-0.5
  `;

  if (asButton) {
    return <button className={className}>{children}</button>;
  }

  return <span className={className}>{children}</span>;
}
```

### CSS Variables Required

```css
:root {
  --forest-surface: #0e1f0e;  /* very dark forest green */
  --forest-border:  #1f3320;  /* slightly lighter forest border */
  --accent:         #ffbd38;  /* gold text */
}
```

---

## Tag List Pattern

Wrapping multiple tags in a flex container with `gap-2` and `flex-wrap`:

```tsx
<div className="flex flex-wrap gap-2">
  {tags.map((tag) => (
    <span
      key={tag}
      className="
        bg-[--forest-surface] border border-[--forest-border]
        text-[--accent] text-xs font-mono
        uppercase tracking-[0.08em]
        px-2 py-0.5
      "
    >
      {tag}
    </span>
  ))}
</div>
```

---

## Comparison with Badge

| | Tag | Badge |
|---|---|---|
| Background | `--forest-surface` (#0e1f0e) | Variant-specific |
| Text | `--accent` (gold) | Variant-specific |
| Border | `--forest-border` | `--border` or variant |
| Font | `font-mono text-xs` | `font-compressed text-[0.65rem]` |
| Tracking | `tracking-[0.08em]` | `tracking-[0.15em]` |
| Use case | Project/content tags | Status, severity, category badges |

The tag is simpler and more opinionated than the badge — it has no variants. Use tag for content metadata; use badge for system/status labels.

---

## Hover Variant (optional)

For clickable/filterable tags:

```tsx
<button className="
  bg-[--forest-surface] border border-[--forest-border]
  text-[--accent] text-xs font-mono
  uppercase tracking-[0.08em]
  px-2 py-0.5
  hover:bg-[--accent] hover:text-[--background] hover:border-[--accent]
  transition-colors duration-150
  cursor-pointer
">
  {tag}
</button>
```

On hover: gold background + dark text (the inverted gold state).

---

## Do / Don't

**Do:** Keep tags short — 1–3 words maximum  
**Do:** Use lowercase content — the `uppercase` class handles transformation  
**Don't:** Use `rounded-full` pill tags — sharp corners are Nous  
**Don't:** Mix tag and badge components in the same visual context — pick one pattern per section
