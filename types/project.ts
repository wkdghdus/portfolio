export type Project = {
  slug: string
  title: string
  organization: string
  startDate: string
  endDate?: string
  description: string
  tags: string[]
  coverImage?: string
  githubUrl?: string
  content: string
}

export type ProjectFrontmatter = Omit<Project, 'slug' | 'content'>
