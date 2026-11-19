<template>
  <header
    :class="[
      'fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out-expo',
      hidden && !open ? '-translate-y-full' : 'translate-y-0',
    ]"
  >
    <div class="wrap pt-3 md:pt-4">
      <nav
        aria-label="Main"
        :class="[
          'flex items-center justify-between rounded-full py-2 pl-2 pr-2 transition-all duration-500 ease-out-expo',
          scrolled || open ? 'glass shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]' : 'border border-transparent',
        ]"
      >
        <a href="#hero" class="flex items-center gap-3 rounded-full pr-3" @click.prevent="go('#hero')">
          <img :src="logo" alt="" width="40" height="40" class="h-10 w-10 rounded-full" />
          <span class="leading-tight">
            <span class="block text-[15px] font-semibold tracking-tight text-paper">APHTH</span>
            <span class="hidden font-mono text-[9.5px] uppercase tracking-[0.2em] text-mist sm:block">Pro-Humanity Tech Hub</span>
          </span>
        </a>

        <ul class="hidden items-center gap-1 lg:flex">
          <li v-for="l in nav.slice(1)" :key="l.href">
            <a
              :href="l.href"
              :aria-current="active === l.href ? 'true' : undefined"
              :class="[
                'relative rounded-full px-4 py-2 text-[14px] transition-colors duration-300',
                active === l.href ? 'text-paper' : 'text-mist hover:text-paper',
              ]"
              @click.prevent="go(l.href)"
            >
              <span
                v-if="active === l.href"
                class="absolute inset-0 -z-10 rounded-full bg-white/[0.07]"
                aria-hidden="true"
              ></span>
              {{ l.label }}
            </a>
          </li>
        </ul>

        <div class="flex items-center gap-2">
          <a v-magnetic href="#contact" class="btn-primary btn-sm hidden sm:inline-flex" @click.prevent="go('#contact')">
            Get in touch
            <Icon name="arrow" class="h-4 w-4" />
          </a>
          <button
            type="button"
            class="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] lg:hidden"
            :aria-expanded="open"
            aria-controls="mobile-menu"
            :aria-label="open ? 'Close menu' : 'Open menu'"
            @click="toggle"
          >
            <span :class="['absolute h-px w-5 bg-paper transition-transform duration-300', open ? 'rotate-45' : '-translate-y-[4px]']"></span>
            <span :class="['absolute h-px w-5 bg-paper transition-transform duration-300', open ? '-rotate-45' : 'translate-y-[4px]']"></span>
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile menu -->
    <Transition name="menu">
      <div v-if="open" id="mobile-menu" class="fixed inset-0 -z-10 flex flex-col bg-ink-950/95 px-6 pb-10 pt-28 backdrop-blur-2xl lg:hidden">
        <ul class="flex flex-col gap-1">
          <li v-for="(l, i) in nav" :key="l.href" class="menu-item" :style="{ transitionDelay: `${80 + i * 50}ms` }">
            <a
              :href="l.href"
              class="flex items-baseline justify-between border-b border-line py-4 text-4xl font-semibold tracking-tight text-paper"
              @click.prevent="go(l.href)"
            >
              {{ l.label }}
              <span class="font-mono text-xs text-haze">0{{ i + 1 }}</span>
            </a>
          </li>
        </ul>
        <div class="mt-auto space-y-2 text-sm text-mist">
          <a :href="`mailto:${contact.email}`" class="block hover:text-paper">{{ contact.email }}</a>
          <a :href="waLink(whatsapp.general)" target="_blank" rel="noopener" class="block hover:text-paper">WhatsApp us</a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { nav, contact, whatsapp, waLink } from '@/data/site'
import { scrollToHash, lockScroll } from '@/lib/motion'
import Icon from '@/components/ui/Icon.vue'
import logo from '@/assets/logo.webp'

const route = useRoute()
const router = useRouter()
const scrolled = ref(false)
const hidden = ref(false)
const open = ref(false)
const active = ref('#hero')

let lastY = 0
function onScroll() {
  const y = window.scrollY
  scrolled.value = y > 30
  hidden.value = y > 400 && y > lastY + 4
  if (y < lastY - 4) hidden.value = false
  lastY = y
}

function toggle() {
  open.value = !open.value
  lockScroll(open.value)
}

function go(href) {
  if (open.value) { open.value = false; lockScroll(false) }
  if (route.path !== '/') { router.push(`/${href}`); return }
  scrollToHash(href)
  history.replaceState(history.state, '', href)
}

function onKey(e) { if (e.key === 'Escape' && open.value) toggle() }

// Highlight the link of the section currently in view. Re-run whenever the home page mounts.
let observer
function observeSections() {
  observer?.disconnect()
  observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) active.value = `#${e.target.id}` }),
    { rootMargin: '-45% 0px -50% 0px' },
  )
  nav.forEach(l => { const el = document.querySelector(l.href); if (el) observer.observe(el) })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
  window.addEventListener('home:mounted', observeSections)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('home:mounted', observeSections)
  observer?.disconnect()
})
</script>

<style scoped>
.menu-enter-active, .menu-leave-active { transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1); }
.menu-enter-from, .menu-leave-to { opacity: 0; }
.menu-item { transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s; }
.menu-enter-from .menu-item { transform: translateY(30px); opacity: 0; }
</style>
