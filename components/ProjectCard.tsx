import Link from 'next/link'
import type { Project } from '@/types/project'

type ProjectCardProps = {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const imageSrc = project.coverImage
    ? `/projects/${project.slug}/${project.coverImage}`
    : null

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-lg border border-[--border] bg-[--surface] transition hover:border-[--accent] hover:shadow-[0_0_16px_var(--accent-glow)]"
    >
      {imageSrc && (
        <div className="aspect-video w-full overflow-hidden bg-[--forest-surface]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={project.title}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-lg font-bold uppercase tracking-[0.12em] text-[--foreground]">
            {project.title}
          </h2>
          <time className="shrink-0 text-xs text-[--muted]">
            {project.date}
          </time>
        </div>
        <p className="mt-2 line-clamp-3 text-sm text-[--midground]">
          {project.description}
        </p>
        {project.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-[--forest-border] bg-[--forest-surface] px-2.5 py-1 text-xs font-medium text-[--accent]"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  )
}
