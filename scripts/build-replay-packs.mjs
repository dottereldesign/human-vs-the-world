import { mkdir, stat } from 'node:fs/promises'
import { existsSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

const REPLAYS_FILE = new URL('../public/replays.json', import.meta.url)
const PACKS_DIR = new URL('../public/replay-packs/', import.meta.url)
const PACK_SIZE_LIMITS = {
  fortitude: 49 * 1000 * 1000,
}
const replays = await import(REPLAYS_FILE, { with: { type: 'json' } })

await mkdir(PACKS_DIR, { recursive: true })

const applyPackSizeLimit = async (slug, files) => {
  const sizeLimit = PACK_SIZE_LIMITS[slug]
  if (!sizeLimit) return { files, removed: 0, bytes: null }

  const selected = []
  let bytes = 0

  for (const file of files) {
    const fileSize = (await stat(file)).size
    if (bytes + fileSize > sizeLimit) break
    selected.push(file)
    bytes += fileSize
  }

  return { files: selected, removed: files.length - selected.length, bytes }
}

for (const [slug, playerData] of Object.entries(replays.default.players)) {
  const output = new URL(`${slug}-2026-human-wins.zip`, PACKS_DIR)
  const availableFiles = playerData.replays.map((replay) => replay.localPath).filter((file) => existsSync(file))
  const { files, removed, bytes } = await applyPackSizeLimit(slug, availableFiles)

  if (existsSync(output)) rmSync(output)

  execFileSync('/usr/bin/zip', ['-j', '-q', output.pathname, ...files])
  const limitLabel = bytes === null ? '' : `, ${removed} oldest removed, ${Math.round(bytes / 1000 / 1000)} MB source`
  console.log(`${output.pathname}: ${files.length} files${limitLabel}`)
}
