'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import type { GalleryAsset } from '@/types/gallery'

type GalleryProps = {
  assets: GalleryAsset[]
}

type ImageAsset = Extract<GalleryAsset, { kind: 'image' }>

const lightboxBtnClass =
  'absolute z-10 border border-[--border] px-3 py-1 font-display text-sm uppercase tracking-[0.12em] text-[--muted] transition-colors duration-200 hover:border-[--accent] hover:text-[--accent]'

function prettyPdfName(filename: string): string {
  const dot = filename.lastIndexOf('.')
  const stem = dot === -1 ? filename : filename.slice(0, dot)
  return stem.replace(/[-_]+/g, ' ').toUpperCase()
}

export default function Gallery({ assets }: GalleryProps) {
  const images = useMemo<ImageAsset[]>(
    () => assets.filter((a): a is ImageAsset => a.kind === 'image'),
    [assets]
  )
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const isOpen = lightboxIndex !== null

  const close = useCallback(() => setLightboxIndex(null), [])
  const prev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length
    )
  }, [images.length])
  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length))
  }, [images.length])

  useEffect(() => {
    if (!isOpen) return
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft' && images.length > 1) prev()
      else if (e.key === 'ArrowRight' && images.length > 1) next()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      root.style.overflow = previousOverflow
    }
  }, [isOpen, close, prev, next, images.length])

  return (
    <>
      <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
        {assets.map((asset) => (
          <li key={asset.src} className="m-0">
            {asset.kind === 'image' ? (
              <button
                type="button"
                onClick={() => {
                  const idx = images.findIndex((img) => img.src === asset.src)
                  if (idx !== -1) setLightboxIndex(idx)
                }}
                className="block w-full border border-[--border] bg-[--forest-surface] text-left transition-colors duration-200 hover:border-[--accent]"
              >
                <div className="flex aspect-[4/3] items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset.src}
                    alt={asset.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="truncate px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-[--muted]">
                  {asset.name}
                </div>
              </button>
            ) : (
              <a
                href={asset.src}
                target="_blank"
                rel="noopener noreferrer"
                className="flex aspect-[4/3] flex-col items-center justify-center gap-3 border border-[--border] bg-[--forest-surface] p-4 text-[--muted] transition-colors duration-200 hover:border-[--accent] hover:text-[--accent]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-12 w-12"
                  aria-hidden="true"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="8" y1="13" x2="16" y2="13" />
                  <line x1="8" y1="17" x2="16" y2="17" />
                </svg>
                <span className="text-center font-display text-sm uppercase tracking-[0.12em]">
                  {prettyPdfName(asset.name)}
                </span>
              </a>
            )}
          </li>
        ))}
      </ul>

      {isOpen && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Image preview: ${images[lightboxIndex].name}`}
          onClick={close}
          className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-4"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation()
              close()
            }}
            className={`${lightboxBtnClass} right-4 top-4`}
          >
            CLOSE
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation()
                  prev()
                }}
                className={`${lightboxBtnClass} left-4 top-1/2 -translate-y-1/2`}
              >
                &larr;
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation()
                  next()
                }}
                className={`${lightboxBtnClass} right-4 top-1/2 -translate-y-1/2`}
              >
                &rarr;
              </button>
            </>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[lightboxIndex].src}
            alt={images[lightboxIndex].name}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </>
  )
}
