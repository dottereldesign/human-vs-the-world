import { copyFileSync, existsSync } from 'node:fs'
import path from 'node:path'

const outDir = process.argv[2] || 'dist'
const appHtml = path.resolve(outDir, 'app.html')
const indexHtml = path.resolve(outDir, 'index.html')

if (existsSync(appHtml)) {
  copyFileSync(appHtml, indexHtml)
}
