import fs from 'fs'
import path from 'path'
import type { GalleryAsset } from '@/types/gallery'

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.avif'])
const PDF_EXTS = new Set(['.pdf'])

export type GalleryKind = 'projects' | 'experience'

export function listGalleryAssets(kind: GalleryKind, slug: string): GalleryAsset[] {
  const assetsDir = path.join(process.cwd(), kind, slug, 'assets')
  if (!fs.existsSync(assetsDir)) return []

  const entries = fs.readdirSync(assetsDir, { withFileTypes: true })
  const assets: GalleryAsset[] = []

  for (const entry of entries) {
    if (!entry.isFile()) continue
    if (entry.name.startsWith('.')) continue

    const ext = path.extname(entry.name).toLowerCase()
    const src = `/${kind}/${slug}/assets/${encodeURIComponent(entry.name)}`

    if (IMAGE_EXTS.has(ext)) {
      assets.push({ kind: 'image', src, name: entry.name })
    } else if (PDF_EXTS.has(ext)) {
      assets.push({ kind: 'pdf', src, name: entry.name })
    }
  }

  return assets.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  )
}
