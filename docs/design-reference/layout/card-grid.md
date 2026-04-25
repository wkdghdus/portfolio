# Layout — Card Grid

## Purpose
Responsive project listing grid that flows from 1 → 2 → 3 columns as viewport widens. Used on the portfolio home page.

**Source:** Portfolio `app/page.tsx:32-38`

---

## Implementation

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {projects.map((project) => (
    <ProjectCard key={project.slug} project={project} />
  ))}
</div>
```

---

## Breakpoints

| Breakpoint | Columns | Min width |
|---|---|---|
| Default (mobile) | 1 | 0px |
| `sm:` | 2 | 640px |
| `lg:` | 3 | 1024px |

---

## Card Anatomy (ProjectCard pattern)

```tsx
<article className="
  group relative flex flex-col
  border border-[--border]
  bg-[--surface]
  hover:border-[--accent]
  hover:shadow-[0_0_16px_var(--accent-glow)]
  transition-all duration-200
  overflow-hidden
">
  {/* Cover image container — fixed height */}
  <div className="overflow-hidden bg-[--forest-surface] h-48 flex-shrink-0">
    {coverImage ? (
      <img
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        src={coverImage}
        alt={title}
      />
    ) : (
      <div className="w-full h-full" />  {/* empty state */}
    )}
  </div>

  {/* Content */}
  <div className="flex flex-col flex-1 p-4 gap-3">
    {/* Tags */}
    <div className="flex flex-wrap gap-1.5">
      {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
    </div>

    {/* Title */}
    <h2 className="font-display text-lg uppercase tracking-[0.12em] text-[--foreground]">
      {title}
    </h2>

    {/* Description */}
    <p className="text-[--midground] text-sm leading-relaxed flex-1">
      {description}
    </p>

    {/* Date */}
    <time className="text-[--muted] text-xs font-mono uppercase tracking-[0.08em]">
      {date}
    </time>
  </div>
</article>
```

---

## Gap Variants

| Gap | Class | Visual density |
|---|---|---|
| Tight | `gap-4` | Dense grid, cards feel packed |
| Standard | `gap-6` | Canonical — current portfolio |
| Open | `gap-8` | Airy, editorial feel |

---

## Empty State

When there are no projects:

```tsx
<div className="col-span-full text-center py-16 text-[--muted] font-mono uppercase tracking-[0.12em] text-sm">
  No projects yet
</div>
```

---

## Section Heading Pattern

```tsx
<section>
  <h1 className="font-display text-3xl uppercase tracking-[0.15em] text-[--foreground] mb-8">
    Projects
  </h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* cards */}
  </div>
</section>
```
