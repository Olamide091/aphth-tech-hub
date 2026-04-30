<template>
  <div class="card-dark overflow-hidden group relative flex flex-col">

    <!-- Photo area -->
    <div :class="['relative overflow-hidden flex-shrink-0', isCeo ? 'h-64' : 'h-52']"
         style="background: linear-gradient(145deg, #112218 0%, #0B1810 100%);">
      <img
        v-if="member.photo"
        :src="member.photo"
        :alt="member.name"
        class="w-full h-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
      />
      <!-- Fallback avatar -->
      <div v-else class="w-full h-full flex items-center justify-center">
        <div class="w-16 h-16 bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center">
          <span class="font-display text-2xl font-bold text-brand-gold/50">{{ member.name[0] }}</span>
        </div>
      </div>

      <!-- CEO tag -->
      <div v-if="isCeo"
           class="absolute top-3 right-3 bg-brand-gold text-brand-black font-mono text-[8px] font-bold px-2.5 py-1 tracking-[0.15em] uppercase">
        Leadership
      </div>

      <!-- Social overlay on hover -->
      <div class="absolute inset-0 bg-brand-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
        <a v-if="member.linkedin" :href="member.linkedin" target="_blank"
           class="font-mono text-brand-gold text-sm border border-brand-gold/50 w-9 h-9 flex items-center justify-center hover:bg-brand-gold/15 transition-colors"
           @click.stop>in</a>
        <a v-if="member.email" :href="`mailto:${member.email}`"
           class="font-mono text-brand-gold text-sm border border-brand-gold/50 w-9 h-9 flex items-center justify-center hover:bg-brand-gold/15 transition-colors"
           @click.stop>✉</a>
      </div>
    </div>

    <!-- Info -->
    <div class="p-5 flex flex-col flex-1">
      <h3 :class="['font-display font-semibold text-brand-cream mb-1 leading-snug', isCeo ? 'text-xl' : 'text-[16px]']">
        {{ member.name }}
      </h3>
      <p class="font-mono text-brand-gold text-[9px] tracking-[0.16em] uppercase mb-3">{{ member.role }}</p>
      <p v-if="member.bio" class="font-body text-white/45 text-[12px] leading-relaxed flex-1">{{ member.bio }}</p>

      <!-- Expertise -->
      <div v-if="member.expertise?.length" class="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-white/[0.06]">
        <span
          v-for="skill in member.expertise"
          :key="skill"
          class="font-mono text-[8px] text-white/28 border border-white/[0.08] px-2 py-0.5 tracking-wider"
        >
          {{ skill }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  member: { type: Object, required: true },
  isCeo:  { type: Boolean, default: false },
})
</script>
