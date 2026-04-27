'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItem = {
  href: string
  label: string
}

const navItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/experience', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
]

function isActivePath(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function SiteNav() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        isScrolled
          ? 'border-[--border] bg-[--background]/95 shadow-[0_8px_24px_rgba(4,28,28,0.45)] backdrop-blur'
          : 'border-[--border-subtle] bg-[--background]/80'
      }`}
    >
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-5 px-6 py-3">
        <Link
          href="/"
          className="shrink-0 font-display text-base uppercase tracking-[0.12em] text-[--foreground] transition-opacity duration-200 hover:opacity-75"
        >
          HLJ
        </Link>
        <nav aria-label="Primary navigation" className="min-w-0">
          <ul className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 sm:gap-x-6">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href)

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`font-display text-sm uppercase tracking-[0.12em] transition-colors duration-200 ${
                      active
                        ? 'text-[--midground]'
                        : 'text-[--muted] hover:text-[--foreground]'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
