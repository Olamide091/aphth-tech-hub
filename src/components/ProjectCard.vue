<template>
  <div class="card-dark overflow-hidden group cursor-pointer" @click="$emit('open', project)">

    <!-- Thumbnail area -->
    <div class="relative h-48 overflow-hidden bg-brand-green">
      <img
        v-if="project.image"
        :src="project.image"
        :alt="project.title"
        class="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105 opacity-65"
      />
      <!-- Fallback: gradient + letter -->
      <div v-else
           class="w-full h-full flex items-center justify-center"
           style="background: linear-gradient(145deg, #112218 0%, #0B1810 100%);">
        <span class="font-display text-[72px] font-bold text-brand-gold/[0.12] leading-none select-none">
          {{ project.title[0] }}
        </span>
      </div>

      <!-- Category badge -->
      <span class="absolute top-3 left-3 bg-brand-gold text-brand-black font-mono text-[9px] font-bold px-2.5 py-1 tracking-[0.12em] uppercase">
        {{ project.category }}
      </span>

      <!-- Hover overlay -->
      <div class="absolute inset-0 bg-brand-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span class="font-mono text-brand-gold text-[10px] tracking-[0.18em] uppercase border border-brand-gold/60 px-4 py-2">
          View Details →
        </span>
      </div>
    </div>

    <!-- Body -->
    <div class="p-6">
      <h3 class="font-display text-[17px] font-semibold text-brand-cream mb-2 leading-snug
                 group-hover:text-brand-gold transition-colors duration-250">
        {{ project.title }}
      </h3>
      <p class="font-body text-white/48 text-[13px] leading-relaxed mb-5">{{ project.description }}</p>

      <!-- Tech stack -->
      <div class="flex flex-wrap gap-x-3 gap-y-1 pt-4 border-t border-white/[0.06]">
        <span
          v-for="tech in project.tech"
          :key="tech"
          class="font-mono text-[9px] text-white/35 tracking-wider"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ project: { type: Object, required: true } })
defineEmits(['open'])
</script>
