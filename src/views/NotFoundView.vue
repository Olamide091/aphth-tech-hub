<template>
  <main id="main" class="relative flex min-h-[90svh] items-center overflow-hidden pt-24">
    <div class="bg-grid absolute inset-0 -z-10 mask-fade-y opacity-60" aria-hidden="true"></div>
    <div class="wrap grid items-center gap-10 md:grid-cols-2">
      <div>
        <p class="eyebrow mb-6">Error 404</p>
        <h1 class="font-display text-display-lg font-semibold text-paper">This part isn’t <span class="accent">in the drawing.</span></h1>
        <p class="lede mt-6 max-w-md">The page you’re looking for doesn’t exist or has moved.</p>
        <router-link to="/" class="btn-primary mt-10">Back to home <Icon name="arrow" class="h-4 w-4" /></router-link>
      </div>
      <GenevaMechanism :angle="angle" class="w-full max-w-md opacity-80" />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { reducedMotion } from '@/lib/motion'
import GenevaMechanism from '@/components/ui/GenevaMechanism.vue'
import Icon from '@/components/ui/Icon.vue'

defineProps({ ready: Boolean })

const angle = ref(-150)
let raf
onMounted(() => {
  if (reducedMotion) return
  const tick = () => { angle.value += 0.6; raf = requestAnimationFrame(tick) }
  raf = requestAnimationFrame(tick)
  document.title = 'Page not found — African Pro-Humanity Tech Hub'
})
onUnmounted(() => {
  cancelAnimationFrame(raf)
  document.title = 'African Pro-Humanity Tech Hub — Engineering Africa’s Future'
})
</script>
