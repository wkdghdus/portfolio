# Component — Progress Bar (Chunked Segments)

## Purpose
A progress indicator rendered as discrete chunks (segments with gaps) rather than a continuous fill. The chunked aesthetic reads as digital/technical — like a loading indicator on a terminal or scientific instrument.

**Source:** `PsycheFoundation/nousnet/website/frontend/src/components/ProgressBar.tsx:1` (snapshot)

---

## Visual Pattern

```
[███ ███ ███ ███ ███ ███ ██      ]  60%
 ↑chunk↑ ↑gap↑
```

---

## CSS Implementation

```css
.progress-track {
  width: 100%;
  height: 16px;
  border: 1px solid rgba(57, 106, 61, 0.5);   /* forest[4] 50% opacity */
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  width: var(--progress, 0%);
  background-image: repeating-linear-gradient(
    90deg,
    #396a3d 0px,
    #396a3d 8px,           /* chunk width */
    transparent 8px,
    transparent 12px       /* chunk width + gap width */
  );
  background-size: 12px 100%;                  /* = chunk + gap */
}
```

---

## Tailwind / React TSX

```tsx
import clsx from "clsx";

interface ProgressBarProps {
  ratio: number;           // 0–1
  variant?: "normal" | "big" | "disabled";
  size?: "sm" | "md";
}

function ProgressBar({ ratio, variant = "normal", size = "md" }: ProgressBarProps) {
  const clampedRatio = Math.min(Math.max(ratio, 0), 1);

  const activeColor = {
    normal:   "#396a3d",   /* forest[4] */
    big:      "#90f53d",   /* lime[2] — prominent runs */
    disabled: "#b9beb6",   /* slate[4] */
  }[variant];

  const chunkWidth = 8;
  const chunkSpacing = 4;
  const cellWidth = chunkWidth + chunkSpacing;
  const activeGradient = `repeating-linear-gradient(
    90deg,
    ${activeColor} 0px,
    ${activeColor} ${chunkWidth}px,
    transparent ${chunkWidth}px,
    transparent ${cellWidth}px
  )`;

  return (
    <div
      className={clsx(
        "w-full overflow-hidden",
        size === "sm" ? "h-3 border" : "h-4 border-2",
        variant === "disabled"
          ? "border-[--border-subtle]"
          : "border-[#396a3d]/50"
      )}
    >
      <div
        className="h-full"
        style={
          {
            "--progress": `${clampedRatio * 100}%`,
            "--chunk-bg": activeGradient,
            "--chunk-size": `${cellWidth}px 100%`,
            width: "var(--progress)",
            backgroundImage: "var(--chunk-bg)",
            backgroundSize: "var(--chunk-size)",
          } as React.CSSProperties
        }
      />
    </div>
  );
}
```

---

## Color Variants

| Variant | Color | Use case |
|---|---|---|
| `normal` | `#396a3d` (forest[4]) | Standard progress |
| `big` | `#90f53d` (lime[2]) | Featured / prominent progress |
| `disabled` | `#b9beb6` (slate[4]) | Inactive / paused state |

---

## Parameters

| Parameter | Default | Effect |
|---|---|---|
| `chunkWidth` | `8px` | Width of each filled segment |
| `chunkSpacing` | `4px` | Gap between segments |
| `height` | `16px` (md) / `12px` (sm) | Track height |
| `border-width` | `2px` (md) / `1px` (sm) | Track border |

---

## Usage Notes

- `ratio` should be 0–1; clamp before passing to avoid overflow
- Don't animate the chunked fill with `transition: width` — the chunk pattern creates visual "stutter" on width transitions; prefer discrete steps or no animation
- The border opacity (0.5) creates a softer frame than a solid border
- For determinate progress: use the `ratio` prop  
- For indeterminate loading: consider a CSS `@keyframes` that animates `background-position` instead of width
