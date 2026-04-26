import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import type { Project, ProjectFrontmatter } from '@/types/project'

const projectsDir = path.join(process.cwd(), 'projects')

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDir)) return []
  return fs.readdirSync(projectsDir).filter((name) =>
    fs.statSync(path.join(projectsDir, name)).isDirectory()
  )
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  const fullPath = path.join(projectsDir, slug, 'project-description.md')
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

function normalizeDate(val: unknown): string {
  if (val instanceof Date) return val.toISOString().slice(0, 7)
  return String(val)
}

function normalizeFrontmatter(data: Record<string, unknown>): ProjectFrontmatter {
  return {
    title: String(data.title),
    organization: String(data.organization ?? 'Personal Project'),
    startDate: normalizeDate(data.startDate ?? data.date),
    endDate: typeof data.endDate !== 'undefined' ? normalizeDate(data.endDate) : undefined,
    description: String(data.description),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    coverImage: typeof data.coverImage === 'string' ? data.coverImage : undefined,
  }
}

export async function getAllProjects(): Promise<Project[]> {
  const slugs = getProjectSlugs()
  const projects = await Promise.all(slugs.map((slug) => getProjectBySlug(slug)))
  return projects.sort((a, b) => {
    const dateA = a.endDate ?? a.startDate
    const dateB = b.endDate ?? b.startDate
    return dateA < dateB ? 1 : -1
  })
}
