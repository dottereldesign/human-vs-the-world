import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const depsDir = path.join(root, '.codex_deps')
const warsmashDir = path.join(depsDir, 'warsmash-html')
const repoUrl = 'https://github.com/ErikSom/WarsmashModEngine.git'

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

if (!existsSync(warsmashDir)) {
  run('git', ['clone', '--branch', 'HTML', '--single-branch', repoUrl, warsmashDir])
} else {
  run('git', ['fetch', 'origin', 'HTML'], { cwd: warsmashDir })
  run('git', ['checkout', 'HTML'], { cwd: warsmashDir })
  run('git', ['pull', '--ff-only'], { cwd: warsmashDir })
}

console.log(`Warsmash HTML checkout is ready at ${warsmashDir}`)
console.log('Next: install Java 17 if needed, then run npm run warsmash:build')
