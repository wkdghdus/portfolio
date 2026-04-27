import ProjectCard from '@/components/ProjectCard'
import { getAllProjects } from '@/lib/projects'
import { formatYearMonth } from '@/lib/date'

export default async function ProjectsPage() {
  const projects = await getAllProjects()
  const latestProject = projects[0]

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-14 md:py-18">
      <section className="mb-12 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(16rem,0.45fr)] md:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-[--accent]">
            Complete Index
          </p>
          <h1 className="mt-3 font-display text-5xl uppercase leading-none tracking-[0.14em] text-[--foreground] sm:text-6xl">
            Projects
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[--midground]">
            Production-minded systems work, interface experiments, machine
            learning projects, and generative tools collected as case studies.
          </p>
        </div>

        <div className="border border-[--border] bg-[--background]/90 backdrop-blur-sm p-5">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-[--muted]">
            Published Work
          </p>
          <p className="mt-3 font-display text-3xl uppercase tracking-[0.12em] text-[--foreground]">
            {projects.length}
          </p>
          <p className="mt-4 text-base leading-6 text-[--midground]">
            {latestProject
              ? `Latest: ${formatYearMonth(latestProject.endDate ?? latestProject.startDate)}`
              : 'Project entries will appear here once they are published.'}
          </p>
        </div>
      </section>

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
            files to populate this index.
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
    </main>
  )
}
