# Effect — Shadow Card (Layered translateZ)

## What it does

A card that appears to float above the surface by rendering a colored shadow as a separate absolutely-positioned element behind the card. Unlike CSS `box-shadow`, this creates a solid-colored, offset shadow that matches the forest green palette — giving a physical, printed-matter quality. On hover, the inner dark shadow layer hides, making the card appear to lift higher.

**Source:** `PsycheFoundation/nousnet/website/frontend/src/components/ShadowCard.tsx:1` (snapshot)

---

## Structure

```
<div class="shadow-container">          ← relative positioned wrapper
  <div class="shadow-layer">            ← absolute, behind card, 8px offset
    <div class="shadow-inner-layer">    ← absolute, 2px offset, hidden on hover
    </div>
  </div>
  <div class="card-content">            ← the actual card
    <!-- content -->
  </div>
</div>
```

---

## CSS

```css
.shadow-container {
  position: relative;
  transform-style: preserve-3d;
  display: block;
  text-decoration: none;
  color: inherit;
}

/* Main shadow — forest green offset */
.shadow-layer {
  position: absolute;
  top: 8px;
  left: 8px;
  right: -8px;
  bottom: -8px;
  background: #2a462d;    /* forest[5] — dark theme */
  transform: translateZ(-10px);
  z-index: -1;
}

/* Inner dark shadow — creates depth within the shadow */
.shadow-inner-layer {
  position: absolute;
  top: 2px;
  left: 2px;
  right: 0;
  bottom: 0;
  background: #1f3320;    /* forest[6] */
}

/* On hover — inner layer hides, card appears to lift */
.shadow-container:hover .shadow-inner-layer {
  display: none;
}

.card-content {
  position: relative;
  z-index: 1;
}
```

---

## Tailwind v4 / React TSX

```tsx
function ShadowCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative [transform-style:preserve-3d] group">
      {/* Shadow layer */}
      <div className="
        absolute top-2 left-2 -right-2 -bottom-2
        bg-[#2a462d]
        [transform:translateZ(-10px)]
        -z-10
      ">
        {/* Inner dark layer — hidden on group hover */}
        <div className="
          absolute top-0.5 left-0.5 right-0 bottom-0
          bg-[#1f3320]
          group-hover:hidden
        " />
      </div>
      {/* Card content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
```

---

## Color Variants

| Theme | Shadow main | Shadow inner |
|---|---|---|
| Dark | `#2a462d` (forest[5]) | `#1f3320` (forest[6]) |
| Light | `#396a3d` (forest[4]) | `#2a462d` (forest[5]) |
| Gold accent variant | `#c49212` (gold[4]) | `#956f0e` (gold[5]) |

---

## Usage Notes

- `transform-style: preserve-3d` on the parent is required for `translateZ` to work
- The `-z-10` class on the shadow layer requires the card content to have a higher stacking context
- This effect reads as physical and premium — use on featured project cards, not every card in a grid
- The hover state (inner layer hiding) gives a satisfying "lift" without JavaScript
- Simpler alternative: just `box-shadow: 8px 8px 0 #1f3320` for a flat 2D offset shadow

---

## Preview HTML

```html
<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #041c1c; }
  .wrap { position: relative; transform-style: preserve-3d; }
  .shadow { position: absolute; inset: 8px -8px -8px 8px; background: #2a462d; transform: translateZ(-10px); z-index: -1; }
  .shadow::after { content: ""; position: absolute; inset: 2px 0 0 2px; background: #1f3320; }
  .card { position: relative; padding: 24px; background: #0f2420; color: #ffe6cb; border: 1px solid rgba(255,230,203,0.15); }
</style>
</head>
<body><div class="wrap"><div class="shadow"></div><div class="card">Shadow card</div></div></body>
</html>
```
