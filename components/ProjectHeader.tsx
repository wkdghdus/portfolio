import { formatYearMonth } from '@/lib/experience'

type ProjectHeaderProps = {
  title: string
  organization: string
  startDate: string
  endDate?: string
  tags: string[]
  description: string
  githubUrl?: string
}

export default function ProjectHeader({
  title,
  organization,
  startDate,
  endDate,
  tags,
  description,
  githubUrl,
}: ProjectHeaderProps) {
  const dateRange = endDate
    ? `${formatYearMonth(startDate)} — ${formatYearMonth(endDate)}`
    : formatYearMonth(startDate)

  return (
    <header className="mb-10 border-b border-[--border] pb-8">
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-[--accent]">
        {organization}
      </p>
      <h1 className="mt-2 font-display text-4xl uppercase tracking-[0.15em] text-[--foreground]">
        {title}
      </h1>
      <time className="mt-3 block text-sm text-[--muted]">
        {dateRange}
      </time>
      <p className="mt-4 text-lg text-[--midground]">
        {description}
      </p>
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 border border-[--border] px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-[--muted] transition-colors duration-200 hover:border-[--accent] hover:text-[--accent]"
        >
          GitHub →
        </a>
      )}
      {tags.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="bg-[--forest-surface] border border-[--forest-border] text-[--accent] text-xs font-mono uppercase tracking-[0.08em] px-2 py-0.5"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
