<template>
  <div ref="root" class="fixed inset-0 z-[90] flex items-center justify-center bg-ink-950" role="status" aria-label="Loading">
    <div ref="panel" class="absolute inset-0 bg-ink-950"></div>
    <div ref="content" class="relative flex flex-col items-center gap-6">
      <img :src="logo" alt="" width="72" height="72" class="h-[72px] w-[72px] rounded-full" />
      <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-mist">African Pro-Humanity Tech Hub</p>
      <div class="h-px w-56 overflow-hidden bg-white/10">
        <div ref="bar" class="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-green to-green-glow"></div>
      </div>
      <p class="font-mono text-xs tabular-nums text-green-glow"><span ref="count">0</span>%</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from '@/lib/motion'
import logo from '@/assets/logo.webp'

const emit = defineEmits(['done'])
const root = ref(), panel = ref(), content = ref(), bar = ref(), count = ref()

onMounted(() => {
  const counter = { v: 0 }
  gsap.timeline({ onComplete: () => emit('done') })
    .from(content.value, { opacity: 0, y: 16, duration: 0.6, ease: 'expo.out' })
    .to(bar.value, { scaleX: 1, duration: 1.1, ease: 'power3.inOut' }, 0.2)
    .to(counter, { v: 100, duration: 1.1, ease: 'power3.inOut', onUpdate: () => { count.value.textContent = Math.round(counter.v) } }, 0.2)
    .to(content.value, { opacity: 0, y: -16, duration: 0.45, ease: 'power2.in' }, '+=0.1')
    .to(root.value, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' }, '-=0.1')
})
</script>
