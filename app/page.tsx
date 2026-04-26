import Link from 'next/link'
import ProjectCard from '@/components/ProjectCard'
import ExperienceProjectTimeline from '@/components/ExperienceProjectTimeline'
import type { TimelineItem } from '@/components/ExperienceProjectTimeline'
import { getAllProjects } from '@/lib/projects'
import { getAllExperience, formatYearMonth } from '@/lib/experience'
import type { Project } from '@/types/project'

function getTopTags(projects: Project[]): string[] {
  const counts = new Map<string, number>()

  projects.forEach((project) => {
    project.tags.forEach((tag) => {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    })
  })

  return Array.from(counts.entries())
    .sort(
      ([tagA, countA], [tagB, countB]) =>
        countB - countA || tagA.localeCompare(tagB)
    )
    .slice(0, 3)
    .map(([tag]) => tag)
}

export default async function HomePage() {
  const [projects, experiences] = await Promise.all([
    getAllProjects(),
    getAllExperience(),
  ])

  const newestProject = projects[0]
  const topTags = getTopTags(projects)
  const tagSummary = topTags.length > 0 ? topTags.join(' / ') : 'No tags yet'

  const projectItems: TimelineItem[] = projects.map((p) => ({
    kind: 'project',
    slug: p.slug,
    title: p.title,
    subtitle: 'Project',
    date: formatYearMonth(p.date),
    sortDate: p.date,
    description: p.description,
    tags: p.tags,
    href: `/projects/${p.slug}`,
  }))

  const experienceItems: TimelineItem[] = experiences.map((e) => ({
    kind: 'experience',
    slug: e.slug,
    title: e.role,
    subtitle: e.organization,
    date: e.endDate
      ? `${formatYearMonth(e.startDate)} — ${formatYearMonth(e.endDate)}`
      : `${formatYearMonth(e.startDate)} — Present`,
    sortDate: e.endDate ?? e.startDate,
    description: e.description,
    tags: e.tags,
    href: `/experience/${e.slug}`,
  }))

  const timelineItems: TimelineItem[] = [...projectItems, ...experienceItems].sort(
    (a, b) => (a.sortDate < b.sortDate ? 1 : -1)
  )

  return (
    <main className="w-full flex-1">
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-14 pt-14 md:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] md:items-end md:pb-16 md:pt-20">
        <div className="max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-[--accent]">
            Portfolio / Applied Systems
          </p>
          <h1 className="font-display text-6xl uppercase leading-[0.9] tracking-[0.14em] text-[--foreground] sm:text-7xl lg:text-8xl">
            HLJ
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[--midground] sm:text-lg">
            A compact portfolio of production-minded engineering work across
            distributed systems, machine learning, realtime interfaces, and
            generative tools.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#timeline"
              className="inline-flex items-center justify-center border border-[--accent] bg-[--accent] px-5 py-3 font-display text-xs uppercase tracking-[0.12em] text-[--background] transition-shadow duration-200 hover:shadow-[0_0_18px_var(--accent-glow)]"
            >
              View Timeline
            </Link>
            {newestProject && (
              <Link
                href={`/projects/${newestProject.slug}`}
                className="inline-flex items-center justify-center border border-[--border] px-5 py-3 font-display text-xs uppercase tracking-[0.12em] text-[--midground] transition-colors duration-200 hover:border-[--accent] hover:text-[--accent]"
              >
                Latest Work
              </Link>
            )}
          </div>
        </div>

        <div className="border border-[--border] bg-[--surface] p-5 [background-image:radial-gradient(circle,color-mix(in_srgb,var(--midground)_8%,transparent)_1px,transparent_1px)] [background-size:28px_28px]">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-[--muted]">
            Latest Project
          </p>
          {newestProject ? (
            <div className="mt-6">
              <p className="font-display text-3xl uppercase leading-none tracking-[0.12em] text-[--foreground]">
                {newestProject.title}
              </p>
              <p className="mt-4 text-sm leading-6 text-[--midground]">
                {newestProject.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {newestProject.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="border border-[--forest-border] bg-[--forest-surface] px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[--accent]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/projects/${newestProject.slug}`}
                className="mt-6 inline-flex font-display text-xs uppercase tracking-[0.12em] text-[--accent] transition-opacity duration-200 hover:opacity-70"
              >
                Read Case
              </Link>
            </div>
          ) : (
            <p className="mt-6 text-sm leading-6 text-[--midground]">
              Project entries will appear here as soon as they are published.
            </p>
          )}
        </div>
      </section>

      <section className="border-y border-[--border-subtle] bg-[--surface]/60">
        <div className="mx-auto grid w-full max-w-6xl gap-5 px-6 py-6 sm:grid-cols-3">
          <div className="border border-[--border-subtle] bg-[--background]/70 p-4">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[--muted]">
              Total Work
            </p>
            <p className="mt-2 font-display text-2xl uppercase tracking-[0.12em] text-[--foreground]">
              {projects.length}
            </p>
          </div>
          <div className="border border-[--border-subtle] bg-[--background]/70 p-4">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[--muted]">
              Latest
            </p>
            <p className="mt-2 font-display text-2xl uppercase tracking-[0.12em] text-[--foreground]">
              {newestProject?.date ?? 'Pending'}
            </p>
          </div>
          <div className="border border-[--border-subtle] bg-[--background]/70 p-4">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[--muted]">
              Tags
            </p>
            <p className="mt-2 text-sm leading-6 text-[--midground]">
              {tagSummary}
            </p>
          </div>
        </div>
      </section>

      <section id="timeline" className="mx-auto w-full max-w-6xl px-6 py-14">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-[--accent]">
              Experience + Projects
            </p>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.14em] text-[--foreground]">
              Timeline
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[--midground]">
            Experience and projects arranged together by date for a single view
            of applied systems work.
          </p>
        </div>

        <ExperienceProjectTimeline items={timelineItems} />
      </section>

      <section id="projects" className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-[--accent]">
            Complete Index
          </p>
          <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.14em] text-[--foreground]">
            Projects
          </h2>
        </div>

        {projects.length === 0 ? (
          <div className="border border-[--border] bg-[--surface] px-6 py-12 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-[--muted]">
              No projects are published yet.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[--midground]">
              Add project folders under{' '}
              <code className="bg-[--forest-surface] px-1.5 py-0.5 text-[--accent]">
                projects/
              </code>{' '}
              with{' '}
              <code className="bg-[--forest-surface] px-1.5 py-0.5 text-[--accent]">
                project-description.md
              </code>{' '}
              files to populate the homepage.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
