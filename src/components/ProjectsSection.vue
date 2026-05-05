<template>
  <section id="projects" class="section-padding bg-brand-black relative">
    <div class="section-inner">

```
  <!-- Header -->
  <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
    <div>
      <div class="label-row">
        <span class="gold-line"></span>
        <span class="section-label">Engineering Work</span>
      </div>
      <h2 class="heading-lg">Featured Projects</h2>
    </div>
    <p class="font-body text-white/50 text-sm leading-relaxed max-w-xs">
      Precision-engineered models, mechanisms, and digital systems solving real-world challenges.
    </p>
  </div>

  <!-- PROJECTS (FROM SANITY) -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

    <div 
      v-for="project in projects" 
      :key="project._id" 
      class="bg-white/5 p-4 rounded-lg border border-white/10 hover:border-brand-gold/40 transition"
    >

      <img 
        :src="project.imageUrl" 
        class="w-full h-48 object-cover rounded mb-4"
      />

      <h3 class="text-white text-lg font-bold mb-2">
        {{ project.title }}
      </h3>

      <p class="text-white/60 text-sm mb-3">
        {{ project.description }}
      </p>

      <p class="text-brand-gold font-semibold mb-4">
        {{ project.currency === 'USD' ? '$' : '₦' }} {{ project.price }}
      </p>

      <a 
        :href="project.buyLink" 
        target="_blank"
        class="inline-block bg-brand-gold text-black px-4 py-2 text-sm font-semibold hover:opacity-90"
      >
        Buy Now
      </a>

    </div>

  </div>

  <!-- CTA -->
  <div class="mt-14 pt-10 border-t border-white/[0.06] text-center">
    <p class="font-body text-white/40 text-sm mb-4">
      Have a unique engineering challenge?
    </p>
    <a href="#contact" class="btn-ghost">
      Discuss a Customized Project
    </a>
  </div>

</div>
```

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { client } from '../sanity'

const projects = ref([])

onMounted(async () => {
  const data = await client.fetch(`*[_type == "project"]{
    _id,
    title,
    description,
    price,
    "imageUrl": image.asset->url,
    buyLink
  }`)

  console.log(data) // 🔥 IMPORTANT (to confirm)

  projects.value = data
})
</script>
<style scoped>
</style>
