# African Pro Humanity Tech Hub — Setup Guide

## Project Overview
Vue 3 + Tailwind CSS website for APHTH.
Phase 1: Frontend UI only.

---

## STEP-BY-STEP SETUP IN VS CODE

### STEP 1 — Install Node.js (if not installed)
1. Go to https://nodejs.org
2. Download the **LTS** version (Long Term Support)
3. Install it (click Next through all steps)
4. Verify: open VS Code Terminal and type:
   ```
   node --version
   npm --version
   ```
   You should see version numbers.

---

### STEP 2 — Open VS Code and the Project Folder
1. Open VS Code
2. Go to **File → Open Folder**
3. Navigate to where you saved this project (`african-pro-humanity-tech-hub/`)
4. Click **Open**

---

### STEP 3 — Open the Terminal in VS Code
- Press **Ctrl + ` ** (backtick key, top-left of keyboard)
- Or go to **Terminal → New Terminal**

---

### STEP 4 — Install All Dependencies
In the terminal, type:
```bash
npm install
```
This reads `package.json` and installs:
- Vue 3
- Vue Router
- Vite (build tool)
- Tailwind CSS
- PostCSS + Autoprefixer

Wait until it says "added X packages".

---

### STEP 5 — Run the Project
```bash
npm run dev
```

You'll see something like:
```
  VITE v5.x.x  ready in 300ms
  ➜  Local:   http://localhost:5173/
```

Open your browser and go to: **http://localhost:5173**

Your website is live! 🎉

---

### STEP 6 — Edit Content
Replace placeholder content with your real data:

| File | What to change |
|------|---------------|
| `src/components/HeroSection.vue` | Hero image, stats, text |
| `src/components/TeamSection.vue` | CEO name, bio, photo, team members |
| `src/components/ProjectsSection.vue` | Project names, descriptions, images |
| `src/components/GalleryGrid.vue` | Gallery image `src` values |
| `src/components/ContactSection.vue` | Email, phone, address, social links |
| `src/components/FooterSection.vue` | Footer contact info |

---

## FILE STRUCTURE EXPLAINED

```
african-pro-humanity-tech-hub/
├── index.html                    ← Main HTML entry point
├── vite.config.js                ← Vite build tool config
├── tailwind.config.js            ← Tailwind design tokens (colors, fonts)
├── postcss.config.js             ← PostCSS config (required by Tailwind)
├── package.json                  ← Project dependencies
└── src/
    ├── main.js                   ← App entry: registers Vue + Router
    ├── App.vue                   ← Root component (NavBar + page + Footer)
    ├── style.css                 ← Global styles + Tailwind directives
    ├── views/
    │   └── HomeView.vue          ← The home page (composes all sections)
    └── components/
        ├── NavBar.vue            ← Top navigation bar (sticky + responsive)
        ├── HeroSection.vue       ← Full-screen hero with image + stats
        ├── ServicesSection.vue   ← Services overview (3 cards)
        ├── ServiceCard.vue       ← Reusable service card component
        ├── ProjectsSection.vue   ← Projects grid with filter tabs + modal
        ├── ProjectCard.vue       ← Reusable project card component
        ├── GalleryGrid.vue       ← Photo gallery with lightbox
        ├── TeamSection.vue       ← CEO highlight + team grid
        ├── TeamCard.vue          ← Reusable team member card
        ├── ContactSection.vue    ← Contact form + info
        └── FooterSection.vue     ← Site footer
```

---

## HOW TO ADD YOUR OWN IMAGES

### Method A — Put images in `/public` folder
1. Copy your image into the `/public` folder (e.g., `/public/images/hero.jpg`)
2. In the component, reference it as: `src="/images/hero.jpg"`

### Method B — Import into `src/assets`
1. Copy image to `src/assets/images/hero.jpg`
2. In the component:
   ```vue
   <script setup>
   import heroBg from '@/assets/images/hero.jpg'
   </script>
   <img :src="heroBg" />
   ```

---

## USEFUL COMMANDS

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

## PHASE ROADMAP

- ✅ **Phase 1** — Frontend UI (this phase)
- 🔜 **Phase 2** — Admin Dashboard
- 🔜 **Phase 3** — Firebase Integration (Auth, Firestore, Storage)

---

## COLORS REFERENCE (Tailwind classes)

| Class | Color |
|-------|-------|
| `bg-brand-gold` | #C9922A (main gold) |
| `bg-brand-black` | #0A0A0A (deep black) |
| `bg-brand-charcoal` | #1A1A1A (card backgrounds) |
| `bg-brand-dark` | #111827 (section backgrounds) |
| `bg-brand-cream` | #F5EDD6 (light text) |
| `bg-brand-green` | #1A3A2A (image placeholders) |

---

Need help? Contact your developer or refer to:
- Vue docs: https://vuejs.org
- Tailwind docs: https://tailwindcss.com
- Vite docs: https://vitejs.dev
