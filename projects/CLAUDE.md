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
organization: string  # required — team, company, or "Personal Project"
startDate: string     # required — YYYY-MM format
endDate: string       # optional — YYYY-MM format; omit if ongoing
description: string   # required
tags: string[]        # required
coverImage: string    # optional — e.g. assets/preview.jpg
githubUrl: string     # optional — full URL e.g. https://github.com/user/repo
---
```

Body below `---` renders as HTML in a `prose` container on the detail page.
