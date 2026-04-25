# Component — Button

## Purpose
Primary call-to-action and navigation action element. Always uppercase, always condensed font, always with a physical bevel on filled variants.

**Source:** `PsycheFoundation/nousnet/website/frontend/src/components/Button.tsx:1` · `NousResearch/hermes-agent/web/src/components/ui/button.tsx:1`

---

## Key Classes (hermes-agent)

```
inline-flex items-center justify-center gap-2 whitespace-nowrap
font-mondwest text-xs tracking-[0.1em] uppercase
transition-colors cursor-pointer
disabled:pointer-events-none disabled:opacity-50
```

---

## Variants

### hermes-agent variants (6)

| Variant | Background | Text | Border | Notes |
|---|---|---|---|---|
| `default` | `bg-[--midground]` | `text-[--background]` | none | Cream bg, dark text |
| `destructive` | `bg-[--destructive]/90` | `text-white` | none | Red |
| `outline` | `bg-transparent` | `text-[--midground]` | `border border-[--border]` | Hover: bg-[--midground]/10 |
| `secondary` | `bg-[--secondary]` | `text-[--secondary-foreground]` | none | Subtle fill |
| `ghost` | `bg-transparent` | `text-[--midground]` | none | Hover: bg-[--midground]/10 |
| `link` | `bg-transparent` | `text-[--midground]` | none | Underline on hover |

### nousnet variants (4) — with bevel

| Variant | Background | Text | Bevel |
|---|---|---|---|
| `primary` | `#ecae13` (gold) | `#fcfdfc` (slate) | Yes — inset box-shadow |
| `secondary` | `forest[5]` dark / `slate[2]` light | theme-aware | Yes |
| `theme` | matches current theme bg | theme-aware fg | Subtle |
| `action` | `transparent` | theme-aware | No — border only |

---

## Full TSX (hermes-agent style, Tailwind v4)

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  `inline-flex items-center justify-center gap-2 whitespace-nowrap
   font-display text-xs tracking-[0.1em] uppercase
   transition-colors cursor-pointer
   disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        primary:   "bg-[--accent] text-[--background] hover:bg-[--accent]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.25)] active:shadow-[inset_0_-1px_0_rgba(255,255,255,0.15),inset_0_1px_0_rgba(0,0,0,0.25)]",
        secondary: "bg-[--surface] text-[--midground] border border-[--border] hover:border-[--accent]",
        outline:   "bg-transparent text-[--midground] border border-[--border] hover:bg-[--midground]/10",
        ghost:     "bg-transparent text-[--midground] hover:bg-[--midground]/10",
      },
      size: {
        default: "h-9 px-5 py-2.5",
        sm:      "h-8 px-3 text-[0.7rem]",
        lg:      "h-10 px-6",
        icon:    "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
```

---

## Bevel CSS Reference

See `effects/bevel-button.md` for full bevel box-shadow values.

```css
/* Default raised */
box-shadow: inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.25);
/* Active pressed */
box-shadow: inset 0 -1px 0 rgba(255,255,255,0.15), inset 0 1px 0 rgba(0,0,0,0.25);
```

---

## Do / Don't

**Do:** Always pair with `uppercase tracking-[0.1em]` — bevel without typography is just a shadow  
**Don't:** Use `rounded-lg` — Nous buttons have sharp corners (`rounded-none`) or very subtle rounding  
**Don't:** Use blue/green for primary buttons — gold (`--accent`) is the only primary CTA color
