'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SiteNav() {
  const pathname = usePathname()

  return (
    <header className="border-b border-[--border-subtle]">
      <div className="mx-auto w-full max-w-6xl flex items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="font-display text-base tracking-[0.12em] uppercase text-[--foreground]"
        >
          HLJ
        </Link>
        <nav>
          <Link
            href="/"
            className={`font-display text-[0.8rem] tracking-[0.12em] uppercase transition-opacity duration-200 ${
              pathname === '/' ? 'text-[--midground]' : 'opacity-60 hover:opacity-100'
            }`}
          >
            Projects
          </Link>
        </nav>
      </div>
    </header>
  )
}
