// Converts everything in media/originals/ into web-ready WebP files in src/assets/media/.
// Run with:  npm run media
//
// Each image gets two sizes:  <name>.webp (large, max 1800px) and <name>.sm.webp (max 760px).
// Originals are never modified. Files that are already up to date are skipped.
import { readdir, mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'media/originals'
const OUT = 'src/assets/media'
const SIZES = [
  { suffix: '',    width: 1800, quality: 78 },
  { suffix: '.sm', width: 760,  quality: 72 },
]
const IMAGE = /\.(jpe?g|png|webp|avif|tiff?)$/i

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else if (IMAGE.test(entry.name)) yield full
  }
}

async function isFresh(src, dest) {
  try { return (await stat(dest)).mtimeMs >= (await stat(src)).mtimeMs } catch { return false }
}

let made = 0, skipped = 0
for await (const file of walk(SRC)) {
  const rel  = path.relative(SRC, file)
  const base = rel.replace(IMAGE, '')
  await mkdir(path.join(OUT, path.dirname(rel)), { recursive: true })

  for (const s of SIZES) {
    const dest = path.join(OUT, `${base}${s.suffix}.webp`)
    if (await isFresh(file, dest)) { skipped++; continue }
    await sharp(file)
      .rotate() // respect camera orientation
      .resize({ width: s.width, withoutEnlargement: true })
      .webp({ quality: s.quality })
      .toFile(dest)
    made++
  }
}
console.log(`Media optimised: ${made} written, ${skipped} already up to date.`)
