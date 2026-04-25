# Interaction — Pulse Animation (Active Status)

## What it does
A 2-second looping scale + opacity keyframe animation applied to the status dot of an "active" item. The dot expands to 2× its size while fading to transparent, then snaps back — creating a heartbeat or sonar-ping effect that communicates live activity.

**Source:** `PsycheFoundation/nousnet/website/frontend/src/components/StatusChip.tsx:1` (snapshot)

---

## CSS

```css
@keyframes status-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(2);
    opacity: 0;
  }
}

.dot-active {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: #4ade80;  /* success green */
  animation: status-pulse 2s ease-in-out infinite;
}
```

---

## Tailwind v4

Add keyframe to `globals.css`:
```css
@keyframes status-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(2); opacity: 0; }
}
```

Apply with arbitrary animation:
```tsx
<span className="
  w-[1em] h-[1em] rounded-full flex-shrink-0
  bg-[#4ade80]
  animate-[status-pulse_2s_ease-in-out_infinite]
" />
```

Or define in `@theme` for a named utility:
```css
@theme {
  --animate-pulse-status: status-pulse 2s ease-in-out infinite;
}
/* Use as: animate-[--animate-pulse-status] */
```

---

## Timing Variants

| Duration | Feel |
|---|---|
| `1s` | Fast / urgent |
| `2s` | Standard — calm activity indicator |
| `3s` | Slow / ambient |

---

## Usage Notes

- **Only apply to the active/live status** — animating paused or completed dots is confusing
- The dot container should have `overflow: visible` or enough surrounding space for the 2× scale expansion
- Pair with a static label so the animation doesn't obscure meaning (e.g., "Active" text next to the dot)
- For reduced motion: wrap in `@media (prefers-reduced-motion: no-preference)` or use `motion-safe:animate-[...]`

```tsx
<span className="
  w-[1em] h-[1em] rounded-full
  bg-[#4ade80]
  motion-safe:animate-[status-pulse_2s_ease-in-out_infinite]
" />
```
