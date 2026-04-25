# Interaction — Slide Transition (Mobile Sidebar)

## What it does
On mobile, the sidebar slides in from the left using a `translateX` CSS transition. It sits off-screen at `-translate-x-full` when closed and moves to `translate-x-0` when open. A semi-transparent overlay covers the content area simultaneously.

**Source:** `NousResearch/hermes-agent/web/src/App.tsx:1` (snapshot)

---

## CSS / Tailwind

```tsx
// Sidebar element
<aside
  className={cn(
    "fixed top-0 left-0 w-64 h-dvh z-50",
    "bg-[--background] border-r border-current/20",
    "transition-transform duration-200 ease-out",
    // State-driven:
    isOpen ? "translate-x-0" : "-translate-x-full",
    // On lg: always visible, sticky
    "lg:sticky lg:translate-x-0"
  )}
>

// Overlay
{isOpen && (
  <div
    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
    onClick={() => setIsOpen(false)}
  />
)}
```

---

## Timing

```
transition-transform duration-200 ease-out
```

- `duration-200` (200ms) — fast enough to feel responsive, slow enough to track visually
- `ease-out` — starts fast, decelerates to rest — feels natural for a panel sliding in from the edge

---

## State Management

```tsx
const [isOpen, setIsOpen] = useState(false);

// Close on route change
useEffect(() => {
  setIsOpen(false);
}, [pathname]);

// Close on overlay click (already in JSX above)
// Close on Escape key
useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.key === "Escape") setIsOpen(false);
  };
  document.addEventListener("keydown", handler);
  return () => document.removeEventListener("keydown", handler);
}, []);
```

---

## Overlay

```tsx
// Always render overlay when sidebar open (mobile only)
<div
  className={cn(
    "fixed inset-0 z-40 lg:hidden",
    "bg-black/50",
    "transition-opacity duration-200",
    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
  )}
  onClick={() => setIsOpen(false)}
/>
```

Rendering the overlay with `opacity-0 pointer-events-none` (rather than conditional rendering) allows it to fade in/out smoothly rather than appearing instantly.

---

## When to Use

- Mobile navigation drawer (primary use case)
- Side panels / detail drawers on any screen
- Filter/sort panels that overlay content on mobile

## When NOT to Use

- Desktop navigation — use the sticky sidebar pattern instead
- Modal dialogs — use `dialog-in` animation (scale + fade) instead
- Tooltips and popovers — use opacity-only transitions
