import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const webRoot = path.join(root, '.codex_deps', 'warsmash-html', 'html', 'build', 'dist', 'webapp')
const port = Number(process.env.WARSMASH_PORT || 8090)

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.wasm': 'application/wasm',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.webp': 'image/webp',
}

if (!existsSync(webRoot)) {
  console.error('Warsmash web build not found. Run: npm run warsmash:build')
  process.exit(1)
}

const resolveRequestPath = (url) => {
  const parsed = new URL(url, `http://127.0.0.1:${port}`)
  let pathname = decodeURIComponent(parsed.pathname)
  if (pathname.endsWith('/')) pathname += 'index.html'

  const resolved = path.resolve(webRoot, pathname.replace(/^\/+/, ''))
  if (!resolved.startsWith(webRoot)) return null

  if (existsSync(resolved) && statSync(resolved).isDirectory()) {
    return path.join(resolved, 'index.html')
  }
  if (!path.extname(resolved) && existsSync(`${resolved}.html`)) {
    return `${resolved}.html`
  }
  return resolved
}

createServer((request, response) => {
  const filePath = resolveRequestPath(request.url || '/')

  response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
  response.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')

  if (!filePath || !existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Not found')
    return
  }

  const extension = path.extname(filePath).toLowerCase()
  response.writeHead(200, {
    'Cache-Control': 'no-cache',
    'Content-Type': mimeTypes[extension] || 'application/octet-stream',
  })
  createReadStream(filePath).pipe(response)
}).listen(port, '127.0.0.1', () => {
  console.log(`Warsmash web app serving at http://127.0.0.1:${port}/`)
  console.log(`Stage assets at http://127.0.0.1:${port}/assets/ and boot at http://127.0.0.1:${port}/play/`)
})
