<template>
  <section id="team" class="section">
    <div class="wrap">
      <div class="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-7">
          <p class="eyebrow mb-6">{{ teamIntro.eyebrow }}</p>
          <h2 v-split class="h-section">Meet the <span class="accent">Team</span></h2>
        </div>
        <p class="lede lg:col-span-5" v-reveal="0.1">{{ teamIntro.body }}</p>
      </div>

      <!-- Founder -->
      <article class="mt-16 grid overflow-hidden rounded-[32px] border border-line bg-ink-800/70 lg:grid-cols-12" v-reveal>
        <div class="relative aspect-[4/5] overflow-hidden sm:aspect-[16/11] lg:col-span-5 lg:aspect-auto lg:min-h-[34rem]">
          <img
            v-if="founder.photo" v-parallax="-10"
            :src="founder.photo.src" :srcset="founder.photo.srcset" sizes="(min-width:1024px) 40vw, 100vw"
            :alt="founder.photo.alt" loading="lazy" decoding="async"
            class="absolute inset-x-0 -top-[6%] h-[112%] w-full object-cover object-[50%_0%]"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink-800/40"></div>
          <span class="absolute bottom-5 left-5 rounded-full bg-green-glow px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-950">{{ founder.title }}</span>
        </div>

        <div class="flex flex-col p-7 md:p-12 lg:col-span-7">
          <h3 class="font-display text-3xl font-semibold leading-tight tracking-tight text-paper md:text-[2.6rem]">{{ founder.name }}</h3>
          <p class="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-green-glow">{{ founder.role }}</p>
          <p class="mt-6 text-[17px] leading-relaxed text-mist">{{ founder.bio }}</p>
          <ul class="mt-6 flex flex-wrap gap-2">
            <li v-for="s in founder.skills" :key="s" class="chip">{{ s }}</li>
          </ul>

          <!-- Founder's message (expandable) -->
          <div class="mt-8 rounded-2xl border border-line bg-ink-900/60">
            <button
              type="button"
              class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-paper"
              :aria-expanded="messageOpen" aria-controls="founder-message"
              @click="toggleMessage"
            >
              View Message from the Founder
              <Icon name="plus" :class="['h-5 w-5 flex-none text-green-glow transition-transform duration-500', messageOpen && 'rotate-45']" />
            </button>
            <div id="founder-message" ref="messageEl" class="grid transition-[grid-template-rows] duration-700 ease-out-expo" :style="{ gridTemplateRows: messageOpen ? '1fr' : '0fr' }">
              <div class="overflow-hidden">
                <div class="space-y-4 border-t border-line px-5 pb-6 pt-5 font-serif text-xl leading-relaxed text-paper/85">
                  <p v-for="(para, i) in founder.message" :key="i">{{ para }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 flex flex-wrap gap-3">
            <a :href="founder.contact" target="_blank" rel="noopener" class="btn-primary btn-sm"><Icon name="whatsapp" class="h-4 w-4" /> Contact CEO</a>
            <a :href="founder.linkedin" target="_blank" rel="noopener" class="btn-ghost btn-sm"><Icon name="linkedin" class="h-4 w-4" /> LinkedIn</a>
          </div>
        </div>
      </article>

      <!-- Core team -->
      <h3 class="mt-24 font-display text-2xl font-semibold tracking-tight text-paper" v-reveal>Core Team Members</h3>
      <ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" v-reveal.stagger>
        <li v-for="m in members" :key="m.name" class="group card flex flex-col p-7 transition-[border-color,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:border-green-glow/30">
          <div class="flex items-center gap-4">
            <img v-if="m.photo" :src="m.photo.small" :alt="m.photo.alt" class="h-16 w-16 rounded-2xl object-cover" loading="lazy" />
            <span v-else class="flex h-16 w-16 flex-none items-center justify-center rounded-2xl border border-green-glow/20 bg-gradient-to-br from-green/30 to-ink-700 font-display text-xl font-semibold text-paper" aria-hidden="true">
              {{ initials(m.name) }}
            </span>
            <div class="min-w-0">
              <p class="font-display text-lg font-semibold leading-tight tracking-tight text-paper">{{ m.name }}</p>
              <p class="mt-1 font-mono text-[10.5px] uppercase leading-snug tracking-[0.14em] text-green-glow">{{ m.role }}</p>
            </div>
          </div>
          <p class="mt-5 flex-1 text-[15px] leading-relaxed text-mist">{{ m.bio }}</p>
          <ul class="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-5">
            <li v-for="s in m.skills" :key="s" class="chip">{{ s }}</li>
          </ul>
          <a v-if="m.linkedin" :href="m.linkedin" target="_blank" rel="noopener" class="mt-5 inline-flex items-center gap-2 text-sm text-mist hover:text-green-glow">
            <Icon name="linkedin" class="h-4 w-4" /> LinkedIn
          </a>
        </li>

        <!-- Join CTA tile -->
        <li class="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-green-glow/25 bg-gradient-to-br from-green/25 via-ink-800 to-ink-800 p-7">
          <div>
            <p class="font-mono text-[10.5px] uppercase tracking-[0.2em] text-green-glow">{{ joinCta.eyebrow }}</p>
            <p class="mt-4 font-display text-2xl font-semibold tracking-tight text-paper">{{ joinCta.title }}</p>
            <p class="mt-3 text-[15px] leading-relaxed text-mist">{{ joinCta.body }}</p>
          </div>
          <a href="#contact" class="btn-primary btn-sm mt-8 self-start" @click.prevent="scrollToHash('#contact')">Apply to Join <Icon name="arrow" class="h-4 w-4" /></a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { founder, members, teamIntro, joinCta } from '@/data/team'
import { scrollToHash, ScrollTrigger } from '@/lib/motion'
import Icon from '@/components/ui/Icon.vue'

const messageOpen = ref(false)
const messageEl = ref()

function toggleMessage() {
  messageOpen.value = !messageOpen.value
  // Section height changes → update pinned sections below after the transition.
  nextTick(() => setTimeout(() => ScrollTrigger.refresh(), 750))
}

const initials = name => name.replace(/^(Engr\.|Mr|Mrs|Ms|Dr|Prof\.?)\s+/i, '').split(/\s+/).filter(w => /^[A-Z]/.test(w)).slice(0, 2).map(w => w[0]).join('')
</script>
