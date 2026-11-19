<template>
  <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-green-glow focus:px-4 focus:py-2 focus:text-ink-950">
    Skip to content
  </a>

  <AppLoader v-if="showLoader" @done="loaderDone" />

  <AppNav :ready="ready" />

  <router-view v-slot="{ Component, route }">
    <Transition name="page" mode="out-in" @after-enter="refreshTriggers">
      <component :is="Component" :key="route.path" :ready="ready" />
    </Transition>
  </router-view>

  <AppFooter />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppNav from '@/components/layout/AppNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppLoader from '@/components/layout/AppLoader.vue'
import { initSmoothScroll, reducedMotion, ScrollTrigger, lockScroll } from '@/lib/motion'

// The intro loader plays once per browser session and never for reduced-motion users.
const seen = (() => { try { return sessionStorage.getItem('aphth-intro') === '1' } catch { return false } })()
const showLoader = ref(!reducedMotion && !seen)
const ready = ref(!showLoader.value)

function loaderDone() {
  try { sessionStorage.setItem('aphth-intro', '1') } catch { /* private mode */ }
  showLoader.value = false
  ready.value = true
  lockScroll(false)
  ScrollTrigger.refresh()
}

function refreshTriggers() { ScrollTrigger.refresh() }

onMounted(() => {
  initSmoothScroll()
  if (showLoader.value) lockScroll(true)
  // Images load after first layout — recompute pinned sections once everything is in.
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
})
</script>

<style>
.page-enter-active, .page-leave-active { transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
.page-enter-from { opacity: 0; transform: translateY(24px); }
.page-leave-to   { opacity: 0; transform: translateY(-12px); }
</style>
