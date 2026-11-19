<template>
  <footer class="relative overflow-hidden border-t border-line bg-ink-950">
    <div class="wrap pb-10 pt-20">
      <div class="grid gap-12 md:grid-cols-12">
        <div class="md:col-span-5">
          <div class="flex items-center gap-3">
            <img :src="logo" alt="" width="48" height="48" loading="lazy" class="h-12 w-12 rounded-full" />
            <div>
              <p class="font-semibold tracking-tight text-paper">African Pro-Humanity</p>
              <p class="font-mono text-[10px] uppercase tracking-[0.2em] text-haze">Tech Hub</p>
            </div>
          </div>
          <p class="mt-6 max-w-sm leading-relaxed text-mist">{{ org.tagline }}</p>
          <a :href="contact.linkedin" target="_blank" rel="noopener" class="btn-ghost btn-sm mt-6"><Icon name="linkedin" class="h-4 w-4" /> LinkedIn</a>
        </div>

        <nav class="md:col-span-3" aria-label="Footer">
          <p class="label">Navigation</p>
          <ul class="mt-4 space-y-2.5">
            <li v-for="l in nav" :key="l.href">
              <a :href="isHome ? l.href : `/${l.href}`" class="text-mist transition-colors hover:text-paper" @click="go($event, l.href)">{{ l.label }}</a>
            </li>
          </ul>
        </nav>

        <div class="md:col-span-4">
          <p class="label">Contact</p>
          <ul class="mt-4 space-y-2.5 text-mist">
            <li><a :href="`mailto:${contact.email}`" class="break-all hover:text-paper">{{ contact.email }}</a></li>
            <li v-for="p in contact.phones" :key="p.wa"><a :href="waLink(p.wa)" target="_blank" rel="noopener" class="hover:text-paper">{{ p.display }}</a></li>
            <li>{{ contact.address.join(', ') }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Oversized wordmark -->
    <div class="pointer-events-none select-none overflow-hidden" aria-hidden="true">
      <p class="wordmark translate-y-[18%] whitespace-nowrap text-center font-display text-[25vw] font-bold leading-[0.8] tracking-[-0.06em]">APHTH</p>
    </div>

    <div class="border-t border-line">
      <div class="wrap flex flex-col items-center justify-between gap-2 py-6 text-center font-mono text-[11px] text-haze md:flex-row">
        <p>© {{ year }} African Pro-Humanity Tech Hub. All rights reserved.</p>
        <p>Built with precision ⚙️</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { org, nav, contact, waLink } from '@/data/site'
import { scrollToHash } from '@/lib/motion'
import Icon from '@/components/ui/Icon.vue'
import logo from '@/assets/logo.webp'

const route = useRoute()
const isHome = computed(() => route.path === '/')
const year = new Date().getFullYear()

function go(e, href) {
  if (!isHome.value) return // let the browser navigate to /#section
  e.preventDefault()
  scrollToHash(href)
}
</script>

<style scoped>
.wordmark {
  background: linear-gradient(180deg, rgba(61, 220, 151, 0.22), rgba(61, 220, 151, 0) 75%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>
