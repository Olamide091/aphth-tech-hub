<template> 
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-400',
      scrolled
        ? 'bg-brand-black/96 backdrop-blur-lg border-b border-white/[0.06] py-0'
        : 'bg-transparent py-0'
    ]"
    style="height: 68px; display:flex; align-items:center;"
  >
    <div class="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">

      <!-- Logo -->
      <a href="/" class="flex items-center gap-3 group flex-shrink-0">
        <img 
          src="/MyLogo.png" 
          alt="APHTH Logo" 
          class="h-9 w-auto object-contain"
        />
        <div class="hidden sm:block">
          <p class="font-display text-brand-cream font-bold text-[13px] leading-tight tracking-wide">APHTH</p>
          <p class="font-mono text-brand-gold text-[8px] tracking-[0.2em] uppercase">Tech Hub</p>
        </div>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-7">
        <a
          v-for="link in navLinks"
          :key="link.label"
          :href="link.href"
          class="font-body text-[13px] text-white/55 hover:text-white transition-colors duration-200 tracking-wide"
        >
          {{ link.label }}
        </a>
      </nav>

      <!-- Right side actions -->
      <div class="hidden md:flex items-center gap-3">
        <!-- Sign In -->
        <a href="#" class="font-body text-[12px] text-white/70 hover:text-white transition-colors duration-200 tracking-wide px-3 py-2">
          Sign In
        </a>

        <span class="w-px h-4 bg-white/10"></span>

        <!-- CTA -->
        <a href="#contact" class="btn-gold py-2.5 px-5 text-[10px]">
          Get In Touch
        </a>
      </div>

      <!-- Mobile menu toggle -->
      <button
        @click="mobileOpen = !mobileOpen"
        class="md:hidden flex flex-col gap-[5px] p-2"
        aria-label="Toggle menu"
      >
        <span :class="['block w-5 h-[1.5px] bg-white/70 transition-all duration-300', mobileOpen ? 'rotate-45 translate-y-[6.5px]' : '']"></span>
        <span :class="['block w-5 h-[1.5px] bg-white/70 transition-all duration-300', mobileOpen ? 'opacity-0 scale-x-0' : '']"></span>
        <span :class="['block w-5 h-[1.5px] bg-white/70 transition-all duration-300', mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : '']"></span>
      </button>
    </div>

    <!-- Mobile drawer -->
    <transition name="slide-down">
      <div v-if="mobileOpen" class="md:hidden absolute top-full left-0 right-0 bg-brand-charcoal border-t border-white/[0.06] px-6 py-8">
        <nav class="flex flex-col gap-6 mb-8">
          <a
            v-for="link in navLinks"
            :key="link.label"
            :href="link.href"
            @click="mobileOpen = false"
            class="font-body text-white/65 hover:text-brand-gold transition-colors duration-200 text-base"
          >
            {{ link.label }}
          </a>
        </nav>
        <div class="flex flex-col gap-3 pt-6 border-t border-white/[0.06]">
          <a href="#" class="btn-text text-sm">Sign In →</a>
          <a href="#contact" class="btn-gold self-start" @click="mobileOpen = false">Get In Touch</a>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled   = ref(false)
const mobileOpen = ref(false)

const navLinks = [
  { label: 'Home',     href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Gallery',  href: '#gallery' },
  { label: 'Team',     href: '#team' },
  { label: 'Contact',  href: '#contact' },
]

function handleScroll() { scrolled.value = window.scrollY > 50 }

onMounted(()  => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active { transition: all 0.25s ease; }
.slide-down-enter-from,
.slide-down-leave-to { opacity: 0; transform: translateY(-8px); }
</style>