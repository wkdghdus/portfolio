# Portfolio Site — AI-Friendly Boilerplate Plan

**Date:** 2026-04-25  
**Stack:** Next.js (App Router) + TypeScript + Tailwind CSS  
**Goal:** Production-ready boilerplate with file-system-driven project pages, optimized for Claude Code and Codex agents.

---

## Requirements Summary

1. Next.js 14+ App Router with TypeScript throughout
2. Tailwind CSS for styling
3. File-system driven project data: `/projects/[slug]/project-description.md` + `/projects/[slug]/assets/`
4. Dynamic routing: each project folder becomes a page at `/projects/[slug]`
5. AI-agent friendly: CLAUDE.md, AGENTS.md, typed schema, documented conventions
6. No CMS, no database — pure filesystem

---

## Acceptance Criteria

- [ ] `npm run dev` starts successfully with no errors
- [ ] `npm run build` produces a static export with no TypeScript errors
- [ ] Adding a new folder under `/projects/` with a `project-description.md` automatically creates a new page at `/projects/[slug]` without any code changes
- [ ] `/projects/[slug]/assets/*.{jpg,png,gif,mp4}` are served correctly on the project page
- [ ] Home page lists all projects, sorted by `date` frontmatter field (newest first)
- [ ] CLAUDE.md is present at repo root with: project structure, commands, conventions, and how to add a project
- [ ] AGENTS.md is present at repo root mirroring CLAUDE.md for Codex compatibility
- [ ] TypeScript compiles with `strict: true` and zero `any` types in source files
- [ ] Tailwind purges unused styles in production build (`npm run build` output < 20kb CSS)
- [ ] A sample project exists under `/projects/sample-project/` demonstrating the expected format

---

## Project Structure

```
portfolio/
├── .omc/                        # OMC plans and state
├── app/                         # Next.js App Router
│   ├── layout.tsx               # Root layout (fonts, metadata)
│   ├── page.tsx                 # Home page — project list
│   └── projects/
│       └── [slug]/
│           └── page.tsx         # Dynamic project detail page
├── components/
│   ├── ProjectCard.tsx          # Card used on home page list
│   └── ProjectHeader.tsx        # Title/date/tags header on detail page
├── lib/
│   └── projects.ts              # Filesystem reader + frontmatter parser
├── projects/                    # Content — manually maintained
│   └── sample-project/
│       ├── project-description.md
│       └── assets/
│           └── preview.jpg
├── public/                      # Static assets (favicon, og-image)
├── types/
│   └── project.ts               # Project schema type definitions
├── CLAUDE.md                    # Claude Code agent instructions
├── AGENTS.md                    # Codex agent instructions (mirrors CLAUDE.md)
├── README.md                    # Human-readable setup guide
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Implementation Steps

### Step 1 — Initialize Next.js project

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --src-dir=false \
  --import-alias="@/*" \
  --no-eslint
```

Files affected: `app/`, `public/`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `package.json`

### Step 2 — Define Project type schema (`types/project.ts`)

```ts
export type Project = {
  slug: string
  title: string
  date: string           // ISO 8601: "2025-03-15"
  description: string    // short summary (< 160 chars)
  tags: string[]
  coverImage?: string    // relative path under assets/
  content: string        // parsed markdown HTML
}

export type ProjectFrontmatter = Omit<Project, 'slug' | 'content'>
```

### Step 3 — Implement filesystem reader (`lib/projects.ts`)

- Use `gray-matter` for frontmatter parsing
- Use `remark` + `remark-html` for markdown → HTML
- `getProjectSlugs()` — reads `/projects/` directory, returns folder names
- `getProjectBySlug(slug)` — reads `project-description.md`, parses frontmatter + content, resolves asset paths
- `getAllProjects()` — returns all projects sorted by `date` descending

Dependencies to install: `gray-matter`, `remark`, `remark-html`

### Step 4 — Build pages

**`app/page.tsx`** (Home)
- Calls `getAllProjects()` at build time
- Renders a grid of `<ProjectCard>` components
- Each card: title, date, description, tags, cover image (if present)

**`app/projects/[slug]/page.tsx`** (Detail)
- `generateStaticParams()` from `getProjectSlugs()`
- Calls `getProjectBySlug(slug)`
- Renders `<ProjectHeader>` + markdown content via `dangerouslySetInnerHTML`
- Images in `assets/` are served from `/projects/[slug]/assets/` via `next.config.ts` public copy or symlink

**Asset serving strategy:** Configure `next.config.ts` to treat `/projects/*/assets/` as static via a custom `publicRuntimeConfig` or copy step in `next.config.ts` `webpack` hook. Simpler alternative: symlink `projects/` into `public/projects/` and reference images as `/projects/[slug]/assets/image.jpg`.

### Step 5 — Sample project

Create `/projects/sample-project/project-description.md`:

```md
---
title: Sample Project
date: 2026-04-25
description: A demonstration project showing the expected format.
tags: [demo, nextjs]
coverImage: assets/preview.jpg
---

## Overview

This is a sample project. Replace this file with your own project description.
```

Add a placeholder image at `/projects/sample-project/assets/preview.jpg`.

### Step 6 — CLAUDE.md

Content must include:
- Project purpose (one paragraph)
- Directory map (copy from Step structure above)
- Commands: `npm run dev`, `npm run build`, `npm run lint`
- **How to add a project** (exact steps: create folder, add md file, add assets)
- Frontmatter schema (all fields, required vs optional)
- Conventions: component naming (PascalCase), file naming (kebab-case), no `any`, Tailwind only (no inline styles)
- What NOT to touch: `lib/projects.ts` interface (adding a project never requires code changes)

### Step 7 — AGENTS.md

Mirror CLAUDE.md exactly. Add Codex-specific section:
- Preferred edit format: unified diff
- Test command before submitting PR: `npm run build`
- File to read first: `types/project.ts` (source of truth for schema)

### Step 8 — README.md

- Setup: `npm install && npm run dev`
- How to add a project (same as CLAUDE.md)
- Deployment: Vercel one-click (add deploy badge)

---

## Risks and Mitigations

| Risk | Mitigation |
|------|-----------|
| Asset images not served in Next.js App Router | Symlink `/projects/` → `/public/projects/` in `next.config.ts` `webpack` or use `fs.copyFileSync` in a custom script |
| `gray-matter` / `remark` ESM/CJS conflict with Next.js | Pin `remark@14` and `remark-html@15` (CommonJS-compatible); test with `npm run build` immediately after install |
| TypeScript strict mode breaks on markdown content | Use explicit `as ProjectFrontmatter` cast after `gray-matter` parse; document this pattern in CLAUDE.md |
| AI agent adds inline styles instead of Tailwind | CLAUDE.md + AGENTS.md explicitly prohibit inline styles; Tailwind config set to `content: ['./app/**', './components/**']` |

---

## Verification Steps

1. `npm install` — zero peer dependency warnings
2. `npm run dev` — home page loads at `localhost:3000`, sample project card visible
3. Click sample project card → `/projects/sample-project` loads with content and image
4. `npm run build` — exits 0, TypeScript reports 0 errors
5. Add a second project folder manually, run `npm run build` — new page appears without code changes
6. Confirm CLAUDE.md and AGENTS.md both exist and contain all required sections
7. `grep -r "any" app/ components/ lib/ types/` — returns no results
