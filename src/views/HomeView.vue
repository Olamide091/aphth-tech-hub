<template>
  <main id="main">
    <HeroSection :ready="ready" />
    <MarqueeStrip />
    <AboutSection />
    <ServicesSection />
    <ProjectStory />
    <ProjectsSection />
    <GallerySection />
    <TeamSection />
    <ContactSection />
    <ProjectModal />
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import HeroSection from '@/components/home/HeroSection.vue'
import MarqueeStrip from '@/components/home/MarqueeStrip.vue'
import AboutSection from '@/components/home/AboutSection.vue'
import ServicesSection from '@/components/home/ServicesSection.vue'
import ProjectStory from '@/components/home/ProjectStory.vue'
import ProjectsSection from '@/components/home/ProjectsSection.vue'
import GallerySection from '@/components/home/GallerySection.vue'
import TeamSection from '@/components/home/TeamSection.vue'
import ContactSection from '@/components/home/ContactSection.vue'
import ProjectModal from '@/components/projects/ProjectModal.vue'
import { scrollToHash, ScrollTrigger } from '@/lib/motion'

defineProps({ ready: Boolean })

onMounted(() => {
  window.dispatchEvent(new Event('home:mounted'))
  // Deep links such as /#team — wait for layout and pinned sections to settle.
  if (location.hash) {
    setTimeout(() => { ScrollTrigger.refresh(); scrollToHash(location.hash) }, 400)
  }
})
</script>
