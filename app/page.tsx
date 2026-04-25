import ProjectCard from '@/components/ProjectCard'
import { getAllProjects } from '@/lib/projects'

export default async function HomePage() {
  const projects = await getAllProjects()

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
      <section className="mb-12">
        <h1 className="font-display text-4xl uppercase tracking-[0.15em] text-[--foreground]">
          Projects
        </h1>
      </section>

      {projects.length === 0 ? (
        <p className="text-[--muted]">
          No projects yet. Add a folder under{' '}
          <code className="rounded bg-[--forest-surface] px-1 py-0.5 text-[--accent]">
            projects/
          </code>{' '}
          with a{' '}
          <code className="rounded bg-[--forest-surface] px-1 py-0.5 text-[--accent]">
            project-description.md
          </code>{' '}
          file.
        </p>
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
