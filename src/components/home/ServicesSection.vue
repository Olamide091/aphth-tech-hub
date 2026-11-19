<template>
  <section id="services" class="section">
    <div class="wrap">
      <div class="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-7">
          <p class="eyebrow mb-6">{{ servicesIntro.eyebrow }}</p>
          <h2 v-split class="h-section">Our Core <span class="accent">Services</span></h2>
        </div>
        <p class="lede lg:col-span-5" v-reveal="0.1">{{ servicesIntro.body }}</p>
      </div>

      <div class="mt-16 grid gap-4 lg:grid-cols-3" v-reveal.stagger>
        <article
          v-for="(s, i) in services" :key="s.title"
          class="service card group flex flex-col p-8 transition-[border-color,transform] duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-green-glow/30 md:p-10"
          @pointermove="tilt" @pointerleave="untilt"
        >
          <div class="flex items-start justify-between">
            <span class="flex h-14 w-14 items-center justify-center rounded-2xl border border-green-glow/20 bg-green/10 text-green-glow transition-transform duration-700 ease-out-expo group-hover:rotate-[60deg]">
              <Icon :name="s.icon" class="h-7 w-7" />
            </span>
            <span class="font-mono text-xs text-haze">{{ String(i + 1).padStart(2, '0') }} / 03</span>
          </div>
          <h3 class="mt-12 font-display text-2xl font-semibold tracking-tight text-paper md:text-[28px]">{{ s.title }}</h3>
          <p class="mt-4 flex-1 leading-relaxed text-mist">{{ s.body }}</p>
          <ul class="mt-8 flex flex-wrap gap-2 border-t border-line pt-6">
            <li v-for="t in s.tags" :key="t" class="chip">{{ t }}</li>
          </ul>
          <div class="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-green/20 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" aria-hidden="true"></div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { services, servicesIntro } from '@/data/services'
import { reducedMotion, isTouch } from '@/lib/motion'
import Icon from '@/components/ui/Icon.vue'

function tilt(e) {
  if (reducedMotion || isTouch) return
  const el = e.currentTarget, r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
  el.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 6}deg) translateY(-6px)`
}
function untilt(e) { e.currentTarget.style.transform = '' }
</script>
