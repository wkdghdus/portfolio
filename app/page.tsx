import ProjectCard from '@/components/ProjectCard'
import { getAllProjects } from '@/lib/projects'

export default async function HomePage() {
  const projects = await getAllProjects()

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
      <section className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Projects
        </h1>
        <p className="mt-3 max-w-2xl text-base text-neutral-600 dark:text-neutral-300">
          A file-system driven portfolio. Each entry below is rendered from a
          markdown file in the projects directory.
        </p>
      </section>

      {projects.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400">
          No projects yet. Add a folder under{' '}
          <code className="rounded bg-neutral-100 px-1 py-0.5 dark:bg-neutral-800">
            projects/
          </code>{' '}
          with a{' '}
          <code className="rounded bg-neutral-100 px-1 py-0.5 dark:bg-neutral-800">
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
