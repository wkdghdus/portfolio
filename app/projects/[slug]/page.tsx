import Link from 'next/link'
import ProjectHeader from '@/components/ProjectHeader'
import { getProjectBySlug, getProjectSlugs } from '@/lib/projects'

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <Link
        href="/projects"
        className="mb-8 inline-block font-display text-sm tracking-[0.12em] uppercase text-[--muted] transition-colors duration-200 hover:text-[--foreground]"
      >
        &larr; Back to projects
      </Link>
      <ProjectHeader
        title={project.title}
        organization={project.organization}
        startDate={project.startDate}
        endDate={project.endDate}
        tags={project.tags}
        description={project.description}
        githubUrl={project.githubUrl}
      />
      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: project.content }}
      />
    </main>
  )
}
