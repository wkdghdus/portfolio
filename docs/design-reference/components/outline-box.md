# Component — Outline Box (Fieldset Legend)

## Purpose
A labeled container with a border that appears to have the label text resting *on* the border line — the classic "floating label" fieldset effect. Used in nousnet for grouping related UI elements with a titled section border.

**Source:** `PsycheFoundation/nousnet/website/frontend/src/components/OutlineBox.tsx:1` (snapshot)

---

## Visual Pattern

```
┌── Title ──────────────────────┐
│                               │
│   Content goes here           │
│                               │
└───────────────────────────────┘
```

The "Title" appears to sit on the top border line, with background color showing through the padding on either side of the text, creating the cutout effect.

---

## HTML / CSS Implementation

```html
<fieldset class="outline-box">
  <legend class="outline-box__legend">
    <span>Section Title</span>
  </legend>
  <div class="outline-box__content">
    Content goes here
  </div>
</fieldset>
```

```css
.outline-box {
  border: 2px solid #396a3d;   /* forest[4] — dark theme */
  padding: 1rem;
  margin: 0;
}

.outline-box__legend {
  margin: 0 1ch;               /* horizontal breathing room */
  padding: 0;
  transform: translateY(-10%); /* float slightly above the border */
  line-height: 1;
}

.outline-box__legend span {
  padding: 0 0.4ch;            /* creates visible gap in the border */
  color: #90d596;              /* forest[2] — dark theme label color */
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
```

---

## Theme Colors

| Theme | Border | Label text |
|---|---|---|
| Dark | `#396a3d` (forest[4]) | `#90d596` (forest[2]) |
| Light | `#4b9551` (forest[3]) | `#396a3d` (forest[4]) |

---

## React TSX

```tsx
import clsx from "clsx";

interface OutlineBoxProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

function OutlineBox({ title, children, className }: OutlineBoxProps) {
  return (
    <fieldset
      className={clsx(
        "border-2 border-[#396a3d] p-4",
        className
      )}
    >
      <legend className="mx-[1ch] -translate-y-[10%] leading-none">
        <span className="px-[0.4ch] text-[#90d596] text-xs tracking-[0.12em] uppercase">
          {title}
        </span>
      </legend>
      {children}
    </fieldset>
  );
}
```

---

## Usage Notes

- The `transform: translateY(-10%)` on the legend is the key to the floating effect — the native browser fieldset/legend already partially handles this, but the transform refines vertical positioning
- `padding: 0 0.4ch` on the legend span creates the visual "gap" in the border by showing the background color between the border line and the text
- Use `<fieldset>` + `<legend>` (not `<div>`) — the browser natively handles the border-intersection rendering for legend elements
- Works with any border color; always use forest green tones for Nous aesthetic
- Don't use on every section — this is a special grouping element for structured data panels, not a general card replacement
