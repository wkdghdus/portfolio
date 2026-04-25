# Component — Badge

## Purpose
Inline label for categories, status indicators, and metadata tags. Always uppercase, always compressed/tight, always small.

**Source:** `NousResearch/hermes-agent/web/src/components/ui/badge.tsx:1`

---

## Key Classes

```
inline-flex items-center border
px-2 py-0.5
font-compressed text-[0.65rem] tracking-[0.15em] uppercase
transition-colors
```

---

## Variants

| Variant | Border | Background | Text |
|---|---|---|---|
| `default` | `border-[--border]` | `bg-[--foreground]/10` | `text-[--midground]` |
| `secondary` | `border-[--border-subtle]` | `bg-[--surface]` | `text-[--midground]` |
| `destructive` | `border-[--destructive]/30` | `bg-[--destructive]/15` | `text-[--destructive]` |
| `success` | `border-[--success]/30` | `bg-[--success]/15 grain` | `text-[--success]` |
| `warning` | `border-[--accent]/30` | `bg-[--accent]/15` | `text-[--accent]` |
| `outline` | `border-[--border]` | `bg-transparent` | `text-[--muted]` |

Note: `success` variant uses the `.grain` utility class (see `effects/noise-grain.md`) for added texture.

---

## Full TSX Implementation

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-2 py-0.5 font-mono text-[0.65rem] tracking-[0.15em] uppercase transition-colors",
  {
    variants: {
      variant: {
        default:     "border-[--border] bg-[--foreground]/10 text-[--midground]",
        secondary:   "border-[--border-subtle] bg-[--surface] text-[--midground]",
        destructive: "border-red-500/30 bg-red-500/15 text-red-400",
        success:     "border-emerald-500/30 bg-emerald-500/15 text-emerald-400",
        warning:     "border-[--accent]/30 bg-[--accent]/15 text-[--accent]",
        outline:     "border-[--border] bg-transparent text-[--muted]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
```

---

## Portfolio Tag (simplified — no CVA needed)

The portfolio's current tag uses forest-surface background + gold text — a specific aesthetic variant:

```tsx
<span className="
  bg-[--forest-surface] border border-[--forest-border]
  text-[--accent] text-xs font-mono
  uppercase tracking-[0.08em]
  px-2 py-0.5
">
  {tag}
</span>
```

---

## Do / Don't

**Do:** `<Badge variant="warning">Research</Badge>` — concise, uppercase by CSS  
**Don't:** Add `font-size` larger than `text-sm` — badges are always smaller than body text  
**Don't:** Use mixed-case text — the component enforces `uppercase` but content should also be lowercase to avoid double-capitalization artifacts
