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
      className="group block overflow-hidden border border-[--border] bg-[--surface] transition-all duration-200 hover:border-[--accent] hover:shadow-[0_0_16px_var(--accent-glow)]"
    >
      <div className="h-48 flex-shrink-0 overflow-hidden bg-[--forest-surface]">
        {imageSrc && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </>
        )}
      </div>
      <div className="flex flex-col p-4 gap-3">
        {project.tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="bg-[--forest-surface] border border-[--forest-border] text-[--accent] text-xs font-mono uppercase tracking-[0.08em] px-2 py-0.5"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
        <h2 className="font-display text-lg uppercase tracking-[0.12em] text-[--foreground]">
          {project.title}
        </h2>
        <p className="text-sm text-[--midground] leading-relaxed line-clamp-3">
          {project.description}
        </p>
        <time className="text-xs text-[--muted] font-mono uppercase tracking-[0.08em]">
          {project.date}
        </time>
      </div>
    </Link>
  )
}
