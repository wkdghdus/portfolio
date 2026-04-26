# experience/

Authored content for experience entries. One folder per position.

## Structure

Each entry lives at `experience/<slug>/experience-description.md`.

```
experience/
  <slug>/
    experience-description.md   # required
    assets/                      # optional; served at /experience/<slug>/assets/*
```

## Frontmatter schema

```yaml
---
role: string           # job title or role (e.g. "Software Engineer Intern")
organization: string   # company or institution name
startDate: string      # YYYY-MM format
endDate: string        # YYYY-MM format; omit for current/present roles
description: string    # one-sentence summary shown in timeline and detail page header
tags: string[]         # technologies and domains
coverImage: string     # optional; filename within this folder (e.g. "cover.png")
---
```

## Slug conventions

Use lowercase kebab-case matching the organization name (e.g. `archisketch`, `td-bank`).

## Content guidelines

- Write the markdown body as a concise case-study: context, what you built, impact.
- Keep sentences short and specific — avoid generic CV language.
- Mark sections requiring content review with `<!-- TODO: verify -->`.
