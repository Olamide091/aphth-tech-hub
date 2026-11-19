<!-- Project thumbnail: photo when available, otherwise an engineering "blueprint" plate (no fake imagery). -->
<template>
  <div class="relative h-full w-full overflow-hidden bg-ink-800">
    <img
      v-if="project.image"
      :src="large ? project.image.src : project.image.small"
      :srcset="large ? project.image.srcset : undefined"
      :sizes="large ? '(min-width:1024px) 60vw, 100vw' : undefined"
      :alt="project.image.alt"
      loading="lazy" decoding="async"
      class="visual-img h-full w-full object-cover"
    />
    <div v-else class="blueprint absolute inset-0" aria-hidden="true">
      <div class="bg-grid absolute inset-0 opacity-60"></div>
      <svg viewBox="0 0 200 150" class="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke="rgba(61,220,151,0.35)" stroke-width="0.6">
          <circle cx="100" cy="75" r="44" stroke-dasharray="2 3" />
          <circle cx="100" cy="75" r="28" />
          <circle cx="100" cy="75" r="4" />
          <line x1="40" y1="75" x2="160" y2="75" stroke-dasharray="6 3 1 3" />
          <line x1="100" y1="20" x2="100" y2="130" stroke-dasharray="6 3 1 3" />
          <path d="M 56 128 L 144 128 M 56 125 L 56 131 M 144 125 L 144 131" stroke="rgba(212,162,76,0.5)" />
        </g>
      </svg>
      <span class="absolute inset-0 flex items-center justify-center font-display text-[min(22vw,9rem)] font-semibold leading-none tracking-tighter text-paper/[0.06]">{{ initials }}</span>
      <span class="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-green-glow/70">{{ project.category }} · DWG {{ code }}</span>
    </div>
    <span v-if="project.video" class="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-ink-950/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper backdrop-blur">
      <Icon name="play" class="h-3 w-3 text-green-glow" /> Video
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Icon from '@/components/ui/Icon.vue'

const props = defineProps({ project: { type: Object, required: true }, large: Boolean })

const initials = computed(() => props.project.title.split(/\s+/).filter(w => /^[A-Z]/.test(w)).slice(0, 2).map(w => w[0]).join(''))
// Stable drawing number derived from the id (decorative only).
const code = computed(() => String([...props.project.id].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 9000, 7) + 1000))
</script>
