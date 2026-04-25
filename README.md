# Portfolio

A file-system driven portfolio built with Next.js. Each project is a folder under `projects/` containing a markdown file and its assets. No CMS, no database, no build step beyond `next build`.

## Setup

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## How to add a project

1. Create a new folder under `projects/` — the folder name becomes the URL slug (use kebab-case), e.g. `projects/my-thing/`.
2. Add a `project-description.md` file inside it with the frontmatter below and your markdown body.
3. Drop images and other static files into `projects/my-thing/assets/`. Reference them from frontmatter or markdown as `assets/<filename>` — they are served from `/projects/my-thing/assets/<filename>` via the `public/projects` symlink.
4. Reload the dev server. Your project shows up on the home grid and at `/projects/my-thing`.

### Frontmatter schema

```yaml
---
title: string         # required
date: YYYY-MM-DD      # required, used for sorting (newest first)
description: string   # required
tags: [string]        # required
coverImage: string    # optional, relative path inside the project folder
---
```

See `projects/sample-project/project-description.md` for a working example.

## Scripts

- `npm run dev` — start the dev server.
- `npm run build` — production build; fails on TypeScript errors.
- `npm run start` — run the production build locally.

## Deployment

Deploy to [Vercel](https://vercel.com/new) — point it at this repo and it will detect the Next.js framework automatically. No environment variables are required for the default setup.

For other hosts, run `npm run build` followed by `npm run start`. Make sure the build environment supports the `public/projects` symlink (Vercel does).
