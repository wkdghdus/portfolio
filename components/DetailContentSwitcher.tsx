'use client'

import { useSearchParams } from 'next/navigation'
import GalleryToggle from '@/components/GalleryToggle'
import Gallery from '@/components/Gallery'
import type { GalleryAsset } from '@/types/gallery'

type DetailContentSwitcherProps = {
  basePath: string
  assets: GalleryAsset[]
  articleHtml: string
}

export default function DetailContentSwitcher({
  basePath,
  assets,
  articleHtml,
}: DetailContentSwitcherProps) {
  const searchParams = useSearchParams()
  const activeView: 'description' | 'gallery' =
    searchParams.get('view') === 'gallery' && assets.length > 0
      ? 'gallery'
      : 'description'

  return (
    <>
      {assets.length > 0 && (
        <GalleryToggle
          descriptionHref={basePath}
          galleryHref={`${basePath}?view=gallery`}
          activeView={activeView}
        />
      )}
      {activeView === 'gallery' ? (
        <Gallery assets={assets} />
      ) : (
        <article
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: articleHtml }}
        />
      )}
    </>
  )
}
