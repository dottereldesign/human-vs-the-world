import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const projectRoot = path.resolve(new URL('..', import.meta.url).pathname)
const defaultInstallRoot = '/Applications/Warcraft III'
const installRoot = process.argv[2] || process.env.WC3_REFORGED_ROOT || defaultInstallRoot
const sandboxRoot = path.join(projectRoot, '.wc3-assets', 'reforged')
const manifestPath = path.join(sandboxRoot, 'manifest.json')

const exists = async (filePath) => {
  try {
    await stat(filePath)
    return true
  } catch {
    return false
  }
}

const listFiles = async (directory, relativeBase = '') => {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const absolute = path.join(directory, entry.name)
    const relative = path.posix.join(relativeBase, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await listFiles(absolute, relative)))
      continue
    }
    if (!entry.isFile()) continue
    const fileStat = await stat(absolute)
    files.push({
      path: relative,
      absolute,
      size: fileStat.size,
      mtimeMs: Math.round(fileStat.mtimeMs),
    })
  }

  return files
}

const readBuild = async () => {
  const buildInfoPath = path.join(installRoot, '.build.info')
  const text = await readFile(buildInfoPath, 'utf8')
  const line = text.split(/\r?\n/).find((candidate) => /\d+\.\d+/.test(candidate)) || ''
  return line.match(/\d+\.\d+(?:\.\d+)*/)?.[0] || 'unknown'
}

if (!(await exists(installRoot))) {
  throw new Error(`Reforged install not found: ${installRoot}`)
}

const dataRoot = path.join(installRoot, 'Data')
for (const required of ['config', 'indices', 'data']) {
  const requiredPath = path.join(dataRoot, required)
  if (!(await exists(requiredPath))) {
    throw new Error(`Missing Reforged CASC folder: ${requiredPath}`)
  }
}

await mkdir(sandboxRoot, { recursive: true })

const [configFiles, indexFiles, dataFiles] = await Promise.all([
  listFiles(path.join(dataRoot, 'config'), 'Data/config'),
  listFiles(path.join(dataRoot, 'indices'), 'Data/indices'),
  listFiles(path.join(dataRoot, 'data'), 'Data/data'),
])

const manifest = {
  schemaVersion: 1,
  createdAt: new Date().toISOString(),
  installRoot,
  sandboxRoot,
  mode: 'indexed-readonly',
  build: await readBuild(),
  totals: {
    configFiles: configFiles.length,
    indexFiles: indexFiles.length,
    dataFiles: dataFiles.length,
    bytes: [...configFiles, ...indexFiles, ...dataFiles].reduce((sum, file) => sum + file.size, 0),
  },
  files: [...configFiles, ...indexFiles, ...dataFiles].map(({ path: filePath, size, mtimeMs }) => ({
    path: filePath,
    size,
    mtimeMs,
  })),
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)

console.log(`Prepared Reforged sandbox index: ${manifestPath}`)
console.log(`Install: ${manifest.installRoot}`)
console.log(`Build: ${manifest.build}`)
console.log(`Files indexed: ${manifest.files.length}`)
console.log(`Data referenced: ${(manifest.totals.bytes / 1073741824).toFixed(2)} GB`)
