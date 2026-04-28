import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import type { Experience, ExperienceFrontmatter } from '@/types/experience'
import { rewriteRelativeAssetSrc } from '@/lib/gallery'
export { formatYearMonth } from '@/lib/date'

const experienceDir = path.join(process.cwd(), 'experience')

export function getExperienceSlugs(): string[] {
  if (!fs.existsSync(experienceDir)) return []
  return fs.readdirSync(experienceDir).filter((name) =>
    fs.statSync(path.join(experienceDir, name)).isDirectory()
  )
}

export async function getExperienceBySlug(slug: string): Promise<Experience> {
  const fullPath = path.join(experienceDir, slug, 'experience-description.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const frontmatter = normalizeFrontmatter(data)
  const processed = await remark().use(html).process(content)
  return {
    slug,
    ...frontmatter,
    content: rewriteRelativeAssetSrc(processed.toString(), `/experience/${slug}`),
  }
}

function normalizeFrontmatter(data: Record<string, unknown>): ExperienceFrontmatter {
  const normalizeDate = (val: unknown): string => {
    if (val instanceof Date) return val.toISOString().slice(0, 7)
    return String(val)
  }
  return {
    role: String(data.role),
    organization: String(data.organization),
    startDate: normalizeDate(data.startDate),
    endDate: typeof data.endDate !== 'undefined' ? normalizeDate(data.endDate) : undefined,
    description: String(data.description),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    coverImage: typeof data.coverImage === 'string' ? data.coverImage : undefined,
  }
}

export async function getAllExperience(): Promise<Experience[]> {
  const slugs = getExperienceSlugs()
  const entries = await Promise.all(slugs.map((slug) => getExperienceBySlug(slug)))
  return entries.sort((a, b) => {
    const dateA = a.endDate ?? a.startDate
    const dateB = b.endDate ?? b.startDate
    return dateA < dateB ? 1 : -1
  })
}
