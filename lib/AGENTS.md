# lib/

Data-loading utilities for project content.

## Frozen API — do not modify

`projects.ts` exports the contract used by the home page, the dynamic route, and any future tooling:

- `getProjectSlugs(): string[]`
- `getProjectBySlug(slug: string): Project`
- `getAllProjects(): Project[]`

Add new helpers if needed. Never change these signatures or return types.
