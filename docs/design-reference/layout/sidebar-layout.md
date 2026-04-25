# Layout — Sidebar Layout

## Purpose
Fixed-to-sticky responsive sidebar with full-viewport height management. Used in hermes-agent for the main app shell. The key property is `h-dvh` (dynamic viewport height) which handles mobile browser chrome correctly, and `min-h-0` on flex children to prevent scroll overflow.

**Source:** `NousResearch/hermes-agent/web/src/App.tsx:1` (snapshot)

---

## Structure

```
Root (h-dvh max-h-dvh min-h-0 flex flex-col overflow-hidden)
├── Mobile header (lg:hidden fixed top-0 left-0 right-0 z-40)
│   └── bg-[--background] border-b border-[--border]
│       ├── Hamburger button
│       └── Brand logo
└── Main flex wrapper (flex-1 flex min-h-0)
    ├── Sidebar (fixed lg:sticky top-0 w-64 h-dvh max-h-dvh flex-shrink-0)
    │   └── border-r border-current/20
    │       Desktop: sticky, scrolls with page
    │       Mobile:  fixed, slides in/out via translateX
    └── Content area (flex-1 min-h-0 min-w-0 flex flex-col overflow-y-auto)
        └── px-3 sm:px-6
```

---

## Full Class Reference

```tsx
// Root shell
<div className="h-dvh max-h-dvh min-h-0 flex flex-col overflow-hidden bg-[--background] uppercase text-[--midground] antialiased">

  {/* Mobile header — hidden on lg+ */}
  <header className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14 bg-[--background] border-b border-[--border]">
    <button onClick={() => setSidebarOpen(true)} className="p-2">
      {/* Hamburger icon */}
    </button>
    <span className="font-display text-[1.125rem] tracking-[0.05rem]">BRAND</span>
  </header>

  {/* Main layout */}
  <div className="flex-1 flex min-h-0">

    {/* Sidebar */}
    <aside className={cn(
      "fixed lg:sticky top-0 w-64 h-dvh max-h-dvh flex-shrink-0 flex flex-col",
      "border-r border-current/20",
      "transition-transform duration-200 ease-out",
      sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    )}>
      {/* Nav content */}
    </aside>

    {/* Mobile overlay */}
    {sidebarOpen && (
      <div
        className="fixed inset-0 z-30 bg-black/50 lg:hidden"
        onClick={() => setSidebarOpen(false)}
      />
    )}

    {/* Page content */}
    <main className="flex-1 min-h-0 min-w-0 flex flex-col overflow-y-auto px-3 sm:px-6">
      {/* Route content */}
    </main>

  </div>
</div>
```

---

## Why `h-dvh` not `h-screen`

`h-screen` = `100vh` — on mobile browsers, `100vh` includes the browser chrome (address bar, toolbar). When the chrome hides on scroll, content jumps. `h-dvh` = dynamic viewport height — updates as browser chrome shows/hides, preventing layout shift.

---

## Why `min-h-0` on flex children

Flex items have `min-height: auto` by default. On flex columns, this prevents children from shrinking below their content height — causing overflow that escapes the container. `min-h-0` overrides this, enabling proper scroll containment.

---

## Sidebar Width Variants

| Width | Class | Use case |
|---|---|---|
| Narrow | `w-48` (192px) | Icon + short labels |
| Standard | `w-64` (256px) | Canonical — hermes-agent |
| Wide | `w-72` (288px) | Rich nav with metadata |

---

## Content Padding Pattern

```tsx
// Standard content padding
"px-3 sm:px-6"

// Vertical padding — chat-style (tight top)
"pt-1 sm:pt-2 lg:pt-4 pb-3 sm:pb-4"

// Vertical padding — page-style (generous)
"pt-2 sm:pt-4 lg:pt-6 pb-4 sm:pb-8"
```
