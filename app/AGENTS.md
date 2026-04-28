# app/

Next.js App Router. Entry point for all routes and global styles.

## Structure

| File | Role |
|---|---|
| `layout.tsx` | Root layout — fonts, metadata, body wrapper |
| `page.tsx` | Home page — project grid |
| `globals.css` | Tailwind v4 entry + all CSS custom properties |
| `icon.svg` | Site favicon — gold "LJ" monogram on `--background`. Next.js auto-detects this file and emits the `<link rel="icon">` tag. |
| `projects/[slug]/page.tsx` | Per-project detail page (statically generated) |

## Rules

- `globals.css` is the single source for CSS custom properties. Do not define tokens elsewhere.
- `layout.tsx` loads Bebas Neue (`--font-big-shoulders`). Check `docs/design-reference/tokens/typography.md` before adding fonts.
- `projects/[slug]/page.tsx` calls `getAllProjects` and `getProjectBySlug` from `@/lib/projects`. Do not change those call signatures.
- Any style change to `globals.css` must consult `docs/design-reference/AGENTS.md`.
