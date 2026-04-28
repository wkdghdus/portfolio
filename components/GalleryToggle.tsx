import Link from 'next/link'

type GalleryToggleProps = {
  descriptionHref: string
  galleryHref: string
  activeView: 'description' | 'gallery'
}

const baseSegment =
  'flex-1 px-6 py-2 font-display text-sm uppercase tracking-[0.12em] text-center transition-colors duration-200'
const activeSegment =
  'bg-[--accent] text-[--background] font-bold shadow-[0_0_12px_rgba(255,189,56,0.45)]'
const inactiveSegment = 'text-[--muted] hover:text-[--accent]'

export default function GalleryToggle({
  descriptionHref,
  galleryHref,
  activeView,
}: GalleryToggleProps) {
  return (
    <div className="mb-10 flex justify-center">
      <div className="inline-flex divide-x divide-[--border] border border-[--border]">
        <Link
          href={descriptionHref}
          aria-current={activeView === 'description' ? 'page' : undefined}
          className={`${baseSegment} ${activeView === 'description' ? activeSegment : inactiveSegment}`}
        >
          DESCRIPTION
        </Link>
        <Link
          href={galleryHref}
          aria-current={activeView === 'gallery' ? 'page' : undefined}
          className={`${baseSegment} ${activeView === 'gallery' ? activeSegment : inactiveSegment}`}
        >
          GALLERY
        </Link>
      </div>
    </div>
  )
}
