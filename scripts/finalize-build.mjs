import { copyFileSync, existsSync } from 'node:fs'
import path from 'node:path'

const outDir = process.argv[2] || 'dist'
const appHtml = ['build-entry.html', 'app.html'].map((file) => path.resolve(outDir, file)).find(existsSync)
const indexHtml = path.resolve(outDir, 'index.html')

if (appHtml) {
  copyFileSync(appHtml, indexHtml)
}
