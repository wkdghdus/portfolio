import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const sources = ['projects', 'experience']

for (const source of sources) {
  const srcRoot = join(root, source)
  const destRoot = join(root, 'public', source)

  if (!existsSync(srcRoot)) continue

  rmSync(destRoot, { recursive: true, force: true })
  mkdirSync(destRoot, { recursive: true })

  for (const slug of readdirSync(srcRoot)) {
    const slugPath = join(srcRoot, slug)
    if (!statSync(slugPath).isDirectory()) continue

    const assetsDir = join(slugPath, 'assets')
    if (!existsSync(assetsDir)) continue

    cpSync(assetsDir, join(destRoot, slug, 'assets'), { recursive: true, dereference: true })
  }

  console.log(`copied ${source} assets → public/${source}`)
}
