// Resolves optimised images produced by `npm run media` (scripts/optimize-media.mjs).
// Usage in data files:  image: img('projects/wind-tunnel')
// That looks up src/assets/media/projects/wind-tunnel.webp (+ the .sm.webp thumbnail).

const files = import.meta.glob('../assets/media/**/*.webp', { eager: true, import: 'default' })

const lookup = {}
for (const [path, url] of Object.entries(files)) {
  const key = path.replace('../assets/media/', '').replace(/\.webp$/, '')
  lookup[key] = url
}

export function img(name, alt = '') {
  const large = lookup[name]
  if (!large) {
    if (import.meta.env.DEV) console.warn(`[media] Missing image "${name}". Did you add it to media/originals and run "npm run media"?`)
    return null
  }
  const small = lookup[`${name}.sm`] || large
  return { src: large, small, srcset: `${small} 760w, ${large} 1800w`, alt }
}

// All images in one folder, sorted by file name (01, 02, ...).
export function folder(dir, alt = '') {
  return Object.keys(lookup)
    .filter(k => k.startsWith(`${dir}/`) && !k.endsWith('.sm'))
    .sort()
    .map((k, i) => img(k, alt ? `${alt} — photo ${i + 1}` : ''))
}

// Videos: produced by `npm run videos` into public/videos/ (+ posters/), never bundled into the JS.
// Usage: video('oau-greenride-campus-demo', 'Caption shown under the video')
import manifest from '../assets/media/videos.json'

export function video(name, title = '') {
  const meta = manifest[name.replace(/\.mp4$/, '')]
  if (!meta) {
    if (import.meta.env.DEV) console.warn(`[media] Missing video "${name}". Put it in media/originals/videos and run "npm run videos".`)
    return null
  }
  const base = name.replace(/\.mp4$/, '')
  const m = Math.floor(meta.duration / 60), s = String(meta.duration % 60).padStart(2, '0')
  return {
    type: 'video',
    src: `/videos/${base}.mp4`,
    poster: `/videos/posters/${base}.jpg`,
    title,
    alt: title,
    duration: meta.duration,
    durationLabel: `${m}:${s}`,
    portrait: meta.height > meta.width,
    short: meta.duration <= 40, // short clips loop silently as previews in the gallery
  }
}
