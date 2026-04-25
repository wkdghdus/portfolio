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
      className="group block overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
    >
      {imageSrc && (
        <div className="aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
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
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
            {project.title}
          </h2>
          <time className="shrink-0 text-xs text-neutral-500 dark:text-neutral-400">
            {project.date}
          </time>
        </div>
        <p className="mt-2 line-clamp-3 text-sm text-neutral-600 dark:text-neutral-300">
          {project.description}
        </p>
        {project.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
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
