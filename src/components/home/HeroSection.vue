<template>
  <section id="hero" ref="root" class="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-noise">
    <!-- Atmosphere -->
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div class="bg-grid absolute inset-0 mask-fade-y opacity-70"></div>
      <div ref="glowA" class="absolute -left-[20%] top-[-10%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgba(0,135,81,0.32),transparent)] blur-2xl"></div>
      <div ref="glowB" class="absolute -right-[15%] bottom-[-30%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgba(212,162,76,0.14),transparent)] blur-2xl"></div>
    </div>

    <div class="wrap relative grid flex-1 items-center gap-10 pb-28 pt-32 md:pt-40 lg:grid-cols-12 lg:gap-6">
      <!-- Copy -->
      <div ref="copy" class="relative z-10 lg:col-span-7">
        <p class="eyebrow mb-7 hero-fade">{{ hero.eyebrow }}</p>

        <h1 v-if="ready" v-split.load="0.1" class="font-display text-display-xl font-semibold text-paper">
          {{ hero.titleLines[0] }}<br />
          <span class="accent pr-2">{{ hero.titleLines[1] }}</span><br />
          {{ hero.titleLines[2] }}
        </h1>
        <h1 v-else class="font-display text-display-xl font-semibold text-paper opacity-0" aria-hidden="true">&nbsp;<br />&nbsp;<br />&nbsp;</h1>

        <p class="lede mt-8 max-w-xl hero-fade">{{ hero.body }}</p>

        <div class="mt-10 flex flex-wrap items-center gap-3 hero-fade">
          <a v-magnetic href="#projects" class="btn-primary" @click.prevent="scrollToHash('#projects')">
            Explore Projects <Icon name="arrow" class="h-4 w-4" />
          </a>
          <a v-magnetic href="#contact" class="btn-ghost" @click.prevent="scrollToHash('#contact')">Partner With Us</a>
        </div>
      </div>

      <!-- Mechanism -->
      <div class="relative lg:col-span-5">
        <div ref="stage" class="relative mx-auto aspect-[5/4] w-full max-w-[560px] lg:max-w-none">
          <div class="absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgba(61,220,151,0.12),transparent)]" aria-hidden="true"></div>
          <GenevaMechanism :angle="angle" class="relative h-full w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]" />
          <!-- Floating annotation chips -->
          <div class="hero-chip absolute left-0 top-[6%] glass rounded-2xl px-4 py-3 animate-float">
            <p class="font-mono text-[10px] uppercase tracking-[0.18em] text-haze">Precision motion</p>
            <p class="mt-1 text-sm text-paper">Geneva drive · 6 slots</p>
          </div>
          <div class="hero-chip absolute bottom-[4%] right-0 glass rounded-2xl px-4 py-3 animate-float [animation-delay:-3.5s]">
            <p class="font-mono text-[10px] uppercase tracking-[0.18em] text-haze">Index angle</p>
            <p class="mt-1 font-mono text-sm tabular-nums text-green-glow">{{ indexAngle }}°</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="wrap relative pb-10">
      <dl class="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
        <div v-for="s in stats" :key="s.label" class="hero-stat bg-ink-950/80 px-5 py-6 backdrop-blur md:px-7">
          <dt class="font-mono text-[10.5px] uppercase tracking-[0.18em] text-haze">{{ s.label }}</dt>
          <dd class="mt-2 font-display text-4xl font-semibold tracking-tight text-paper md:text-5xl">
            <span class="stat-num tabular-nums" :data-value="s.value">{{ s.value }}</span><span class="text-green-glow">{{ s.suffix }}</span>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { hero, stats } from '@/data/site'
import { gsap, ScrollTrigger, reducedMotion, isTouch, scrollToHash } from '@/lib/motion'
import GenevaMechanism from '@/components/ui/GenevaMechanism.vue'
import Icon from '@/components/ui/Icon.vue'

const props = defineProps({ ready: Boolean })

const root = ref(), copy = ref(), stage = ref(), glowA = ref(), glowB = ref()

// Crank angle = slow idle spin + scroll-driven spin.
const idle = ref(-150)
const scrollSpin = ref(0)
const angle = computed(() => idle.value + scrollSpin.value)
const indexAngle = computed(() => {
  const k = Math.floor(((angle.value * Math.PI) / 180 + Math.PI) / (2 * Math.PI))
  return String(((k * 60) % 360 + 360) % 360).padStart(3, '0')
})

let ctx, rafId
function intro() {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    tl.from('.hero-fade', { opacity: 0, y: 28, duration: 1.2, stagger: 0.12 }, 0.35)
      .from(stage.value, { opacity: 0, scale: 0.88, rotate: -8, duration: 1.8 }, 0.2)
      .from('.hero-chip', { opacity: 0, y: 20, duration: 1, stagger: 0.15 }, 0.9)
      .from('.hero-stat', { opacity: 0, y: 24, duration: 1, stagger: 0.08 }, 0.7)

    // Count-up stats
    root.value.querySelectorAll('.stat-num').forEach(el => {
      const obj = { v: 0 }
      tl.to(obj, { v: Number(el.dataset.value), duration: 1.8, ease: 'power3.out', onUpdate: () => { el.textContent = Math.round(obj.v) } }, 0.8)
    })

    // Scroll: mechanism turns two full indexing cycles; copy drifts up and fades.
    ScrollTrigger.create({
      trigger: root.value, start: 'top top', end: 'bottom top', scrub: 0.6,
      onUpdate: self => { scrollSpin.value = self.progress * 720 },
    })
    gsap.to(copy.value, { yPercent: -18, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true } })
    gsap.to(stage.value, { yPercent: 12, scale: 0.94, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true } })

    // Pointer parallax on the glows (desktop only)
    if (!isTouch) {
      const ax = gsap.quickTo(glowA.value, 'x', { duration: 1.6, ease: 'power3.out' })
      const ay = gsap.quickTo(glowA.value, 'y', { duration: 1.6, ease: 'power3.out' })
      const bx = gsap.quickTo(glowB.value, 'x', { duration: 2, ease: 'power3.out' })
      root.value.addEventListener('pointermove', e => {
        const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5
        ax(nx * 80); ay(ny * 60); bx(nx * -60)
      })
    }
  }, root.value)

  // Continuous slow rotation (pauses when the tab is hidden, as rAF does).
  let last = performance.now()
  const tick = now => {
    idle.value += ((now - last) / 1000) * 24
    last = now
    rafId = requestAnimationFrame(tick)
  }
  rafId = requestAnimationFrame(tick)
}

onMounted(() => {
  if (reducedMotion) { idle.value = 30; return }
  if (props.ready) nextTick(intro)
  else watch(() => props.ready, v => v && nextTick(intro), { once: true })
})
onUnmounted(() => { ctx?.revert(); cancelAnimationFrame(rafId) })
</script>

