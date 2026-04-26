export type Experience = {
  slug: string
  role: string
  organization: string
  startDate: string
  endDate?: string
  description: string
  tags: string[]
  coverImage?: string
  content: string
}

export type ExperienceFrontmatter = Omit<Experience, 'slug' | 'content'>
