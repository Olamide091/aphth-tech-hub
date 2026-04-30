<template>
  <div class="card-dark p-7 relative group cursor-default flex flex-col">

    <!-- Animated top border on hover -->
    <div class="absolute top-0 left-0 h-[2px] w-0 bg-brand-gold transition-all duration-500 ease-out group-hover:w-full"></div>

    <!-- Header row: icon + number -->
    <div class="flex items-start justify-between mb-6">
      <div class="w-12 h-12 bg-brand-gold/10 border border-brand-gold/15 flex items-center justify-center
                  group-hover:bg-brand-gold/[0.18] transition-colors duration-300 flex-shrink-0">
        <span class="text-xl leading-none">{{ icon }}</span>
      </div>
      <span class="font-mono text-white/15 text-[11px] tracking-widest mt-1">
        {{ String(index + 1).padStart(2, '0') }}
      </span>
    </div>

    <!-- Title -->
    <h3 class="font-display text-[19px] font-semibold text-brand-cream mb-3 leading-snug
               group-hover:text-brand-gold transition-colors duration-300">
      {{ title }}
    </h3>

    <!-- Description -->
    <p class="font-body text-white/50 text-sm leading-relaxed mb-6 flex-1">{{ description }}</p>

    <!-- Tags -->
    <div class="flex flex-wrap gap-2 pt-5 border-t border-white/[0.06]">
      <span
        v-for="tag in tags"
        :key="tag"
        class="font-mono text-[9px] text-brand-gold/55 border border-brand-gold/15 px-2.5 py-1 tracking-wider"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  icon:        { type: String, default: '⚙' },
  tags:        { type: Array,  default: () => [] },
  index:       { type: Number, default: 0 },
})
</script>
