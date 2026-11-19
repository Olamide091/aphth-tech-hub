<!--
  Cinematic scroll story for `featured: true` projects.
  Desktop: the section pins; as you scroll, each project's image swings in on a 3D turntable
  while its text swaps beside it. Mobile / reduced motion: a simple stacked list.
-->
<template>
  <section ref="root" class="relative bg-ink-900" aria-labelledby="story-title">
    <div class="wrap pt-24 md:pt-36">
      <p class="eyebrow mb-6">In the spotlight</p>
      <h2 id="story-title" v-split class="h-section max-w-4xl">Built here. <span class="accent">Engineered</span> for the world.</h2>
    </div>

    <!-- Pinned stage (desktop) -->
    <div ref="pin" class="story-pin relative hidden h-[100svh] lg:block">
      <div class="wrap grid h-full grid-cols-12 items-center gap-10">
        <!-- Text column -->
        <div class="relative col-span-5 h-[60vh]">
          <article
            v-for="(p, i) in featured" :key="p.id"
            class="story-text absolute inset-0 flex flex-col justify-center"
            :aria-hidden="i !== current"
          >
            <div class="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-haze">
              <span class="text-green-glow">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="h-px w-10 bg-white/20"></span>
              <span>{{ p.category }}</span>
            </div>
            <h3 class="mt-6 font-display text-[clamp(2rem,3.4vw,3.4rem)] font-semibold leading-[1.02] tracking-tight text-paper">{{ p.shortTitle || p.title }}</h3>
            <p class="mt-6 max-w-md text-[17px] leading-relaxed text-mist">{{ p.summary }}</p>
            <div class="mt-9 flex flex-wrap gap-3">
              <button type="button" class="btn-primary btn-sm" :tabindex="i === current ? 0 : -1" @click="openProject(p)">
                View project <Icon name="arrow-up-right" class="h-4 w-4" />
              </button>
              <button v-if="p.video" type="button" class="btn-ghost btn-sm" :tabindex="i === current ? 0 : -1" @click="openProject(p, { play: true })">
                <Icon name="play" class="h-3.5 w-3.5 text-green-glow" /> Watch video · {{ p.video.durationLabel }}
              </button>
              <a :href="enquire(p)" target="_blank" rel="noopener" class="btn-ghost btn-sm" :tabindex="i === current ? 0 : -1">
                <Icon name="whatsapp" class="h-4 w-4" /> Enquire
              </a>
            </div>
          </article>
        </div>

        <!-- Visual column -->
        <div class="col-span-7 [perspective:1600px]">
          <div class="relative aspect-[4/3] w-full [transform-style:preserve-3d]">
            <figure
              v-for="(p, i) in featured" :key="p.id"
              class="story-img absolute inset-0 overflow-hidden rounded-[28px] border border-white/10 bg-ink-800 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)] [backface-visibility:hidden]"
            >
              <img
                v-if="p.image" :src="p.image.src" :srcset="p.image.srcset" sizes="(min-width:1024px) 55vw, 100vw"
                :alt="p.image.alt" loading="lazy" decoding="async" class="h-full w-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent"></div>
            </figure>
          </div>
          <!-- Progress -->
          <div class="mt-8 flex gap-2" aria-hidden="true">
            <span v-for="(p, i) in featured" :key="p.id" class="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
              <span class="story-bar block h-full origin-left scale-x-0 bg-green-glow"></span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Stacked (mobile / tablet / reduced motion) -->
    <div class="wrap space-y-16 pb-24 pt-14 lg:hidden">
      <article v-for="(p, i) in featured" :key="p.id" v-reveal>
        <figure class="overflow-hidden rounded-3xl border border-white/10">
          <img v-if="p.image" :src="p.image.small" :alt="p.image.alt" loading="lazy" decoding="async" class="aspect-[4/3] w-full object-cover" />
        </figure>
        <div class="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-haze">
          <span class="text-green-glow">{{ String(i + 1).padStart(2, '0') }}</span> · {{ p.category }}
        </div>
        <h3 class="mt-3 font-display text-3xl font-semibold tracking-tight text-paper">{{ p.shortTitle || p.title }}</h3>
        <p class="mt-3 leading-relaxed text-mist">{{ p.summary }}</p>
        <div class="mt-6 flex flex-wrap gap-3">
          <button type="button" class="btn-primary btn-sm" @click="openProject(p)">View project <Icon name="arrow-up-right" class="h-4 w-4" /></button>
          <button v-if="p.video" type="button" class="btn-ghost btn-sm" @click="openProject(p, { play: true })"><Icon name="play" class="h-3.5 w-3.5 text-green-glow" /> Watch · {{ p.video.durationLabel }}</button>
          <a :href="enquire(p)" target="_blank" rel="noopener" class="btn-ghost btn-sm"><Icon name="whatsapp" class="h-4 w-4" /> Enquire</a>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { projects } from '@/data/projects'
import { enquireLink as enquire } from '@/lib/enquire'
import { openProject } from '@/lib/projectModal'
import { gsap } from '@/lib/motion'
import Icon from '@/components/ui/Icon.vue'

const featured = projects.filter(p => p.featured && p.image)
const root = ref(), pin = ref()
const current = ref(0)


let mm
onMounted(() => {
  mm = gsap.matchMedia()
  mm.add({ desktop: '(min-width: 1024px)', reduce: '(prefers-reduced-motion: reduce)' }, ({ conditions }) => {
    if (!conditions.desktop) return
    const texts = gsap.utils.toArray('.story-text', root.value)
    const imgs = gsap.utils.toArray('.story-img', root.value)
    const bars = gsap.utils.toArray('.story-bar', root.value)
    const n = featured.length

    // Initial state: first project visible, others waiting "behind the turntable".
    gsap.set(texts, { autoAlpha: 0, y: 40 })
    gsap.set(texts[0], { autoAlpha: 1, y: 0 })
    gsap.set(imgs, { rotateY: 70, z: -300, autoAlpha: 0, transformOrigin: '50% 50% -400px' })
    gsap.set(imgs[0], { rotateY: 0, z: 0, autoAlpha: 1 })

    if (conditions.reduce) {
      // Still pin and switch, but without movement.
      gsap.set(imgs, { rotateY: 0, z: 0 })
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut', duration: 1 },
      scrollTrigger: {
        trigger: pin.value, start: 'top top', end: () => `+=${window.innerHeight * (n + 0.2)}`,
        pin: true, scrub: 0.8, anticipatePin: 1,
        onUpdate: self => { current.value = Math.min(n - 1, Math.floor(self.progress * n * 0.999)) },
      },
    })

    // Slow continuous turntable drift on the active image.
    tl.to(imgs[0], { rotateY: -8, rotateX: 2, duration: 1 }, 0)
    tl.to(bars[0], { scaleX: 1, ease: 'none', duration: 1 }, 0)

    for (let i = 1; i < n; i++) {
      const at = i
      if (conditions.reduce) {
        tl.to(imgs[i - 1], { autoAlpha: 0, duration: 0.3 }, at - 0.15)
          .to(imgs[i], { autoAlpha: 1, duration: 0.3 }, at - 0.15)
      } else {
        tl.to(imgs[i - 1], { rotateY: -75, z: -300, autoAlpha: 0, duration: 0.6, ease: 'power2.in' }, at - 0.3)
          .fromTo(imgs[i], { rotateY: 75, z: -300, autoAlpha: 0 }, { rotateY: 0, z: 0, autoAlpha: 1, duration: 0.6, ease: 'power2.out' }, at - 0.05)
          .to(imgs[i], { rotateY: -8, rotateX: 2, duration: 0.6 }, at + 0.55)
      }
      tl.to(texts[i - 1], { autoAlpha: 0, y: -40, duration: 0.35 }, at - 0.25)
        .to(texts[i], { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out' }, at + 0.05)
        .to(bars[i], { scaleX: 1, ease: 'none', duration: 1 }, at)
    }
    tl.to({}, { duration: 0.2 }) // a short hold on the last project
  })
})
onUnmounted(() => mm?.revert())

</script>
