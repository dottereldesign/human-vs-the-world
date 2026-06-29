import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const clientRoot = path.join(root, '.codex_deps', 'wc3v', 'client')
const port = Number(process.env.WC3V_PORT || 8080)

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.gz': 'application/gzip',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.webm': 'video/webm',
}

if (!existsSync(clientRoot)) {
  console.error('wc3v client not found. Run: npm run wc3v:setup')
  process.exit(1)
}

const resolveRequestPath = (url) => {
  const parsed = new URL(url, `http://127.0.0.1:${port}`)
  const pathname = decodeURIComponent(parsed.pathname)
  const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '')
  const resolved = path.resolve(clientRoot, relative)

  if (!resolved.startsWith(clientRoot)) return null
  if (existsSync(resolved) && statSync(resolved).isDirectory()) {
    return path.join(resolved, 'index.html')
  }
  if (!path.extname(resolved) && existsSync(`${resolved}.html`)) {
    return `${resolved}.html`
  }
  return resolved
}

createServer((request, response) => {
  const requestUrl = request.url || '/'
  const parsedUrl = new URL(requestUrl, `http://127.0.0.1:${port}`)
  const filePath = resolveRequestPath(requestUrl)

  response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
  response.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')

  if (!filePath || !existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Not found')
    return
  }

  const extension = path.extname(filePath).toLowerCase()

  if (extension === '.html' && parsedUrl.searchParams.get('hvtw') === '1') {
    const html = readFileSync(filePath, 'utf8').replace(
      '</head>',
      `
    <style>
      body.hvtw-embed {
        margin: 0 !important;
        overflow: hidden !important;
        background: #050707 !important;
      }

      body.hvtw-embed .site-nav,
      body.hvtw-embed #match-header,
      body.hvtw-embed #player-status-wrapper,
      body.hvtw-embed #build-area,
      body.hvtw-embed #mega-play-overlay,
      body.hvtw-embed #event-feed,
      body.hvtw-embed #guide-hud,
      body.hvtw-embed #guide-player-pick,
      body.hvtw-embed #match-complete-banner,
      body.hvtw-embed #bottom-panel,
      body.hvtw-embed .bug-report-link {
        display: none !important;
      }

      body.hvtw-embed #app,
      body.hvtw-embed #content,
      body.hvtw-embed #gameplay-area,
      body.hvtw-embed #gameplay-row,
      body.hvtw-embed #map-container,
      body.hvtw-embed #main-wrapper {
        width: 100vw !important;
        height: 100vh !important;
        max-width: none !important;
        max-height: none !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
      }

      body.hvtw-embed #canvas-group {
        margin: auto !important;
      }
    </style>
    <script>
      (function () {
        window.ThreeMapRenderer = null;
        document.addEventListener('DOMContentLoaded', function () {
          document.body.classList.add('hvtw-embed');
          var attempts = 0;
          var timer = setInterval(function () {
            attempts += 1;
            if (!window.wc3v) return;
            try {
              if (window.wc3v.gameLoaded) {
                if (typeof window.wc3v.setLayoutMode === 'function') window.wc3v.setLayoutMode('replay');
                if (typeof window.wc3v.toggleMegaPlayButton === 'function') window.wc3v.toggleMegaPlayButton(false);
                if (typeof window.wc3v.play === 'function') window.wc3v.play();
                clearInterval(timer);
              }
            } catch (error) {
              console.warn('HVTW wc3v embed startup failed', error);
              clearInterval(timer);
            }
            if (attempts > 600) clearInterval(timer);
          }, 250);
        });
      })();
    </script>
  </head>`,
    )

    response.writeHead(200, {
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/html; charset=utf-8',
    })
    response.end(html)
    return
  }

  response.writeHead(200, {
    'Cache-Control': 'no-cache',
    'Content-Type': mimeTypes[extension] || 'application/octet-stream',
  })
  createReadStream(filePath).pipe(response)
}).listen(port, '127.0.0.1', () => {
  console.log(`wc3v client serving at http://127.0.0.1:${port}/`)
})
