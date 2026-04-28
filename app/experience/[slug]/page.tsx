import { Suspense } from 'react'
import Link from 'next/link'
import ExperienceHeader from '@/components/ExperienceHeader'
import DetailContentSwitcher from '@/components/DetailContentSwitcher'
import { getExperienceBySlug, getExperienceSlugs, formatYearMonth } from '@/lib/experience'
import { listGalleryAssets } from '@/lib/gallery'

type ExperiencePageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getExperienceSlugs().map((slug) => ({ slug }))
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { slug } = await params
  const experience = await getExperienceBySlug(slug)
  const assets = listGalleryAssets('experience', slug)

  const dateRange = experience.endDate
    ? `${formatYearMonth(experience.startDate)} — ${formatYearMonth(experience.endDate)}`
    : `${formatYearMonth(experience.startDate)} — Present`

  const fallback = (
    <article
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: experience.content }}
    />
  )

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <Link
        href="/experience"
        className="mb-8 inline-block font-display text-sm uppercase tracking-[0.12em] text-[--muted] transition-colors duration-200 hover:text-[--foreground]"
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
      <Suspense fallback={fallback}>
        <DetailContentSwitcher
          basePath={`/experience/${slug}`}
          assets={assets}
          articleHtml={experience.content}
        />
      </Suspense>
    </main>
  )
}
