<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Portfolio

A file-system driven Next.js portfolio. Each project lives in its own folder under `projects/`, owns its assets, and is rendered automatically — no CMS, no database, no build step beyond `next build`. Add a folder, get a page.

## Directory map

```
.
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home (project grid)
│   ├── globals.css             # Tailwind v4 entry + typography plugin
│   └── projects/
│       └── [slug]/
│           └── page.tsx        # Per-project page (statically generated)
├── components/
│   ├── ProjectCard.tsx         # Home grid card
│   └── ProjectHeader.tsx       # Detail-page header
├── lib/
│   └── projects.ts             # Markdown loader (gray-matter + remark)
├── types/
│   └── project.ts              # Project & ProjectFrontmatter types
├── projects/                   # Authored content (one folder per project)
│   └── sample-project/
│       ├── project-description.md
│       └── assets/
│           └── preview.jpg
├── public/
│   └── projects -> ../projects # Symlink that exposes assets statically
├── next.config.ts
├── tsconfig.json               # strict: true
├── package.json
└── README.md
```

## Commands

| Command          | What it does                                      |
| ---------------- | ------------------------------------------------- |
| `npm run dev`    | Start the local dev server at http://localhost:3000 |
| `npm run build`  | Production build; fails on TypeScript errors       |
| `npm run lint`   | Run ESLint (only if eslint config is added later)  |

## How to add a project

1. Create a new folder under `projects/`, e.g. `projects/my-thing/`.
2. Inside it, add a `project-description.md` file with frontmatter (see schema below) and markdown body.
3. Drop any images, videos, or other static files into `projects/my-thing/assets/`.
4. Reference assets from frontmatter or markdown using paths relative to the project folder, e.g. `coverImage: assets/preview.jpg`. They are served at `/projects/my-thing/assets/preview.jpg` thanks to the `public/projects` symlink.
5. Run `npm run dev`. The new project shows up on the home grid and gets its own page at `/projects/my-thing`.

The folder name becomes the URL slug. Use kebab-case.

## Frontmatter schema

```yaml
---
title: string         # required — display name on cards and detail page
date: string          # required — ISO date (YYYY-MM-DD); used for sorting (newest first)
description: string   # required — short summary, shown on cards and detail page
tags: string[]        # required — list of strings; rendered as badges
coverImage: string    # optional — path relative to the project folder, e.g. assets/preview.jpg
---
```

Anything below the closing `---` is the markdown body, rendered as HTML inside a `prose` container on the detail page.

## Conventions

- **Components**: PascalCase filenames (`ProjectCard.tsx`).
- **Other files**: kebab-case (`project-description.md`).
- **TypeScript**: `strict: true`. No `any`. Use `ProjectFrontmatter` casts after `gray-matter` parses.
- **Styling**: Tailwind only. No inline `style={...}` props, no separate CSS modules, no styled-components.
- **Imports**: Use the `@/*` alias for absolute imports from the repo root.

## What NOT to touch

- The exported function signatures in `lib/projects.ts` (`getProjectSlugs`, `getProjectBySlug`, `getAllProjects`) and the types in `types/project.ts`. The home page, the dynamic route, and any future tooling depend on this contract. Add new helpers if you need them; don't change existing ones.
- The `public/projects` symlink. Removing it breaks every project image.

## For Codex

- **Preferred edit format**: unified diff.
- **Test command**: `npm run build` (zero exit code, no TypeScript errors).
- **File to read first**: `types/project.ts` — it defines the shape every other module produces or consumes.
