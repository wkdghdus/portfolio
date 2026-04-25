# Portfolio

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server at http://localhost:3000 |
| `npm run build` | Production build; fails on TypeScript errors |
| `npm run lint` | ESLint (only if config is present) |

## Directory map

| Path | Role | Guide |
|---|---|---|
| `app/` | Next.js App Router routes and global styles | `app/CLAUDE.md` |
| `components/` | Shared React components | `components/CLAUDE.md` |
| `lib/` | Data-loading utilities | `lib/CLAUDE.md` |
| `types/` | TypeScript types | `types/CLAUDE.md` |
| `projects/` | Authored content (one folder per project) | `projects/CLAUDE.md` |
| `docs/design-reference/` | Nous design system reference | `docs/design-reference/CLAUDE.md` |
| `public/projects` | Symlink → `../projects` — do not remove | |

## Ground rules

- **TypeScript**: `strict: true`. No `any`.
- **Styling**: Tailwind only. No `style={...}` props, no CSS modules, no styled-components.
- **Imports**: `@/*` alias for all absolute imports.
- **Filenames**: PascalCase for components, kebab-case for everything else.
- **Design**: Before any UI or styling change, read `docs/design-reference/NORTH_STAR.md`.
