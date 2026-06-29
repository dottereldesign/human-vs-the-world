import { mkdir } from 'node:fs/promises'
import { existsSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

const REPLAYS_FILE = new URL('../public/replays.json', import.meta.url)
const PACKS_DIR = new URL('../public/replay-packs/', import.meta.url)
const replays = await import(REPLAYS_FILE, { with: { type: 'json' } })

await mkdir(PACKS_DIR, { recursive: true })

for (const [slug, playerData] of Object.entries(replays.default.players)) {
  const output = new URL(`${slug}-2026-human-wins.zip`, PACKS_DIR)
  const files = playerData.replays.map((replay) => replay.localPath).filter((file) => existsSync(file))

  if (existsSync(output)) rmSync(output)

  execFileSync('/usr/bin/zip', ['-j', '-q', output.pathname, ...files])
  console.log(`${output.pathname}: ${files.length} files`)
}
