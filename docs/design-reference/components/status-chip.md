# Component — Status Chip

## Purpose
A small inline indicator combining a colored dot (with optional pulse animation) and a text label to communicate system or process state. Used in nousnet to show run status: active, funding, completed, paused, waiting.

**Source:** `PsycheFoundation/nousnet/website/frontend/src/components/StatusChip.tsx:1` (snapshot)

---

## Status Types & Colors

| Status | Color | Hex | Animation |
|---|---|---|---|
| `active` | success green | `#4ade80` (success[~]) | Pulse (2s infinite) |
| `funding` | lime | `#90f53d` (lime[2]) | None |
| `completed` | forest | `#396a3d` (forest[4]) | None |
| `paused` | slate | `#b9beb6` (slate[4]) | None |
| `waitingForMembers` | gold | `#f6c955` (gold[2]) | None |

---

## Pulse Keyframe (active status only)

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
  animation: status-pulse 2s ease-in-out infinite;
}
```

---

## React TSX

```tsx
import clsx from "clsx";

type StatusType = "active" | "funding" | "completed" | "paused" | "waitingForMembers";

const STATUS_CONFIG: Record<StatusType, { color: string; label: string; pulse: boolean }> = {
  active:            { color: "#4ade80", label: "Active",    pulse: true  },
  funding:           { color: "#90f53d", label: "Funding",   pulse: false },
  completed:         { color: "#396a3d", label: "Completed", pulse: false },
  paused:            { color: "#b9beb6", label: "Paused",    pulse: false },
  waitingForMembers: { color: "#f6c955", label: "Waiting",   pulse: false },
};

interface StatusChipProps {
  status: StatusType;
  style?: "bold" | "minimal";
  inverted?: boolean;
  children?: React.ReactNode;
}

function StatusChip({
  status,
  style = "minimal",
  inverted = false,
  children,
}: StatusChipProps) {
  const config = STATUS_CONFIG[status];
  const label = children ?? config.label;

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 uppercase text-[0.65rem] tracking-[0.12em]",
        style === "bold" && "px-2 py-0.5 border",
        inverted
          ? "bg-[currentColor] text-[--background]"
          : "text-[currentColor]"
      )}
      style={{ color: config.color }}
    >
      <span
        className={clsx(
          "w-[1em] h-[1em] rounded-full flex-shrink-0",
          config.pulse && "animate-[status-pulse_2s_ease-in-out_infinite]"
        )}
        style={{ backgroundColor: config.color }}
      />
      {label}
    </span>
  );
}
```

---

## Tailwind Config for Pulse Animation

Add to `tailwind.config.ts` or `globals.css`:

```css
@keyframes status-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(2); opacity: 0; }
}
```

Or in Tailwind v4 `@theme` block:
```css
@theme {
  --animate-status-pulse: status-pulse 2s ease-in-out infinite;
}
```

---

## Variants

| `style` | `inverted` | Appearance |
|---|---|---|
| `minimal` | `false` | Dot + label, no background |
| `bold` | `false` | Dot + label + colored border |
| `minimal` | `true` | Dot + label with color-as-bg |
| `bold` | `true` | Full inverted color chip |

---

## Usage Notes

- Only `active` gets the pulse — other statuses are static to avoid visual noise
- The dot size `1em` scales with font size — at `text-[0.65rem]` it renders as ~10px
- Use `inverted` for high-emphasis status contexts (e.g., a large hero status banner)
- The pulse uses `scale(2)` at peak — keep the dot container `overflow: hidden` or give parent enough space to avoid layout shift
