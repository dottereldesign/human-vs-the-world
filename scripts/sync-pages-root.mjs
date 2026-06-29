import { cpSync, copyFileSync, existsSync, rmSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

const publishEntries = [
  'assets',
  'favicon.svg',
  'icons.svg',
  'liquipedia-human-earnings.json',
  'map-drop-tables.json',
  'map-images',
  'race-icons',
  'rankings.json',
  'replay-analysis.json',
  'replay-packs',
  'replays.json',
  'wc3-icons',
]

if (!existsSync(path.join(dist, 'index.html'))) {
  throw new Error('Missing dist/index.html. Run npm run build before syncing Pages root.')
}

copyFileSync(path.join(dist, 'index.html'), path.join(root, 'index.html'))

for (const entry of publishEntries) {
  const source = path.join(dist, entry)
  const target = path.join(root, entry)
  if (!existsSync(source)) continue

  rmSync(target, { recursive: true, force: true })
  cpSync(source, target, { recursive: true })
}

writeFileSync(path.join(root, '.nojekyll'), '')
