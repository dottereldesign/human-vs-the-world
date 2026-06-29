import { defineConfig } from 'vite'
import { createReadStream, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const warsmashRoot = path.resolve('.codex_deps/warsmash-html/html/build/dist/webapp')
const reforgedSandboxRoot = path.resolve('.wc3-assets/reforged')
const reforgedSandboxManifestPath = path.join(reforgedSandboxRoot, 'manifest.json')
const localWc3Installs = [
  {
    id: 'legacy',
    label: 'Legacy MPQ',
    roots: ['/Applications/Warcraft III (Legacy)', 'C:\\Program Files (x86)\\Warcraft III'],
    source: 'legacy-mpq',
    browserEngine: true,
  },
  {
    id: 'reforged',
    label: 'Reforged 2.x',
    roots: ['/Applications/Warcraft III', 'C:\\Program Files\\Warcraft III'],
    source: 'reforged-casc',
    browserEngine: false,
  },
]
const warsmashPrefixes = [
  '/play',
  '/assets',
  '/_astro',
  '/scripts',
  '/WEB-INF',
  '/app.js',
  '/bg.png',
  '/CHANGELOG.md',
  '/engine-worker.js',
  '/engine-worker-boot.js',
  '/goblin-tinker.webp',
  '/worker.js',
  '/worker-boot.js',
]

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.wasm': 'application/wasm',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.webp': 'image/webp',
}

const resolveWarsmashPath = (requestUrl) => {
  const url = new URL(requestUrl, 'http://127.0.0.1')
  const pathname = decodeURIComponent(url.pathname)
  if (!warsmashPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return null
  }

  let relativePath = pathname.replace(/^\/+/, '')
  if (!relativePath || relativePath.endsWith('/')) relativePath += 'index.html'

  const filePath = path.resolve(warsmashRoot, relativePath)
  if (!filePath.startsWith(warsmashRoot)) return null

  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    return path.join(filePath, 'index.html')
  }
  if (!path.extname(filePath) && existsSync(`${filePath}.html`)) {
    return `${filePath}.html`
  }
  return filePath
}

const toPosixPath = (value) => value.split(path.sep).join('/')

const findLocalWc3Install = (edition = 'legacy') => {
  const preferred = localWc3Installs.find((install) => install.id === edition) || localWc3Installs[0]
  const root = preferred.roots.find((candidate) => existsSync(candidate) && statSync(candidate).isDirectory())
  return root ? { ...preferred, root } : { ...preferred, root: null }
}

const readBuildInfo = (root) => {
  if (!root) return null
  const buildInfoPath = path.join(root, '.build.info')
  if (!existsSync(buildInfoPath)) return null
  try {
    const text = readFileSync(buildInfoPath, 'utf8')
    const line = text
      .split(/\r?\n/)
      .find((candidate) => /\d+\.\d+/.test(candidate))
    return line?.match(/\d+\.\d+(?:\.\d+)*(?:-[a-z0-9-]+)?/i)?.[0] || null
  } catch {
    return null
  }
}

const readReforgedSandboxManifest = () => {
  if (!existsSync(reforgedSandboxManifestPath)) return null
  try {
    return JSON.parse(readFileSync(reforgedSandboxManifestPath, 'utf8'))
  } catch {
    return null
  }
}

const prepareReforgedSandbox = () => {
  const install = findLocalWc3Install('reforged')
  if (!install.root) throw new Error('Reforged install not found.')

  const dataRoot = path.join(install.root, 'Data')
  for (const required of ['config', 'indices', 'data']) {
    const requiredPath = path.join(dataRoot, required)
    if (!existsSync(requiredPath) || !statSync(requiredPath).isDirectory()) {
      throw new Error(`Missing Reforged CASC folder: ${requiredPath}`)
    }
  }

  const files = []
  const walk = (directory, relativeBase) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name)
      const relative = path.posix.join(relativeBase, entry.name)
      if (entry.isDirectory()) {
        walk(absolute, relative)
      } else if (entry.isFile()) {
        const fileStat = statSync(absolute)
        files.push({
          path: relative,
          size: fileStat.size,
          mtimeMs: Math.round(fileStat.mtimeMs),
        })
      }
    }
  }

  walk(path.join(dataRoot, 'config'), 'Data/config')
  walk(path.join(dataRoot, 'indices'), 'Data/indices')
  walk(path.join(dataRoot, 'data'), 'Data/data')
  files.sort((a, b) => a.path.localeCompare(b.path))
  mkdirSync(reforgedSandboxRoot, { recursive: true })
  const manifest = {
    schemaVersion: 1,
    createdAt: new Date().toISOString(),
    installRoot: install.root,
    sandboxRoot: reforgedSandboxRoot,
    mode: 'indexed-readonly',
    build: readBuildInfo(install.root),
    totals: {
      configFiles: files.filter((file) => file.path.startsWith('Data/config/')).length,
      indexFiles: files.filter((file) => file.path.startsWith('Data/indices/')).length,
      dataFiles: files.filter((file) => file.path.startsWith('Data/data/')).length,
      bytes: files.reduce((sum, file) => sum + file.size, 0),
    },
    files,
  }
  writeFileSync(reforgedSandboxManifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  return manifest
}

const resolveReforgedSandboxAsset = (relativePath) => {
  const manifest = readReforgedSandboxManifest()
  if (!manifest?.installRoot || !Array.isArray(manifest.files)) return null
  const asset = manifest.files.find((file) => file.path === relativePath)
  if (!asset) return null
  const absolute = path.resolve(manifest.installRoot, relativePath)
  const root = path.resolve(manifest.installRoot)
  if (!absolute.startsWith(root)) return null
  return absolute
}

const listLocalWc3Assets = (edition = 'legacy') => {
  const install = findLocalWc3Install(edition)
  const root = install.root
  if (!root) return { ...install, detected: false, files: [], fileCount: 0, mpqCount: 0, mapCount: 0, totalBytes: 0 }

  const files = []
  const include = (filePath) => /\.(mpq|w3x|w3m)$/i.test(filePath)
  const walk = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name)
      if (entry.isDirectory()) {
        if (entry.name === '.battle.net' || entry.name === '_retail_' || entry.name.endsWith('.app')) continue
        walk(absolute)
      } else if (entry.isFile() && include(absolute)) {
        const size = statSync(absolute).size
        files.push({
          path: toPosixPath(path.relative(root, absolute)),
          size,
        })
      }
    }
  }

  walk(root)
  files.sort((a, b) => a.path.localeCompare(b.path))
  const mpqCount = files.filter((file) => file.path.toLowerCase().endsWith('.mpq')).length
  const mapCount = files.filter((file) => /\.(w3x|w3m)$/i.test(file.path)).length
  return {
    id: install.id,
    label: install.label,
    root,
    source: install.source,
    detected: true,
    browserEngine: install.browserEngine && mpqCount > 0,
    build: readBuildInfo(root),
    files,
    fileCount: files.length,
    mpqCount,
    mapCount,
    totalBytes: files.reduce((sum, file) => sum + file.size, 0),
  }
}

const resolveLocalWc3Asset = (relativePath, edition = 'legacy') => {
  const manifest = listLocalWc3Assets(edition)
  if (!manifest) return null
  const asset = manifest.files.find((file) => file.path === relativePath)
  if (!asset) return null

  const absolute = path.resolve(manifest.root, relativePath)
  const root = path.resolve(manifest.root)
  if (!absolute.startsWith(root)) return null
  return absolute
}

export default defineConfig({
  base: './',
  server: {
    watch: {
      ignored: ['**/.codex_deps/**'],
    },
  },
  plugins: [
    {
      name: 'serve-warsmash-webapp',
      configureServer(server) {
        server.middlewares.use((request, response, next) => {
          const requestUrl = request.url || '/'
          const parsedUrl = new URL(requestUrl, 'http://127.0.0.1')

          if (parsedUrl.pathname === '/wc3-local-assets/manifests') {
            const manifests = localWc3Installs.map((install) => {
              const manifest = listLocalWc3Assets(install.id)
              const { files, ...summary } = manifest
              return summary
            })
            response.writeHead(200, {
              'Cache-Control': 'no-cache',
              'Content-Type': 'application/json; charset=utf-8',
            })
            response.end(JSON.stringify({ manifests }))
            return
          }

          if (parsedUrl.pathname === '/wc3-reforged-sandbox/prepare') {
            try {
              const manifest = prepareReforgedSandbox()
              const { files, ...summary } = manifest
              response.writeHead(200, {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json; charset=utf-8',
              })
              response.end(JSON.stringify(summary))
            } catch (error) {
              response.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
              response.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
            }
            return
          }

          if (parsedUrl.pathname === '/wc3-reforged-sandbox/manifest') {
            const manifest = readReforgedSandboxManifest()
            if (!manifest) {
              response.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' })
              response.end(JSON.stringify({ error: 'Reforged sandbox has not been prepared yet.' }))
              return
            }
            if (parsedUrl.searchParams.get('full') === '1') {
              response.writeHead(200, {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json; charset=utf-8',
              })
              response.end(JSON.stringify(manifest))
              return
            }
            const { files, ...summary } = manifest
            response.writeHead(200, {
              'Cache-Control': 'no-cache',
              'Content-Type': 'application/json; charset=utf-8',
            })
            response.end(JSON.stringify({ ...summary, fileCount: files.length }))
            return
          }

          if (parsedUrl.pathname === '/wc3-reforged-sandbox/file') {
            const relativePath = parsedUrl.searchParams.get('path') || ''
            const filePath = relativePath === '.build.info'
              ? path.resolve(findLocalWc3Install('reforged').root || '', '.build.info')
              : resolveReforgedSandboxAsset(relativePath)
            if (!filePath || !existsSync(filePath) || !statSync(filePath).isFile()) {
              response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
              response.end('Reforged sandbox asset not found')
              return
            }
            const fileSize = statSync(filePath).size
            const offset = Number(parsedUrl.searchParams.get('offset') || 0)
            const lengthParam = parsedUrl.searchParams.get('length')
            const length = lengthParam == null ? fileSize - offset : Number(lengthParam)
            if (!Number.isFinite(offset) || !Number.isFinite(length) || offset < 0 || length < 0 || offset + length > fileSize) {
              response.writeHead(416, { 'Content-Type': 'text/plain; charset=utf-8' })
              response.end('Invalid Reforged sandbox byte range')
              return
            }
            response.writeHead(200, {
              'Cache-Control': 'no-cache',
              'Content-Length': String(length),
              'Content-Type': mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
            })
            createReadStream(filePath, { start: offset, end: offset + length - 1 }).pipe(response)
            return
          }

          if (parsedUrl.pathname === '/wc3-local-assets/manifest') {
            const manifest = listLocalWc3Assets(parsedUrl.searchParams.get('edition') || 'legacy')
            if (!manifest || !manifest.detected || manifest.fileCount === 0 || manifest.mpqCount === 0) {
              response.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' })
              response.end(JSON.stringify({ error: 'No local MPQ-style Warcraft III install was found.' }))
              return
            }
            if (!manifest.browserEngine) {
              response.writeHead(409, { 'Content-Type': 'application/json; charset=utf-8' })
              response.end(JSON.stringify({ error: 'This detected Warcraft III install is Reforged/CASC. The embedded Warsmash web build currently needs legacy MPQ assets.' }))
              return
            }
            response.writeHead(200, {
              'Cache-Control': 'no-cache',
              'Content-Type': 'application/json; charset=utf-8',
            })
            response.end(JSON.stringify(manifest))
            return
          }

          if (parsedUrl.pathname === '/wc3-local-assets/file') {
            const relativePath = parsedUrl.searchParams.get('path') || ''
            const filePath = resolveLocalWc3Asset(relativePath, parsedUrl.searchParams.get('edition') || 'legacy')
            if (!filePath || !existsSync(filePath) || !statSync(filePath).isFile()) {
              response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
              response.end('Local Warcraft III asset not found')
              return
            }
            response.writeHead(200, {
              'Cache-Control': 'no-cache',
              'Content-Length': String(statSync(filePath).size),
              'Content-Type': mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
            })
            createReadStream(filePath).pipe(response)
            return
          }

          const filePath = resolveWarsmashPath(requestUrl)
          if (!filePath) {
            next()
            return
          }

          if (!existsSync(filePath) || !statSync(filePath).isFile()) {
            response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
            response.end('Warsmash file not found. Run: npm run warsmash:build')
            return
          }

          const extension = path.extname(filePath).toLowerCase()
          response.writeHead(200, {
            'Cache-Control': 'no-cache',
            'Content-Type': mimeTypes[extension] || 'application/octet-stream',
          })
          createReadStream(filePath).pipe(response)
        })
      },
    },
  ],
})
