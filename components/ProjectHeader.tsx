type ProjectHeaderProps = {
  title: string
  date: string
  tags: string[]
  description: string
}

export default function ProjectHeader({
  title,
  date,
  tags,
  description,
}: ProjectHeaderProps) {
  return (
    <header className="mb-10 border-b border-[--border] pb-8">
      <h1 className="font-display text-4xl font-black uppercase tracking-[0.15em] text-[--foreground]">
        {title}
      </h1>
      <time className="mt-3 block text-sm text-[--muted]">
        {date}
      </time>
      <p className="mt-4 text-lg text-[--midground]">
        {description}
      </p>
      {tags.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-[--forest-border] bg-[--forest-surface] px-3 py-1 text-xs font-medium text-[--accent]"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
