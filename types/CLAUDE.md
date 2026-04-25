# types/

TypeScript type definitions. Read `project.ts` before touching any other file in this repo.

## Frozen types

`ProjectFrontmatter` and `Project` in `project.ts` define the data shape every module produces or consumes. Do not change them. Use `ProjectFrontmatter` casts after `gray-matter` parses raw frontmatter.
