# Interaction — Hover Opacity Reveal

## What it does
Inactive elements render at 60% opacity and snap to full opacity on hover. Creates a sense of depth and hierarchy — the active/hovered element steps forward while inactive elements recede.

**Source:** `NousResearch/hermes-agent/web/src/App.tsx:1` (snapshot navigation pattern)

---

## Classes

```tsx
"opacity-60 hover:opacity-100 transition-opacity duration-200"
```

---

## Variants

| Variant | Classes | Use case |
|---|---|---|
| Standard | `opacity-60 hover:opacity-100` | Nav items, secondary actions |
| Subtle | `opacity-70 hover:opacity-100` | Less aggressive dimming |
| Strong | `opacity-40 hover:opacity-100` | Deeply inactive items |
| Disabled | `opacity-30` (no hover) | Non-interactive disabled state |

---

## Full Example

```tsx
// Navigation item
<Link
  href={href}
  className={cn(
    "flex items-center gap-2",
    isActive
      ? "opacity-100"
      : "opacity-60 hover:opacity-100 transition-opacity duration-200"
  )}
>
  <Icon className="h-3.5 w-3.5 shrink-0" />
  <span>{label}</span>
</Link>
```

---

## When to Use

- Navigation items (active item = full, inactive = 60%)
- Secondary action buttons that shouldn't compete with the primary CTA
- Metadata text that should defer to primary content
- Icon-only controls where hover needs to signal interactivity

## When NOT to Use

- Primary CTAs — these should always be full opacity
- Body text — never dim reading content
- Error / warning states — these need full visibility regardless of hover
- Any element that must be noticed immediately (alerts, notifications)

---

## Pairing with Background Reveal

Combine with a subtle background hover for richer feedback:

```tsx
<div className="group relative opacity-60 hover:opacity-100 transition-opacity duration-200">
  {/* Background reveals on hover */}
  <div className="absolute inset-0 bg-[--midground] opacity-0 group-hover:opacity-5 transition-opacity duration-200" />
  {/* Content */}
  <span className="relative z-10">Label</span>
</div>
```
