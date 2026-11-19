<template>
  <article class="project-card group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-line bg-ink-800/80 transition-[border-color,transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-green-glow/30 hover:shadow-[0_40px_80px_-40px_rgba(0,135,81,0.45)]">
    <button
      type="button"
      class="relative block aspect-[16/11] w-full overflow-hidden text-left"
      :aria-label="`View details: ${project.title}`"
      @click="openProject(project)"
    >
      <ProjectVisual :project="project" class="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06]" />
      <span class="absolute left-4 top-4 rounded-full bg-ink-950/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-green-glow backdrop-blur">{{ project.category }}</span>
      <span class="absolute bottom-4 right-4 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-green-glow text-ink-950 opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:opacity-100">
        <Icon name="arrow-up-right" class="h-5 w-5" />
      </span>
    </button>

    <div class="flex flex-1 flex-col p-6 md:p-7">
      <h3 class="font-display text-xl font-semibold leading-snug tracking-tight text-paper">{{ project.title }}</h3>
      <div class="flex-1"><p class="mt-3 line-clamp-3 text-[15px] leading-relaxed text-mist">{{ project.summary }}</p></div>
      <ul v-if="project.tech?.length" class="mt-5 flex flex-wrap gap-1.5">
        <li v-for="t in project.tech" :key="t" class="chip">{{ t }}</li>
      </ul>
      <div class="mt-6 flex items-center justify-between gap-3 border-t border-line pt-5">
        <button type="button" class="text-sm font-medium text-paper underline-offset-4 hover:text-green-glow hover:underline" @click="openProject(project)">
          Details
        </button>
        <a :href="enquireLink(project)" target="_blank" rel="noopener" class="inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-green-glow">
          <Icon name="whatsapp" class="h-4 w-4" /> Enquire
        </a>
      </div>
    </div>
  </article>
</template>

<script setup>
import ProjectVisual from './ProjectVisual.vue'
import Icon from '@/components/ui/Icon.vue'
import { openProject } from '@/lib/projectModal'
import { enquireLink } from '@/lib/enquire'

defineProps({ project: { type: Object, required: true } })
</script>
