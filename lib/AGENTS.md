# lib/

Data-loading utilities for project content.

## Frozen API — do not modify

`projects.ts` exports the contract used by the home page, the dynamic route, and any future tooling:

- `getProjectSlugs(): string[]`
- `getProjectBySlug(slug: string): Project`
- `getAllProjects(): Project[]`

Add new helpers if needed. Never change these signatures or return types.

## Helpers (non-frozen)

- `gallery.ts` — `listGalleryAssets(kind, slug)` lists images and PDFs in `<kind>/<slug>/assets/` for the detail-page gallery toggle. Returns `[]` when the directory is missing. Used by both project and experience routes.
- `gallery.ts` also exports `rewriteRelativeAssetSrc(html, basePath)` — rewrites relative `<img src="assets/...">` URLs in the rendered markdown HTML to absolute `<basePath>/assets/...`. `getProjectBySlug` and `getExperienceBySlug` apply it before returning so authors can keep markdown image paths relative to the project folder.
