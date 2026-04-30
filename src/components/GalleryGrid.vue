<template>
  <section id="gallery" class="section-padding bg-brand-dark">

    <div class="section-inner">

      <!-- HEADER -->
      <div class="flex justify-between items-end mb-12">
        <div>
          <h2 class="heading-lg">Gallery</h2>
        </div>
        <p class="text-white/50 text-sm max-w-xs">
          Moments from our workshops, fabrication labs, and events.
        </p>
      </div>

      <!-- SECTIONS -->
      <div v-for="gallery in galleries" :key="gallery._id" class="mb-10">

        <h3 class="text-brand-gold mb-3">{{ gallery.title }}</h3>

        <!-- ONLY ONE IMAGE -->
        <div
          class="relative cursor-pointer group"
          @click="openGallery(gallery)"
        >
          <img
            :src="gallery.images[0]?.url"
            class="w-full h-[250px] object-cover rounded"
          />

          <!-- overlay -->
          <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
            <span class="text-white text-sm">
              View {{ gallery.images.length }} photos
            </span>
          </div>
        </div>

      </div>

    </div>

    <!-- FULL SECTION VIEW -->
    <div v-if="activeGallery" class="fixed inset-0 bg-black z-50 p-6 overflow-auto">

      <button
        @click="activeGallery = null"
        class="text-white mb-4"
      >
        ✕ Close
      </button>

      <h2 class="text-brand-gold mb-6">
        {{ activeGallery.title }}
      </h2>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <img
          v-for="(img, i) in activeGallery.images"
          :key="i"
          :src="img.url"
          class="w-full h-[200px] object-cover cursor-pointer"
          @click="lightboxItem = img"
        />
      </div>

    </div>

    <!-- LIGHTBOX -->
    <div
      v-if="lightboxItem"
      class="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center"
      @click="lightboxItem = null"
    >
      <img
        :src="lightboxItem.url"
        class="max-h-[90vh] max-w-[90vw]"
      />
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { client } from '../sanity'

const galleries = ref([])
const activeGallery = ref(null)
const lightboxItem = ref(null)

const openGallery = (gallery) => {
  activeGallery.value = gallery
}

onMounted(async () => {
  const data = await client.fetch(`*[_type == "gallery"]{
    _id,
    title,
    images[]{
      "url": asset->url
    }
  }`)

  galleries.value = data
})
</script>