<template>
  <section id="projects" class="section">
    <div class="wrap">
      <div class="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-7">
          <p class="eyebrow mb-6">{{ projectsIntro.eyebrow }}</p>
          <h2 v-split class="h-section">Featured <span class="accent">Projects</span></h2>
        </div>
        <p class="lede lg:col-span-5" v-reveal="0.1">{{ projectsIntro.body }}</p>
      </div>

      <!-- Filters -->
      <div class="mt-14 flex flex-wrap items-center gap-2" role="toolbar" aria-label="Filter projects by category" v-reveal>
        <button
          v-for="c in categories" :key="c"
          type="button"
          :aria-pressed="active === c"
          :class="[
            'rounded-full border px-4 py-2 text-[13px] transition-all duration-300',
            active === c ? 'border-green-glow bg-green-glow text-ink-950' : 'border-white/10 text-mist hover:border-white/30 hover:text-paper',
          ]"
          @click="active = c"
        >
          {{ c }}
          <span :class="['ml-1.5 font-mono text-[10px]', active === c ? 'text-ink-950/60' : 'text-haze']">{{ count(c) }}</span>
        </button>
      </div>

      <TransitionGroup tag="ul" name="grid" class="relative mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="p in filtered" :key="p.id">
          <ProjectCard :project="p" />
        </li>
      </TransitionGroup>

      <!-- CTA -->
      <div class="mt-20 flex flex-col items-start justify-between gap-6 rounded-[28px] border border-line bg-gradient-to-br from-green/15 via-ink-800 to-ink-800 p-8 md:flex-row md:items-center md:p-12" v-reveal>
        <div>
          <p class="font-display text-2xl font-semibold tracking-tight text-paper md:text-3xl">Have a unique engineering challenge?</p>
          <p class="mt-2 text-mist">Tell us about it — we design and build solutions for real-world problems.</p>
        </div>
        <a v-magnetic href="#contact" class="btn-primary" @click.prevent="scrollToHash('#contact')">
          Discuss a Customized Project <Icon name="arrow" class="h-4 w-4" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { projects, projectsIntro } from '@/data/projects'
import { scrollToHash, ScrollTrigger } from '@/lib/motion'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import Icon from '@/components/ui/Icon.vue'

const active = ref('All')
const categories = ['All', ...new Set(projects.map(p => p.category))]
const filtered = computed(() => active.value === 'All' ? projects : projects.filter(p => p.category === active.value))
const count = c => c === 'All' ? projects.length : projects.filter(p => p.category === c).length

// Page height changes when filtering — keep later scroll animations aligned.
watch(active, () => nextTick(() => setTimeout(() => ScrollTrigger.refresh(), 650)))
</script>

<style scoped>
.grid-move, .grid-enter-active, .grid-leave-active { transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s; }
.grid-enter-from { opacity: 0; transform: translateY(30px) scale(0.97); }
.grid-leave-to { opacity: 0; transform: scale(0.95); }
.grid-leave-active { position: absolute; visibility: hidden; }
</style>
