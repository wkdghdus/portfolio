# Component — Card

## Purpose
Container for project listings, data panels, and content sections. Defined by a thin border, subtle dark surface, and CSS custom property hooks that let themes restyle every card from a single location.

**Source:** `NousResearch/hermes-agent/web/src/components/ui/card.tsx:1`

---

## CSS Variable Hooks

The hermes-agent card uses component-level CSS variables as override slots. Setting any of these on a parent element reskins all cards inside it without touching component code:

```css
/* Override at theme or page level */
.my-section {
  --component-card-clip-path:    polygon(0 0, 100% 0, 100% 100%, 0 100%);
  --component-card-border-image: none;
  --component-card-background:   rgba(255,255,255,0.05);
  --component-card-box-shadow:   0 4px 24px rgba(0,0,0,0.4);
}
```

---

## Sub-Components

| Component | Classes | Notes |
|---|---|---|
| `Card` (root) | `border border-[--border] bg-[--surface]/80 w-full` | + inline style vars |
| `CardHeader` | `flex flex-col gap-1.5 p-4 border-b border-[--border]` | Bottom border divides header |
| `CardTitle` | `font-display text-sm font-bold tracking-[0.08em] uppercase blend-lighter` | `blend-lighter` = mix-blend-mode: plus-lighter |
| `CardDescription` | `font-mono text-xs text-[--muted]` | Secondary text |
| `CardContent` | `p-4` | Standard inner padding |

---

## Full TSX

```tsx
import { cn } from "@/lib/utils";

function Card({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "border border-[--border] bg-[--surface]/80 text-[--midground] w-full",
        className
      )}
      style={{
        clipPath:    "var(--component-card-clip-path)",
        borderImage: "var(--component-card-border-image)",
        background:  "var(--component-card-background, var(--surface))",
        boxShadow:   "var(--component-card-box-shadow)",
        ...style,
      }}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 p-4 border-b border-[--border]", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "font-display text-sm font-bold tracking-[0.08em] uppercase",
        "[mix-blend-mode:plus-lighter]",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("font-mono text-xs text-[--muted]", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4", className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
```

---

## Hover Pattern (from portfolio ProjectCard)

```tsx
<article className="
  group border border-[--border]
  bg-[--surface]
  hover:border-[--accent]
  hover:shadow-[0_0_16px_var(--accent-glow)]
  transition-all duration-200
  overflow-hidden
">
```

---

## Do / Don't

**Do:** Use `--component-card-*` CSS vars for section-level theming — it's the intended override path  
**Don't:** Add `rounded-xl` or `rounded-2xl` — cards should be sharp-cornered or `rounded-sm` at most  
**Don't:** Use `bg-white` or `bg-gray-900` — always use `--surface` so the token system stays consistent
