<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code.
<!-- END:nextjs-agent-rules -->

# Portfolio

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server at http://localhost:3000 |
| `npm run build` | Production build; zero exit, no TypeScript errors |

## Directory map

| Path | Role | Guide |
|---|---|---|
| `app/` | Next.js App Router routes and global styles | `app/AGENTS.md` |
| `components/` | Shared React components | `components/AGENTS.md` |
| `lib/` | Data-loading utilities | `lib/AGENTS.md` |
| `types/` | TypeScript types | `types/AGENTS.md` |
| `projects/` | Authored content (one folder per project) | `projects/AGENTS.md` |
| `docs/design-reference/` | Nous design system reference | `docs/design-reference/AGENTS.md` |
| `public/projects` | Symlink → `../projects` — do not remove | |

## Ground rules

- **TypeScript**: `strict: true`. No `any`. Read `types/project.ts` first — it defines the shape every module uses.
- **Styling**: Tailwind only. No `style={...}` props, no CSS modules.
- **Imports**: `@/*` alias.
- **Filenames**: PascalCase for components, kebab-case for everything else.
- **Test command**: `npm run build`.
- **Preferred edit format**: unified diff.

## Nous design — five non-negotiable rules

Before any UI or styling change, read `docs/design-reference/NORTH_STAR.md`. In brief:

1. Background always `#041c1c` — never neutral gray, never pure black.
2. Body text `#ffe6cb` (warm cream); pure white only for max-contrast headings.
3. Gold (`#ffbd38`) is the only accent — no blue, purple, or green interactive states.
4. All display type uppercase, `letter-spacing ≥ 0.1em`.
5. Every surface has noise grain; feature surfaces add dot-grid.
