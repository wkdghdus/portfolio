type RotatingTagsProps = {
  tags: string[]
  className?: string
}

export default function RotatingTags({ tags, className = 'mt-2' }: RotatingTagsProps) {
  const normalized = Array.from(new Set(tags)).filter((t) => t.length > 0)

  if (normalized.length === 0) {
    return (
      <p className={`${className} text-sm leading-6 text-[--midground]`}>No tags yet</p>
    )
  }

  const doubled = [...normalized, ...normalized]

  return (
    <div className={`${className} overflow-hidden`} aria-label={`Project tags: ${normalized.join(', ')}`}>
      <div className="flex w-max animate-[scroll-tags_60s_linear_infinite] flex-nowrap gap-2">
        {doubled.map((tag, i) => (
          <span
            key={i}
            className="shrink-0 border border-[--forest-border] bg-[--forest-surface] px-2 py-1 font-mono text-xs uppercase tracking-[0.12em] text-[--accent]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
