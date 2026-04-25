export type Project = {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  coverImage?: string
  content: string
}

export type ProjectFrontmatter = Omit<Project, 'slug' | 'content'>
