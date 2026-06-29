import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const warsmashDir = path.join(root, '.codex_deps', 'warsmash-html')
const javaHome = process.env.JAVA_HOME || '/opt/homebrew/opt/openjdk@17'
const buildEnv = {
  ...process.env,
  JAVA_HOME: javaHome,
  PATH: `${path.join(javaHome, 'bin')}:/opt/homebrew/bin:${process.env.PATH || ''}`,
}

if (!existsSync(warsmashDir)) {
  console.error('Warsmash HTML checkout not found. Run: npm run warsmash:setup')
  process.exit(1)
}

const javaCheck = spawnSync('java', ['-version'], {
  cwd: root,
  stdio: 'pipe',
  env: buildEnv,
})

if (javaCheck.status !== 0) {
  console.error('Java is required to build Warsmash. Install Java 17, then rerun: npm run warsmash:build')
  process.exit(1)
}

const result = spawnSync('./gradlew', [':html:buildWeb'], {
  cwd: warsmashDir,
  stdio: 'inherit',
  env: buildEnv,
})

if (result.status !== 0) {
  throw new Error(`Warsmash build failed with exit code ${result.status}`)
}

console.log('Warsmash web build is ready. Run: npm run warsmash:serve')
