import Link from 'next/link'
import ExperienceHeader from '@/components/ExperienceHeader'
import { getExperienceBySlug, getExperienceSlugs, formatYearMonth } from '@/lib/experience'

type ExperiencePageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getExperienceSlugs().map((slug) => ({ slug }))
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { slug } = await params
  const experience = await getExperienceBySlug(slug)

  const dateRange = experience.endDate
    ? `${formatYearMonth(experience.startDate)} — ${formatYearMonth(experience.endDate)}`
    : `${formatYearMonth(experience.startDate)} — Present`

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <Link
        href="/experience"
        className="mb-8 inline-block font-display text-[0.8rem] uppercase tracking-[0.12em] opacity-60 transition-opacity duration-200 hover:opacity-100"
      >
        &larr; Back to experience
      </Link>
      <ExperienceHeader
        role={experience.role}
        organization={experience.organization}
        dateRange={dateRange}
        tags={experience.tags}
        description={experience.description}
      />
      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: experience.content }}
      />
    </main>
  )
}
