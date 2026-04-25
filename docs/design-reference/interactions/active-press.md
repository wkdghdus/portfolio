# Interaction — Active / Press State (Bevel Inversion)

## What it does
On `:active` (mousedown / tap), filled buttons invert their bevel shadow direction — the top highlight moves to the bottom and the bottom shadow moves to the top. This simulates the button physically depressing into the surface.

**Source:** `PsycheFoundation/nousnet/website/frontend/src/components/Button.tsx:1` (snapshot)

---

## CSS

```css
/* Default — raised */
.btn {
  box-shadow:
    inset 0  1px 0 rgba(255, 255, 255, 0.15),
    inset 0 -1px 0 rgba(0, 0, 0, 0.25);
}

/* Active / pressed — depressed */
.btn:active {
  box-shadow:
    inset 0 -1px 0 rgba(255, 255, 255, 0.15),
    inset 0  1px 0 rgba(0, 0, 0, 0.25);
}
```

---

## Tailwind

```tsx
className="
  shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.25)]
  active:shadow-[inset_0_-1px_0_rgba(255,255,255,0.15),inset_0_1px_0_rgba(0,0,0,0.25)]
  transition-shadow duration-100
"
```

Use `duration-100` (not 200ms) — button press feedback should feel instant.

---

## When to Use

Only on filled button variants (`primary`, `secondary`). Skip on:
- `ghost` / `outline` / `link` variants — they have no bevel to invert
- Form inputs — the press state is not applicable
- Cards — the glow effect handles card interaction

---

## With Pressed State Prop

For toggle buttons or controlled press states:

```tsx
<button
  data-pressed={isPressed}
  className="
    shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.25)]
    data-[pressed=true]:shadow-[inset_0_-1px_0_rgba(255,255,255,0.15),inset_0_1px_0_rgba(0,0,0,0.25)]
    transition-shadow duration-100
  "
>
```
