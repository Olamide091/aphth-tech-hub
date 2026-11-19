<template>
  <div class="relative overflow-hidden border-y border-line bg-ink-900 py-6" aria-hidden="true">
    <div class="mask-fade-x">
      <div class="flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused]">
        <template v-for="n in 2" :key="n">
          <span v-for="w in words" :key="`${n}-${w}`" class="flex items-center gap-10 whitespace-nowrap font-display text-2xl font-medium tracking-tight text-mist md:text-4xl">
            {{ w }}
            <svg viewBox="0 0 24 24" class="h-5 w-5 text-green-glow md:h-6 md:w-6"><path fill="currentColor" d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" /></svg>
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { services } from '@/data/services'

// Built from the disciplines and tags already listed under Services.
const words = [...new Set(services.flatMap(s => [s.title, ...s.tags]))]
</script>
