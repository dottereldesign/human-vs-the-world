import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { gunzipSync } from 'node:zlib'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const depsDir = path.join(root, '.codex_deps')
const wc3vDir = path.join(depsDir, 'wc3v')
const repoUrl = 'https://github.com/jblanchette/wc3v.git'

const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, {
    cwd: options.cwd || root,
    stdio: 'inherit',
    env: { ...process.env, PATH: `/opt/homebrew/bin:${process.env.PATH || ''}` },
  })

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed with exit code ${result.status}`)
  }
}

await mkdir(depsDir, { recursive: true })

if (!existsSync(wc3vDir)) {
  run('git', ['clone', '--depth', '1', repoUrl, wc3vDir])
} else {
  run('git', ['pull', '--ff-only'], { cwd: wc3vDir })
}

run('npm', ['install'], { cwd: wc3vDir })

const sampleSource = path.join(wc3vDir, 'docs', 'happy-vs-grubby.wc3v.gz')
const replayDir = path.join(wc3vDir, 'client', 'replays')
const sampleTarget = path.join(replayDir, 'happy-vs-grubby.wc3v')

if (existsSync(sampleSource) && !existsSync(sampleTarget)) {
  await mkdir(replayDir, { recursive: true })
  await writeFile(sampleTarget, gunzipSync(await readFile(sampleSource)))
  console.log(`Seeded ${sampleTarget}`)
}

console.log(`wc3v is ready at ${wc3vDir}`)
