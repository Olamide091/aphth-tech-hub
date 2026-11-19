<template>
  <section id="about" ref="root" class="section overflow-hidden">
    <div class="wrap">
      <p class="eyebrow mb-10">About APHTH</p>

      <!-- Scroll-scrubbed statement: words light up as you read -->
      <blockquote class="max-w-6xl">
        <p ref="statement" class="font-display text-display-md font-medium text-paper">
          <span v-for="(w, i) in words" :key="i" class="statement-word">{{ i < words.length - 1 ? `${w} ` : w }}</span>
        </p>
        <footer class="mt-8 flex items-center gap-4" v-reveal>
          <img v-if="founder.avatar" :src="founder.avatar.small" alt="" width="48" height="48" loading="lazy" class="h-12 w-12 rounded-full object-cover" />
          <div>
            <p class="text-sm font-medium text-paper">{{ founder.name }}</p>
            <p class="font-mono text-[10.5px] uppercase tracking-[0.18em] text-haze">{{ founder.title }}</p>
          </div>
        </footer>
      </blockquote>

      <!-- Mission / Discipline / Vision -->
      <div class="mt-24 grid gap-4 md:grid-cols-3" v-reveal.stagger>
        <article
          v-for="(p, i) in pillars" :key="p.title"
          class="spotlight card group p-8 md:p-10"
          @pointermove="spot"
        >
          <span class="font-mono text-xs text-green-glow">0{{ i + 1 }}</span>
          <h3 class="mt-10 font-display text-2xl font-semibold tracking-tight text-paper">{{ p.title }}</h3>
          <p class="mt-4 leading-relaxed text-mist">{{ p.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { pillars } from '@/data/site'
import { founder } from '@/data/team'
import { gsap, reducedMotion } from '@/lib/motion'

// First line of the Founder's message (kept verbatim).
const quote = 'Africa’s greatest wealth is not buried beneath its soil, but embedded within the untapped potential of its people.'
const words = quote.split(' ')

const root = ref(), statement = ref()
let ctx

function spot(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

onMounted(() => {
  if (reducedMotion) return
  ctx = gsap.context(() => {
    gsap.fromTo('.statement-word', { opacity: 0.14 }, {
      opacity: 1, ease: 'none', stagger: 0.1,
      scrollTrigger: { trigger: statement.value, start: 'top 80%', end: 'bottom 45%', scrub: true },
    })
  }, root.value)
})
onUnmounted(() => ctx?.revert())
</script>

<style scoped>
.spotlight::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(61, 220, 151, 0.11), transparent 60%);
  opacity: 0; transition: opacity 0.4s;
  pointer-events: none;
}
.spotlight:hover::before { opacity: 1; }
</style>
