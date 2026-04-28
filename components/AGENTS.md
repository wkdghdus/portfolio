# components/

Shared React components. Every visual change must consult `docs/design-reference/AGENTS.md`.

| File | Role | Design reference |
|---|---|---|
| `ProjectCard.tsx` | Home grid card | `components/card.md`, `components/tag.md`, `effects/glow-shadow.md` |
| `ProjectHeader.tsx` | Project detail page header | `components/badge.md`, `tokens/typography.md` |
| `GalleryToggle.tsx` | Segmented Description ↔ Gallery toggle on detail pages. Server component; navigates via `?view=gallery` query param. | `tokens/typography.md`, `components/badge.md` |
| `Gallery.tsx` | Client component. Renders the asset grid (images + PDF cards) and owns the lightbox modal. | `tokens/colors.md`, `effects/noise-grain.md` |
| `DetailContentSwitcher.tsx` | Client wrapper. Reads `?view=` via `useSearchParams` and toggles between the article body and `<Gallery>`. Wrap in `<Suspense>` so the parent route stays statically generated. | — |

## Rules

- Tailwind only. No `style={...}` props.
- PascalCase filenames.
- Props must be fully typed — no `any`.
