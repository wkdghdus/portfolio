# projects/

Authored content. One folder per project — add a folder, get a page.

## Adding a project

1. Create `projects/<slug>/` — folder name becomes the URL slug (kebab-case).
2. Add `project-description.md` with frontmatter (schema below) and markdown body.
3. Drop assets in `projects/<slug>/assets/`. Served at `/projects/<slug>/assets/*` via the `public/projects` symlink.

## Frontmatter schema

```yaml
---
title: string         # required
date: string          # required — YYYY-MM-DD, newest first
description: string   # required
tags: string[]        # required
coverImage: string    # optional — e.g. assets/preview.jpg
---
```

Body below `---` renders as HTML in a `prose` container on the detail page.
