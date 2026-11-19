// GALLERY ALBUMS
// Photos:  create media/originals/gallery/<folder>/ with 01.jpg, 02.jpg, … then run `npm run media`
//          and use ...folder('gallery/<folder>', 'Alt text').
// Videos:  put the file in media/originals/videos/, run `npm run videos`,
//          then add video('<file-name>', 'Caption') to an album's media list.
import { folder, video } from '@/lib/media'

export const galleryIntro = {
  eyebrow: 'Our Activities',
  title: 'Gallery',
  body: 'Moments from our workshops, fabrication labs, and events.',
}

export const albums = [
  {
    id: 'independence-day-book-launch',
    title: 'Nigeria @ 66 Independence Day Celebration & Book Launch',
    description: 'Independence Day celebration and launch of “66 Years of Nigeria’s Independence: Are We Really Free?” by Prof. (Engr.) Adam Olatunji Muritala.',
    media: folder('gallery/independence-day', 'Nigeria @ 66 Independence Day & Book Launch'),
  },
  {
    id: 'talks-presentations',
    title: 'Talks & Presentations',
    description: 'Prof. Adam Olatunji Muritala presenting “The African Genius Engineering Kit and OAU at 65: A Revolutionary Model for Sustainable University Funding in Africa”.',
    media: [
      video('founder-presentation-oau-at-65', 'The African Genius Engineering Kit and OAU at 65 — presentation by Prof. Adam Olatunji Muritala'),
    ],
  },
  {
    id: 'engineering-office-workspace',
    title: 'Engineering Office & Workspace',
    description: 'Our engineering workspace where design, development, and prototype testing take place.',
    media: folder('gallery/engineering-office', 'Engineering office and workspace'),
  },
  {
    id: 'app-launch-event',
    title: 'App Launch Event',
    description: 'Highlights from our official app and book launch event, showcasing innovation, collaboration, and community engagement.',
    media: folder('gallery/app-launch', 'App launch event'),
  },
  {
    id: 'autocad-product-design',
    title: 'AutoCAD & Product Design',
    description: 'A collection of precision-designed components and functional prototypes created using AutoCAD and modern engineering tools. These designs demonstrate practical innovation, product development, and real-world problem solving.',
    media: [
      video('prototypes-showcase', 'Prototype showcase'),
      ...folder('gallery/autocad-design', 'AutoCAD and product design'),
      video('gear-train-demo-1', 'Gear train in motion'),
      video('four-bar-linkage', 'Four-bar linkage in motion'),
      video('gear-train-demo-2', 'Gear train in motion — close-up'),
      video('the-librarian-stand', '“The Librarian” stand — presented by the Department of Mechanical Engineering'),
    ].filter(Boolean),
  },
].map(a => ({ ...a, media: a.media.filter(Boolean) }))
