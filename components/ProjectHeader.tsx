import { formatYearMonth } from '@/lib/experience'

type ProjectHeaderProps = {
  title: string
  organization: string
  startDate: string
  endDate?: string
  tags: string[]
  description: string
}

export default function ProjectHeader({
  title,
  organization,
  startDate,
  endDate,
  tags,
  description,
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
