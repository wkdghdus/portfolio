import Link from 'next/link'
import ProjectCard from '@/components/ProjectCard'
import ExperienceProjectTimeline from '@/components/ExperienceProjectTimeline'
import type { TimelineItem } from '@/components/ExperienceProjectTimeline'
import RotatingTags from '@/components/RotatingTags'
import { getAllProjects } from '@/lib/projects'
import { getAllExperience, formatYearMonth } from '@/lib/experience'
import type { Project } from '@/types/project'
import type { Experience } from '@/types/experience'

function getTagsByFrequency(projects: Project[], experiences: Experience[]): string[] {
  const counts = new Map<string, number>()

  ;[...projects, ...experiences].forEach((item) => {
    item.tags.forEach((tag) => {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    })
  })

  return Array.from(counts.entries())
    .sort(
      ([tagA, countA], [tagB, countB]) =>
        countB - countA || tagA.localeCompare(tagB)
    )
    .map(([tag]) => tag)
}

export default async function HomePage() {
  const [projects, experiences] = await Promise.all([
    getAllProjects(),
    getAllExperience(),
  ])

  const newestProject = projects[0]
  const tagsByFrequency = getTagsByFrequency(projects, experiences)

  const projectItems: TimelineItem[] = projects.map((p) => ({
    kind: 'project',
    slug: p.slug,
    title: p.title,
    subtitle: p.organization,
    date: p.endDate
      ? `${formatYearMonth(p.startDate)} — ${formatYearMonth(p.endDate)}`
      : formatYearMonth(p.startDate),
    startDate: p.startDate,
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
    startDate: e.startDate,
    description: e.description,
    tags: e.tags,
    href: `/experience/${e.slug}`,
  }))

  const timelineItems: TimelineItem[] = [...projectItems, ...experienceItems].sort(
    (a, b) => (a.startDate < b.startDate ? 1 : -1)
  )

  return (
    <main className="w-full flex-1">
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-14 pt-14 md:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] md:items-end md:pb-16 md:pt-20">
        <div className="max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-[--accent]">
            Portfolio | Data/AI/ML
          </p>
          <h1 className="font-display text-6xl uppercase leading-[0.9] tracking-[0.14em] text-[--foreground] sm:text-7xl lg:text-8xl">
            Hoyeon Luke Jang
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[--midground] sm:text-lg">
            Own what you build
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="#timeline"
              className="inline-flex items-center justify-center border border-[--accent] bg-[--accent] px-5 py-3 font-display text-xs uppercase tracking-[0.12em] text-[--background] transition-shadow duration-200 hover:shadow-[0_0_18px_var(--accent-glow)]"
            >
              View Timeline
            </Link>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/wkdghdus"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex items-center justify-center border border-[--border] p-3 text-[--midground] transition-colors duration-200 hover:border-[--accent] hover:text-[--accent]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/hoyeonjang/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center justify-center border border-[--border] p-3 text-[--midground] transition-colors duration-200 hover:border-[--accent] hover:text-[--accent]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://medium.com/@h.lukejang"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Medium"
                className="inline-flex items-center justify-center border border-[--border] p-3 text-[--midground] transition-colors duration-200 hover:border-[--accent] hover:text-[--accent]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border border-[--border] bg-[--background]/90 backdrop-blur-sm p-5">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-[--muted]">
            Latest Project
          </p>
          {newestProject ? (
            <div className="mt-6">
              <p className="font-display text-3xl uppercase leading-none tracking-[0.12em] text-[--foreground]">
                {newestProject.title}
              </p>
              <p className="mt-4 text-base leading-6 text-[--midground]">
                {newestProject.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {newestProject.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="border border-[--forest-border] bg-[--forest-surface] px-2 py-1 font-mono text-sm uppercase tracking-[0.12em] text-[--accent]"
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

      <section className="border-y border-[--border-subtle] bg-[--background]/85 backdrop-blur-sm">
        <div className="mx-auto grid w-full max-w-6xl gap-5 px-6 py-6 sm:grid-cols-3">
          <div className="border border-[--border-subtle] bg-[--background]/90 p-4">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-[--muted]">
              Total Work
            </p>
            <p className="mt-2 font-display text-2xl uppercase tracking-[0.12em] text-[--foreground]">
              {projects.length}
            </p>
          </div>
          <div className="border border-[--border-subtle] bg-[--background]/90 p-4">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-[--muted]">
              Latest
            </p>
            <p className="mt-2 font-display text-2xl uppercase tracking-[0.12em] text-[--foreground]">
              {newestProject ? formatYearMonth(newestProject.endDate ?? newestProject.startDate) : 'Pending'}
            </p>
          </div>
          <div className="border border-[--border-subtle] bg-[--background]/90 p-4">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-[--muted]">
              Tags
            </p>
            <RotatingTags tags={tagsByFrequency} />
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
          <p className="max-w-xl text-base leading-6 text-[--midground]">
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
