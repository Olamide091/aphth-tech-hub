// Converts every video in media/originals/videos/ into a web-ready MP4 in public/videos/,
// plus a cover image in public/videos/posters/. Run with:  npm run videos
//
// • Output: H.264 + AAC MP4 (plays on every phone and browser, including iPhone .mov sources),
//   max 1280px wide / 720px tall, "faststart" so playback begins before the file finishes downloading.
// • Cover image: taken at 2 s by default — set a different second in POSTER_AT below.
// • Writes src/assets/media/videos.json (duration + size) which the site reads.
// Originals are never modified. Already-converted videos are skipped.
import { readdir, mkdir, stat, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const ffmpeg = require('ffmpeg-static')
const ffprobe = require('ffprobe-static').path

const SRC = 'media/originals/videos'
const OUT = 'public/videos'
const POSTERS = 'public/videos/posters'
const MANIFEST = 'src/assets/media/videos.json'
const VIDEO = /\.(mp4|mov|m4v|webm|avi|mkv|3gp)$/i

// Second of the video to use as its cover image (default 2).
const POSTER_AT = {
  'oau-greenride-campus-demo': 3,
  'founder-presentation-oau-at-65': 20,
}

const fresh = async (src, dest) => {
  try { return (await stat(dest)).mtimeMs >= (await stat(src)).mtimeMs } catch { return false }
}

await mkdir(POSTERS, { recursive: true })
const manifest = {}
let made = 0

for (const file of (await readdir(SRC)).filter(f => VIDEO.test(f)).sort()) {
  const name = file.replace(VIDEO, '')
  const src = path.join(SRC, file)
  const mp4 = path.join(OUT, `${name}.mp4`)
  const jpg = path.join(POSTERS, `${name}.jpg`)

  if (!(await fresh(src, mp4))) {
    console.log(`Converting ${file} …`)
    execFileSync(ffmpeg, [
      '-v', 'error', '-y', '-i', src,
      '-vf', "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2",
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-r', '30',
      '-c:a', 'aac', '-b:a', '96k', '-ac', '2',
      '-movflags', '+faststart',
      mp4,
    ], { stdio: 'inherit' })
    made++
  }
  if (!(await fresh(src, jpg))) {
    execFileSync(ffmpeg, ['-v', 'error', '-y', '-ss', String(POSTER_AT[name] ?? 2), '-i', mp4, '-frames:v', '1', '-q:v', '4', jpg])
  }

  const probe = JSON.parse(execFileSync(ffprobe, ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height:format=duration', '-of', 'json', mp4]))
  const { width, height } = probe.streams[0]
  manifest[name] = {
    duration: Math.round(Number(probe.format.duration)),
    width, height,
    sizeMB: Number(((await stat(mp4)).size / 1048576).toFixed(1)),
  }
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
console.log(`Videos: ${made} converted, ${Object.keys(manifest).length} total. Manifest → ${MANIFEST}`)
console.table(manifest)
