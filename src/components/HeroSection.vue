<template>
  <section id="hero" class="relative min-h-screen flex items-center overflow-hidden bg-[#0b0f19]">

    <!-- Background image -->
    <div class="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80"
        alt="Engineering background"
        class="w-full h-full object-cover opacity-[0.45]"
      />

      <!-- Improved gradients (no blue wash) -->
      <div class="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/70 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-[#0b0f19]/30"></div>

      <!-- Subtle grid -->
      <div
        class="absolute inset-0 opacity-[0.015]"
        style="background-image: linear-gradient(#C9922A 1px, transparent 1px), linear-gradient(90deg, #C9922A 1px, transparent 1px); background-size: 72px 72px;">
      </div>
    </div>

    <!-- Corner accent -->
    <div class="absolute top-[68px] left-6 md:left-12 lg:left-20 w-32 h-32 border-l border-t border-brand-gold/20 z-10 pointer-events-none"></div>

    <!-- Main content -->
    <div class="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-20 pt-36 pb-28">
      <div class="max-w-2xl mx-auto md:mx-0 md:ml-20 lg:ml-28">

        <!-- Eyebrow -->
        <div class="label-row animate-fade-up" style="animation-delay:0.1s; opacity:0; animation-fill-mode:forwards;">
          <span class="gold-line"></span>
          <span class="section-label">Engineer Africa’s Future</span>
        </div>

        <!-- Headline (stronger) -->
        <h1 class="heading-xl mb-7 animate-fade-up" style="animation-delay:0.25s; opacity:0; animation-fill-mode:forwards;">
          Building Africa’s<br />
          <span class="text-brand-gold">Engineering Future</span>
        </h1>

        <!-- Subtext -->
        <p class="font-body text-white/80 text-base md:text-lg leading-relaxed mb-10 max-w-lg animate-fade-up"
           style="animation-delay:0.4s; opacity:0; animation-fill-mode:forwards;">
          A professional engineering organization delivering innovation through precision mechanics,
          human-centered design, and scalable technology solutions built for Africa and the world.
        </p>

        <!-- Buttons -->
        <div class="flex flex-wrap gap-3 mb-20 animate-fade-up"
             style="animation-delay:0.52s; opacity:0; animation-fill-mode:forwards;">
          <a href="#projects" class="btn-gold">Explore Projects</a>
          <a href="#contact" class="btn-ghost">Partner With Us</a>
        </div>

        <!-- Stats -->
        <div class="flex flex-wrap gap-8 pt-8 border-t border-white/[0.08] animate-fade-up"
             style="animation-delay:0.65s; opacity:0; animation-fill-mode:forwards;">
          <div v-for="(stat, i) in stats" :key="stat.label" class="flex flex-col">
            <span class="font-display text-3xl font-bold text-brand-gold leading-none">
              {{ stat.value }}
            </span>
            <span class="font-mono text-white/40 text-[10px] tracking-[0.18em] uppercase mt-2">
              {{ stat.label }}
            </span>
          </div>
        </div>

      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
         style="animation: fadeIn 0.6s ease 1.1s forwards; opacity:0;">
      <span class="font-mono text-white/30 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
      <div class="w-px h-8 bg-gradient-to-b from-brand-gold/60 to-transparent"></div>
    </div>

  </section>
</template>

<script setup>
const stats = [
  { value: '10+',  label: 'Projects Delivered' },
  { value: '2+',   label: 'Years of Excellence' },
  { value: '30+',  label: 'Team Members' },
  { value: '100%', label: 'African-Led' },
]
</script>