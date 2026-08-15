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
- `gallery.ts` also exports `wrapTablesForScroll(html)` — wraps each rendered `<table>` in `<div class="overflow-x-auto">` so wide GFM tables scroll horizontally instead of breaking the layout on narrow viewports. `getProjectBySlug` and `getExperienceBySlug` apply it (after `rewriteRelativeAssetSrc`) before returning. Assumes `remark-html` emits bare `<table>` tags with no attributes. Pairs with `.prose table { width: max-content; max-width: none }` in `app/globals.css` — without that rule the table shrinks its own columns to fit the wrapper instead of overflowing it, so the scroll container is never triggered.

## Markdown pipeline

`projects.ts` and `experience.ts` render markdown via `remark().use(remarkGfm).use(html)`. This means project and experience descriptions support **GitHub Flavored Markdown** — tables (`| col | col |`), strikethrough, autolink literals, and task lists — in addition to CommonMark. Do not drop `remark-gfm` from the chain; the authored content relies on tables.
