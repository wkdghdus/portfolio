import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import type { Experience, ExperienceFrontmatter } from '@/types/experience'

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
    content: processed.toString(),
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

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** Converts a YYYY-MM string to "Month YYYY" (e.g. "2024-09" → "September 2024"). */
export function formatYearMonth(ym: string): string {
  const [year, month] = ym.split('-')
  const name = MONTHS[parseInt(month, 10) - 1]
  return name ? `${name} ${year}` : ym
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
