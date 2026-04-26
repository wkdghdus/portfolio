type ExperienceHeaderProps = {
  role: string
  organization: string
  dateRange: string
  tags: string[]
  description: string
}

export default function ExperienceHeader({
  role,
  organization,
  dateRange,
  tags,
  description,
}: ExperienceHeaderProps) {
  return (
    <header className="mb-10 border-b border-[--border] pb-8">
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-[--accent]">
        {organization}
      </p>
      <h1 className="mt-2 font-display text-4xl uppercase tracking-[0.15em] text-[--foreground]">
        {role}
      </h1>
      <p className="mt-3 text-sm text-[--muted]">
        {dateRange}
      </p>
      <p className="mt-4 text-lg text-[--midground]">
        {description}
      </p>
      {tags.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="border border-[--forest-border] bg-[--forest-surface] px-2 py-0.5 font-mono text-xs uppercase tracking-[0.12em] text-[--accent]"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
