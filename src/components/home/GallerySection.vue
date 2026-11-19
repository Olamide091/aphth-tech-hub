<!--
  Gallery: albums laid out on one long horizontal track.
  Desktop: vertical scrolling drives the track sideways (pinned).
  Touch / small screens / reduced motion: native horizontal swipe with snap points.
-->
<template>
  <section id="gallery" ref="root" class="relative overflow-hidden bg-ink-900 pt-24 md:pt-36">
    <div class="wrap">
      <div class="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-7">
          <p class="eyebrow mb-6">{{ galleryIntro.eyebrow }}</p>
          <h2 v-split class="h-section">Moments &amp; <span class="accent">Milestones</span></h2>
        </div>
        <p class="lede lg:col-span-5" v-reveal="0.1">{{ galleryIntro.body }}</p>
      </div>
    </div>

    <p class="wrap mt-8 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-haze lg:hidden" aria-hidden="true">
      Swipe to explore <Icon name="arrow" class="h-3.5 w-3.5 text-green-glow" />
    </p>
    <div ref="pin" class="relative mt-5 lg:mt-0 lg:flex lg:h-[100svh] lg:items-center">
      <div
        ref="viewport"
        :class="['w-full', pinned ? 'overflow-visible' : 'snap-x snap-mandatory overflow-x-auto overscroll-x-contain pb-6 [scrollbar-width:none]']"
        tabindex="0"
        aria-label="Photo and video albums — scroll horizontally"
      >
        <div ref="track" class="flex w-max items-stretch gap-6 px-4 sm:px-6 lg:gap-10 lg:px-10">
          <template v-for="(album, a) in albums" :key="album.id">
            <!-- Album title card -->
            <div class="relative isolate flex w-[78vw] max-w-[24rem] flex-none snap-start flex-col justify-end overflow-hidden rounded-[28px] border border-line bg-ink-800 p-7 sm:w-[22rem] lg:h-[68vh] lg:w-[26rem] lg:p-9">
              <img v-if="cover(album)" :src="cover(album)" alt="" loading="lazy" class="absolute inset-0 -z-10 h-full w-full scale-110 object-cover opacity-30 blur-md" />
              <div class="absolute inset-0 -z-10 bg-gradient-to-t from-ink-900 via-ink-900/85 to-ink-900/40"></div>
              <span class="font-mono text-xs text-green-glow">{{ String(a + 1).padStart(2, '0') }} / {{ String(albums.length).padStart(2, '0') }}</span>
              <h3 class="mt-auto pt-16 font-display text-3xl font-semibold leading-[1.05] tracking-tight text-paper lg:text-4xl">{{ album.title }}</h3>
              <p class="mt-4 text-[15px] leading-relaxed text-mist">{{ album.description }}</p>
              <p class="mt-6 font-mono text-[10.5px] uppercase tracking-[0.2em] text-haze">{{ countLabel(album) }}</p>
            </div>

            <!-- Media: two-row mosaic (a single item gets one tall tile) -->
            <div class="grid flex-none snap-start self-center auto-cols-max grid-flow-col grid-rows-2 gap-3 lg:h-[68vh] lg:gap-4">
              <button
                v-for="(m, i) in album.media" :key="m.src"
                type="button"
                :class="[
                  'gallery-tile group relative overflow-hidden rounded-[22px] bg-ink-800',
                  i % 3 === 0 || album.media.length === 1
                    ? 'row-span-2 h-[min(62vw,22rem)] w-[min(52vw,18rem)] lg:h-full lg:w-[40vh]'
                    : 'h-[calc(min(62vw,22rem)/2-0.375rem)] w-[min(44vw,15rem)] lg:h-[calc(34vh-0.5rem)] lg:w-[30vh]',
                ]"
                :aria-label="m.type === 'video' ? `Play video: ${m.title}` : `Open ${m.alt}`"
                @click="openLightbox(a, i)"
              >
                <template v-if="m.type === 'video'">
                  <!-- Short clips loop silently as previews on desktop; otherwise show the cover image -->
                  <video
                    v-if="m.short && previews"
                    class="tile-preview h-full w-full object-cover"
                    :poster="m.poster" :data-src="m.src"
                    muted loop playsinline preload="none" aria-hidden="true"
                  ></video>
                  <img v-else :src="m.poster" alt="" loading="lazy" decoding="async" class="h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-110" />
                  <span class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink-950/25 transition-colors duration-500 group-hover:bg-ink-950/10">
                    <span class="flex h-14 w-14 items-center justify-center rounded-full bg-green-glow text-ink-950 shadow-[0_0_0_8px_rgba(61,220,151,0.18)] transition-transform duration-500 ease-out-expo group-hover:scale-110">
                      <Icon name="play" class="ml-0.5 h-6 w-6" />
                    </span>
                  </span>
                  <span class="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-paper">
                    <span class="truncate rounded-full bg-ink-950/70 px-2.5 py-1 backdrop-blur">Video</span>
                    <span class="rounded-full bg-ink-950/70 px-2.5 py-1 tabular-nums backdrop-blur">{{ m.durationLabel }}</span>
                  </span>
                </template>
                <template v-else>
                  <img :src="m.small" :alt="m.alt" loading="lazy" decoding="async" class="h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-110" />
                  <span class="absolute inset-0 flex items-end bg-gradient-to-t from-ink-950/70 via-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <Icon name="expand" class="h-5 w-5 text-paper" />
                  </span>
                </template>
              </button>
            </div>
          </template>
          <div class="w-px flex-none lg:w-[10vw]" aria-hidden="true"></div>
        </div>
      </div>

      <!-- Progress -->
      <div class="wrap absolute inset-x-0 bottom-10 hidden lg:block" aria-hidden="true">
        <div class="h-px w-full bg-white/10"><div ref="progress" class="h-full origin-left scale-x-0 bg-green-glow"></div></div>
      </div>
    </div>
    <div class="h-24 lg:h-0"></div>

    <Lightbox :album="lb.album" :index="lb.index" @close="lb.album = null" @nav="lb.index = $event" />
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { albums, galleryIntro } from '@/data/gallery'
import { gsap } from '@/lib/motion'
import Lightbox from '@/components/ui/Lightbox.vue'
import Icon from '@/components/ui/Icon.vue'

const root = ref(), pin = ref(), viewport = ref(), track = ref(), progress = ref()
const pinned = ref(false)
const lb = reactive({ album: null, index: 0 })

function openLightbox(a, i) { lb.album = albums[a]; lb.index = i }

const cover = album => { const m = album.media[0]; return m ? (m.type === 'video' ? m.poster : m.small) : null }
function countLabel(album) {
  const v = album.media.filter(m => m.type === 'video').length, p = album.media.length - v
  return [p && `${p} photo${p > 1 ? 's' : ''}`, v && `${v} video${v > 1 ? 's' : ''}`].filter(Boolean).join(' · ')
}

// Silent looping previews only where they're cheap and welcome: pointer devices, motion allowed.
const previews = ref(false)
let io
function watchPreviews() {
  io = new IntersectionObserver(entries => entries.forEach(({ target: v, isIntersecting }) => {
    if (isIntersecting) {
      if (!v.src) v.src = v.dataset.src
      v.play().catch(() => {})
    } else v.pause()
  }), { threshold: 0.35 })
  root.value.querySelectorAll('.tile-preview').forEach(v => io.observe(v))
}

let mm
onMounted(() => {
  previews.value = matchMedia('(hover: hover) and (min-width: 768px) and (prefers-reduced-motion: no-preference)').matches
  if (previews.value) nextTick(watchPreviews)
  mm = gsap.matchMedia()
  mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference) and (hover: hover)', () => {
    pinned.value = true
    const distance = () => track.value.scrollWidth - window.innerWidth
    const tween = gsap.to(track.value, {
      x: () => -distance(), ease: 'none',
      scrollTrigger: {
        trigger: pin.value, start: 'top top', end: () => `+=${distance()}`,
        pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate: self => gsap.set(progress.value, { scaleX: self.progress }),
      },
    })
    // Tiles drift slightly against the track for depth.
    gsap.utils.toArray('.gallery-tile img', root.value).forEach(img => {
      gsap.fromTo(img, { xPercent: -6, scale: 1.12 }, {
        xPercent: 6, ease: 'none',
        scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
      })
    })
    return () => { pinned.value = false }
  })
})
onUnmounted(() => { mm?.revert(); io?.disconnect() })
</script>
