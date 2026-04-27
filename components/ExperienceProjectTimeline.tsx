import Link from 'next/link'

export type TimelineItem = {
  kind: 'project' | 'experience'
  slug: string
  title: string
  subtitle: string
  date: string
  startDate: string
  description: string
  tags: string[]
  href: string
}

type Props = {
  items: TimelineItem[]
}

export default function ExperienceProjectTimeline({ items }: Props) {
  if (items.length === 0) {
    return (
      <div className="border border-[--border] bg-[--surface] p-8 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-[--muted]">
          Timeline entries will appear after experience and project content is added.
        </p>
      </div>
    )
  }

  return (
    <ol className="relative">
      {/* Desktop spine */}
      <li className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-[--border] md:block" aria-hidden="true" />

      {items.map((item, index) => {
        const isLeft = item.kind === 'experience'
        return (
          <li key={`${item.kind}-${item.slug}`} className="relative mb-10 md:mb-14">
            {/* Mobile layout: single column with left spine */}
            <div className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3 md:hidden">
              {/* Marker */}
              <div className="flex flex-col items-center">
                <div className="relative z-10 h-4 w-4 rounded-full border-2 border-[--accent] bg-[--background] flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-[--accent]" />
                </div>
                {index < items.length - 1 && (
                  <div className="mt-1 w-px flex-1 bg-[--border]" />
                )}
              </div>
              {/* Card */}
              <TimelineCard item={item} />
            </div>

            {/* Desktop layout: three-column alternating */}
            <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] md:items-start md:gap-0">
              {/* Left slot */}
              <div className={isLeft ? 'pr-8' : ''}>
                {isLeft && <TimelineCard item={item} />}
              </div>

              {/* Center marker */}
              <div className="flex justify-center pt-5">
                <div className="relative z-10 h-5 w-5 rounded-full border-2 border-[--accent] bg-[--background] flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-[--accent]" />
                </div>
              </div>

              {/* Right slot */}
              <div className={!isLeft ? 'pl-8' : ''}>
                {!isLeft && <TimelineCard item={item} />}
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

function TimelineCard({ item }: { item: TimelineItem }) {
  return (
    <Link
      href={item.href}
      className="group block border border-[--border] bg-[--background]/90 backdrop-blur-sm p-5 transition-all duration-200 hover:border-[--accent] hover:shadow-[0_0_16px_var(--accent-glow)]"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <time className="font-mono text-sm font-medium uppercase tracking-[0.12em] text-[--muted]">
          {item.date}
        </time>
        <span className="border border-[--border-subtle] px-2 py-0.5 font-mono text-sm font-medium uppercase tracking-[0.12em] text-[--muted]">
          {item.kind === 'project' ? 'Project' : 'Experience'}
        </span>
      </div>

      <h3 className="font-display text-xl uppercase tracking-[0.12em] text-[--foreground]">
        {item.title}
      </h3>
      <p className="mt-1 font-mono text-sm uppercase tracking-[0.12em] text-[--muted]">
        {item.subtitle}
      </p>
      <p className="mt-3 text-base leading-relaxed text-[--midground] line-clamp-3">
        {item.description}
      </p>

      {item.tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <li
              key={tag}
              className="border border-[--forest-border] bg-[--forest-surface] px-2 py-0.5 font-mono text-sm uppercase tracking-[0.12em] text-[--accent]"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </Link>
  )
}
