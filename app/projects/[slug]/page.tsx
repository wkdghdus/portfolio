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
        href="/"
        className="mb-8 inline-block text-sm text-[--muted] transition hover:text-[--foreground]"
      >
        &larr; Back to projects
      </Link>
      <ProjectHeader
        title={project.title}
        date={project.date}
        tags={project.tags}
        description={project.description}
      />
      <article
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: project.content }}
      />
    </main>
  )
}
