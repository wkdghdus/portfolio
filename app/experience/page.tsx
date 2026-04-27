import Link from 'next/link'
import { getAllExperience, formatYearMonth } from '@/lib/experience'

export default async function ExperiencePage() {
  const experiences = await getAllExperience()

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-14 md:py-18">
      <section className="mb-12 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(16rem,0.45fr)] md:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-[--accent]">
            Professional Record
          </p>
          <h1 className="mt-3 font-display text-5xl uppercase leading-none tracking-[0.14em] text-[--foreground] sm:text-6xl">
            Experience
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[--midground]">
            Roles and applied engineering work arranged by date, with each
            entry linking to supporting details.
          </p>
        </div>

        <div className="border border-[--border] bg-[--background]/90 backdrop-blur-sm p-5">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-[--muted]">
            Experience Entries
          </p>
          <p className="mt-3 font-display text-3xl uppercase tracking-[0.12em] text-[--foreground]">
            {experiences.length}
          </p>
          <p className="mt-4 text-base leading-6 text-[--midground]">
            {experiences[0]
              ? `Latest: ${formatYearMonth(experiences[0].endDate ?? experiences[0].startDate)}`
              : 'Experience entries will appear here once they are published.'}
          </p>
        </div>
      </section>

      {experiences.length === 0 ? (
        <div className="border border-[--border] bg-[--surface] p-8 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-[--muted]">
            Experience entries will appear after content is added.
          </p>
        </div>
      ) : (
        <ol className="grid gap-5">
          {experiences.map((experience) => {
            const dateRange = experience.endDate
              ? `${formatYearMonth(experience.startDate)} — ${formatYearMonth(experience.endDate)}`
              : `${formatYearMonth(experience.startDate)} — Present`

            return (
              <li key={experience.slug}>
                <Link
                  href={`/experience/${experience.slug}`}
                  className="group block border border-[--border] bg-[--background]/90 backdrop-blur-sm p-5 transition-all duration-200 hover:border-[--accent] hover:shadow-[0_0_16px_var(--accent-glow)]"
                >
                  <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <span className="font-mono text-sm font-medium uppercase tracking-[0.12em] text-[--muted]">
                      {dateRange}
                    </span>
                    <span className="w-fit border border-[--border-subtle] px-2 py-0.5 font-mono text-sm font-medium uppercase tracking-[0.12em] text-[--muted]">
                      Experience
                    </span>
                  </div>

                  <h2 className="font-display text-2xl uppercase tracking-[0.12em] text-[--foreground]">
                    {experience.role}
                  </h2>
                  <p className="mt-1 font-mono text-sm uppercase tracking-[0.12em] text-[--muted]">
                    {experience.organization}
                  </p>
                  <p className="mt-3 max-w-3xl text-base leading-relaxed text-[--midground]">
                    {experience.description}
                  </p>

                  {experience.tags.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {experience.tags.map((tag) => (
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
              </li>
            )
          })}
        </ol>
      )}
    </main>
  )
}
