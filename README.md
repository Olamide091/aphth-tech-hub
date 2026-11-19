# African Pro-Humanity Tech Hub — website

Vue 3 + Vite + Tailwind CSS, with GSAP/ScrollTrigger and Lenis for animation.
No CMS, no admin and no database: **all content lives in the source code** and only people
with access to this code and the hosting account can change the website.

## Run it

```bash
npm install        # first time only
npm run dev        # local preview at http://localhost:5173
npm run build      # production build in dist/ (upload/deploy this)
```

## Where the content is

| What                                   | File                     |
|----------------------------------------|--------------------------|
| Projects                               | `src/data/projects.js`   |
| Gallery albums                         | `src/data/gallery.js`    |
| Founder, team members, founder message | `src/data/team.js`       |
| Services                               | `src/data/services.js`   |
| Hero text, stats, contact, WhatsApp    | `src/data/site.js`       |

## Adding a project

1. Put the photo in `media/originals/projects/` (e.g. `solar-dryer.jpg`).
2. Run `npm run media`. This makes small, fast WebP versions in `src/assets/media/`.
3. If there is a video, put the `.mp4` in `public/videos/` (see *Videos* below).
4. Open `src/data/projects.js`, copy the template at the bottom, fill it in:
   ```js
   image: img('projects/solar-dryer', 'What the photo shows'),
   video: video('solar-dryer.mp4'),
   featured: true,   // also show it in the big scroll story
   ```
Nothing else needs to change. Filters, cards, the detail view and the WhatsApp “Enquire” link all update automatically.

## Adding gallery photos

Create a folder such as `media/originals/gallery/my-event/` with photos named `01.jpg`, `02.jpg`, …,
run `npm run media`, then add an album entry in `src/data/gallery.js` using `folder('gallery/my-event')`.

## Videos

1. Put the raw video (any format, including iPhone `.mov`) in `media/originals/videos/`
   with a short name, e.g. `solar-dryer-demo.mp4`.
2. Run `npm run videos`. It converts it to a web-friendly MP4 (plays on every phone and browser),
   makes a cover image, and records its length. Output goes to `public/videos/`.
3. Use it in a project (`video: video('solar-dryer-demo', 'Caption')` in `src/data/projects.js`)
   or in a gallery album's `media` list in `src/data/gallery.js`.

Short clips (≤ 40 s) loop silently as previews in the gallery on desktop; every video plays with sound
and controls when clicked. Raw originals in `media/originals/videos/` are git-ignored (they are large);
keep a copy of them somewhere safe.

## Deployment (Vercel)

`vercel.json` configures the build (`npm run build` → `dist/`), sends unknown URLs to the site's own
404 page, and sets caching. The image/video tools are optional dependencies, so Vercel never needs them.

## Media originals

`media/originals/` holds the full-size source photos (never shipped to visitors).
`media/sanity-export-backup.json` is a backup of the content that used to live in the Sanity CMS.
