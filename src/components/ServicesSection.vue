<template>
  <!-- Services: SAME base color as hero for consistency -->
  <section id="services" class="section-padding bg-[#0b0f19] relative border-t border-white/[0.05]">

    <div class="section-inner">

      <!-- Header -->
      <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">

        <!-- Left -->
        <div class="max-w-xl">
          <div class="label-row mb-3">
            <span class="gold-line"></span>
            <span class="section-label">What We Do</span>
          </div>

          <h2 class="heading-lg leading-tight">
            Our Core Services
          </h2>
        </div>

        <!-- Right -->
        <p class="font-body text-white/60 text-sm md:text-base leading-relaxed max-w-md lg:text-right">
          From mechanical engineering to digital solutions — precision,
          innovation, and expertise across every discipline.
        </p>

      </div>

      <!-- Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <ServiceCard
          v-for="(service, i) in services"
          :key="service.title"
          v-bind="service"
          :index="i"
        />

      </div>

    </div>
  </section>
</template>

<script setup>
import ServiceCard from './ServiceCard.vue'

const services = [
  {
    title: 'Mechanical Engineering',
    description: 'Design and fabrication of precision mechanical systems — gear mechanisms, linkages, and industrial machinery components optimized for African manufacturing contexts.',
    icon: '⚙️',
    tags: ['CAD Design', 'Fabrication', 'Mechanism Design'],
  },
  {
    title: 'Tech Solutions & Software',
    description: 'Scalable digital platforms, automation tools, and data systems that empower organizations across Africa with modern technology infrastructure built to last.',
    icon: '💻',
    tags: ['Web Apps', 'Automation', 'Data Systems'],
  },
  {
    title: 'Research & Innovation',
    description: 'Applied research in engineering, materials science, and sustainable technology — solutions rooted in African contexts meeting global standards.',
    icon: '🔬',
    tags: ['R&D', 'Prototyping', 'Sustainability'],
  },
]
</script>