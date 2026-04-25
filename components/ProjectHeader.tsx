type ProjectHeaderProps = {
  title: string
  date: string
  tags: string[]
  description: string
}

export default function ProjectHeader({
  title,
  date,
  tags,
  description,
}: ProjectHeaderProps) {
  return (
    <header className="mb-10 border-b border-neutral-200 pb-8 dark:border-neutral-800">
      <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
        {title}
      </h1>
      <time className="mt-3 block text-sm text-neutral-500 dark:text-neutral-400">
        {date}
      </time>
      <p className="mt-4 text-lg text-neutral-700 dark:text-neutral-300">
        {description}
      </p>
      {tags.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
