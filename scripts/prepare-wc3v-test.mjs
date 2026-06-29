import { existsSync } from 'node:fs'
import { copyFile, mkdir, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const wc3vDir = path.join(root, '.codex_deps', 'wc3v')
const testReplaySource = path.join(root, 'data', 'replays', 'fortitude', '137397.w3g')
const testReplayTarget = path.join(wc3vDir, 'replays', 'hvtw-hammerfall.w3g')
const testOutput = path.join(wc3vDir, 'client', 'replays', 'hvtw-hammerfall.wc3v')

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

if (!existsSync(wc3vDir)) {
  throw new Error('wc3v checkout not found. Run: npm run wc3v:setup')
}

const wc3vRequire = createRequire(path.join(wc3vDir, 'package.json'))
const mappings = wc3vRequire('w3gjs/dist/lib/mappings')
const movement = wc3vRequire(path.join(wc3vDir, 'helpers', 'unitMovement.json')).units || {}
const output = {}
const addUnit = (id, displayName, extra = {}) => {
  if (!id || output[id]) return
  output[id] = {
    displayName: displayName || id,
    goldCost: 0,
    lumberCost: 0,
    foodUsed: 0,
    foodMade: 0,
    buildTime: 60,
    level: 1,
    collisionSize: 32,
    ...extra,
  }
}

Object.entries(mappings.units || {}).forEach(([id, name]) => addUnit(id, name))
Object.entries(mappings.buildings || {}).forEach(([id, name]) => addUnit(id, name, { collisionSize: 96 }))
Object.keys(movement).forEach((id) => addUnit(id, id))

await writeFile(path.join(wc3vDir, 'helpers', 'UnitBalance.json'), `${JSON.stringify({ output }, null, 2)}\n`)

await mkdir(path.join(wc3vDir, 'mapdata'), { recursive: true })
await mkdir(path.join(wc3vDir, 'client', 'maps'), { recursive: true })
await mkdir(path.join(wc3vDir, 'client', 'logs'), { recursive: true })
await mkdir(path.join(wc3vDir, 'client', 'replays'), { recursive: true })
await mkdir(path.join(wc3vDir, 'replays'), { recursive: true })

run('node', ['tools/data-tool.js', `--source=${path.join(root, 'data', 'maps')}`, '--prefix=', '--force'], { cwd: wc3vDir })

await copyFile(testReplaySource, testReplayTarget)
run('node', ['wc3v.js', '--replay=hvtw-hammerfall', '--debug'], { cwd: wc3vDir })

if (!existsSync(testOutput)) {
  throw new Error(`Expected wc3v output was not created: ${testOutput}`)
}

console.log(`Prepared wc3v test replay: ${testOutput}`)
