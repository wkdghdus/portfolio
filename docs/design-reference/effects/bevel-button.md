# Effect — Bevel Button (Inset Box-Shadow)

## What it does

A pair of inset `box-shadow` values simulate a 3D beveled edge on buttons. The top edge is lightened (highlight) and the bottom edge is darkened (shadow), creating the illusion of a physical button with raised geometry. On active/press, the shadows invert — the button appears to depress into the surface.

**Source:** `PsycheFoundation/nousnet/website/frontend/src/components/Button.tsx:1` (snapshot)

---

## CSS

```css
/* Default — raised bevel */
.btn {
  box-shadow:
    inset 0  1px 0 rgba(255, 255, 255, 0.15),   /* top highlight */
    inset 0 -1px 0 rgba(0, 0, 0, 0.25);          /* bottom shadow */
}

/* Active / pressed — depressed bevel */
.btn:active,
.btn[data-pressed="true"] {
  box-shadow:
    inset 0 -1px 0 rgba(255, 255, 255, 0.15),   /* flip: bottom highlight */
    inset 0  1px 0 rgba(0, 0, 0, 0.25);          /* flip: top shadow */
}
```

---

## Tailwind v4

```tsx
// Default raised
"shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.25)]"

// Active pressed
"active:shadow-[inset_0_-1px_0_rgba(255,255,255,0.15),inset_0_1px_0_rgba(0,0,0,0.25)]"

// Full button class string (gold primary)
className="
  inline-flex items-center justify-center
  px-5 py-2.5
  bg-[--accent] text-[--background]
  font-display text-sm tracking-[0.1em] uppercase
  shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.25)]
  active:shadow-[inset_0_-1px_0_rgba(255,255,255,0.15),inset_0_1px_0_rgba(0,0,0,0.25)]
  transition-shadow duration-100
  cursor-pointer disabled:opacity-50 disabled:pointer-events-none
"
```

---

## Variants

### Primary (gold)
```css
background: var(--accent);           /* #ffbd38 */
color: var(--background);            /* #041c1c — dark text on gold */
box-shadow: inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.25);
```

### Secondary (surface)
```css
background: var(--surface);
color: var(--midground);
border: 1px solid var(--border);
box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.2);
```

### Action (bordered)
```css
background: transparent;
color: var(--midground);
border: 1px solid var(--border);
/* No bevel — action variant is flat */
```

---

## Usage Notes

- Bevel works best on filled (primary, secondary) variants — skip it on ghost/action variants
- The bevel is subtle at 1px — increasing to 2px makes it look chunky and non-Nous
- Pair with `transition-shadow duration-100` for a fast, snappy press feel (not 200ms — too slow)
- On dark backgrounds, the top `rgba(255,255,255,0.15)` highlight is the visible line; the bottom shadow is the depth
- Required companion classes: `uppercase tracking-[0.1em]` — without these the bevel loses context

---

## Preview HTML

```html
<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #041c1c; }
  button {
    border: 0;
    padding: 12px 18px;
    background: #ffbd38;
    color: #041c1c;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.25);
  }
  button:active {
    box-shadow: inset 0 -1px 0 rgba(255,255,255,0.15), inset 0 1px 0 rgba(0,0,0,0.25);
  }
</style>
</head>
<body><button>Press Me</button></body>
</html>
```
