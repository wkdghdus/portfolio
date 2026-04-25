# components/

Shared React components. Every visual change must consult `docs/design-reference/CLAUDE.md`.

| File | Role | Design reference |
|---|---|---|
| `ProjectCard.tsx` | Home grid card | `components/card.md`, `components/tag.md`, `effects/glow-shadow.md` |
| `ProjectHeader.tsx` | Project detail page header | `components/badge.md`, `tokens/typography.md` |

## Rules

- Tailwind only. No `style={...}` props.
- PascalCase filenames.
- Props must be fully typed — no `any`.
