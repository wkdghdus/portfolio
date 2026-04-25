# Layout — Navigation

## Purpose
Sidebar or top navigation with uppercase condensed labels, consistent icon sizing, and an opacity-reveal interaction for inactive items.

**Source:** `NousResearch/hermes-agent/web/src/App.tsx:1` (snapshot)

---

## Typography

```tsx
// Nav item label
"font-display text-[0.8rem] tracking-[0.12em] uppercase"

// Brand / logo
"font-display font-bold text-[1.125rem] tracking-[0.0525rem]"

// Section divider label (muted)
"text-[0.6rem] tracking-[0.15em] uppercase text-[--muted]"
```

---

## Icon Sizing

```tsx
// Always 14px, always shrink-0
"h-3.5 w-3.5 shrink-0"
```

Never resize nav icons. Consistent 14px across all nav items creates visual rhythm.

---

## Active / Inactive States

```tsx
// Active item — full opacity
"text-[--midground]"

// Inactive item — dimmed, reveals on hover
"opacity-60 hover:opacity-100 transition-opacity duration-200"

// With background reveal on hover
"group relative"
// + child:
"absolute inset-0 bg-[--midground] opacity-0 group-hover:opacity-5 transition-opacity duration-200"
```

---

## Full Nav Item

```tsx
<Link
  href={href}
  className={cn(
    "flex items-center gap-2 px-3 py-2 relative group",
    "font-display text-[0.8rem] tracking-[0.12em] uppercase",
    "transition-opacity duration-200",
    isActive ? "text-[--midground]" : "opacity-60 hover:opacity-100"
  )}
>
  {/* Hover background reveal */}
  <span className="absolute inset-0 bg-[--midground] opacity-0 group-hover:opacity-5 transition-opacity duration-200" />

  {/* Icon */}
  <Icon className="h-3.5 w-3.5 shrink-0 relative z-10" />

  {/* Label */}
  <span className="relative z-10">{label}</span>
</Link>
```

---

## Nav Section Grouping

```tsx
<nav className="flex flex-col gap-6 px-3 py-4">

  {/* Section group */}
  <div className="flex flex-col gap-1">
    {/* Section header */}
    <div className="px-3 py-1 text-[0.6rem] tracking-[0.15em] uppercase text-[--muted]">
      Projects
    </div>

    {/* Items */}
    {items.map(item => <NavItem key={item.href} {...item} />)}
  </div>

  {/* Another group */}
  <div className="flex flex-col gap-1">
    {/* ... */}
  </div>

</nav>
```

---

## Sidebar Border

```tsx
// Right border on sidebar
"border-r border-current/20"
```

`border-current/20` creates a 20% opacity border using the current text color. On dark backgrounds this renders as a very subtle line that separates the sidebar without using a hardcoded color.

---

## Mobile Hamburger Pattern

```tsx
<button
  className="p-2 opacity-60 hover:opacity-100 transition-opacity"
  onClick={() => setSidebarOpen(true)}
  aria-label="Open navigation"
>
  <MenuIcon className="h-5 w-5" />
</button>
```

Uses the same opacity-reveal pattern as nav items for visual consistency.
