<template>
  <Teleport to="body">
    <Transition name="modal" @after-leave="restoreFocus">
      <div
        v-if="project"
        class="fixed inset-0 z-[70] flex items-end justify-center bg-ink-950/80 backdrop-blur-md md:items-center md:p-6"
        @click.self="closeProject"
      >
        <div
          ref="dialog"
          role="dialog" aria-modal="true" :aria-labelledby="`pm-title-${project.id}`"
          class="modal-panel relative outline-none focus:outline-none focus-visible:outline-none flex max-h-[94svh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[28px] border border-white/10 bg-ink-850 md:rounded-[28px]"
          tabindex="-1"
          @keydown.tab="trapFocus"
        >
          <button
            type="button"
            class="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ink-950/70 text-paper backdrop-blur transition-colors hover:bg-white hover:text-ink-950"
            aria-label="Close project details"
            @click="closeProject"
          >
            <Icon name="close" class="h-5 w-5" />
          </button>

          <div class="overflow-y-auto overscroll-contain" data-lenis-prevent>
            <!-- Media -->
            <div class="relative aspect-video w-full bg-ink-900">
              <video
                v-if="project.video && showVideo"
                :src="project.video.src" :poster="project.video.poster || project.image?.src"
                class="h-full w-full bg-black object-contain" controls playsinline preload="metadata" autoplay
              ></video>
              <template v-else>
                <ProjectVisual :project="media" large class="h-full w-full" />
                <button
                  v-if="project.video"
                  type="button"
                  class="absolute inset-0 flex items-center justify-center bg-ink-950/30 transition-colors hover:bg-ink-950/10"
                  aria-label="Play project video"
                  @click="showVideo = true"
                >
                  <span class="flex flex-col items-center gap-4">
                    <span class="flex h-20 w-20 items-center justify-center rounded-full bg-green-glow text-ink-950 shadow-[0_0_0_12px_rgba(61,220,151,0.18)]">
                      <Icon name="play" class="ml-1 h-8 w-8" />
                    </span>
                    <span class="rounded-full bg-ink-950/75 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-paper backdrop-blur">
                      Watch video · {{ project.video.durationLabel }}
                    </span>
                  </span>
                </button>
              </template>
            </div>

            <!-- Extra photos -->
            <div v-if="gallery.length > 1" class="flex gap-2 overflow-x-auto px-6 pt-4 md:px-10">
              <button
                v-for="(ph, i) in gallery" :key="ph.src" type="button"
                :class="['h-16 w-24 flex-none overflow-hidden rounded-xl border-2 transition-colors', i === photoIdx && !showVideo ? 'border-green-glow' : 'border-transparent opacity-60 hover:opacity-100']"
                :aria-label="`Show photo ${i + 1}`"
                @click="photoIdx = i; showVideo = false"
              >
                <img :src="ph.small" alt="" class="h-full w-full object-cover" loading="lazy" />
              </button>
            </div>

            <!-- Body -->
            <div class="grid gap-10 p-6 md:grid-cols-12 md:p-10">
              <div class="md:col-span-8">
                <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-green-glow">{{ project.category }}</p>
                <h2 :id="`pm-title-${project.id}`" class="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-paper md:text-4xl">{{ project.title }}</h2>
                <p class="mt-6 text-[17px] leading-relaxed text-mist">{{ project.description }}</p>
              </div>
              <aside class="space-y-6 md:col-span-4">
                <div v-if="project.tech?.length">
                  <p class="label">Technology</p>
                  <ul class="flex flex-wrap gap-1.5">
                    <li v-for="t in project.tech" :key="t" class="chip">{{ t }}</li>
                  </ul>
                </div>
                <a :href="enquireLink(project)" target="_blank" rel="noopener" class="btn-primary w-full">
                  <Icon name="whatsapp" class="h-5 w-5" /> Enquire on WhatsApp
                </a>
                <p class="text-center text-xs text-haze">Opens WhatsApp with this project’s name filled in.</p>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { activeProject as project, closeProject, playOnOpen } from '@/lib/projectModal'
import { enquireLink } from '@/lib/enquire'
import { lockScroll } from '@/lib/motion'
import ProjectVisual from './ProjectVisual.vue'
import Icon from '@/components/ui/Icon.vue'

const dialog = ref()
const showVideo = ref(false)
const photoIdx = ref(0)
let opener = null

const gallery = computed(() => {
  const p = project.value
  if (!p) return []
  return [p.image, ...(p.photos || [])].filter(Boolean)
})
// Feed ProjectVisual the selected photo while keeping the project's other fields.
const media = computed(() => ({ ...project.value, image: gallery.value[photoIdx.value] || project.value?.image, video: null }))

watch(project, (p, old) => {
  if (p && !old) {
    opener = document.activeElement
    lockScroll(true)
  }
  if (!p) lockScroll(false)
  showVideo.value = !!p && playOnOpen.value
  photoIdx.value = 0
  if (p) nextTick(() => dialog.value?.focus())
})

// Escape closes even when the video player has focus (it swallows key events).
const onKey = e => { if (e.key === 'Escape' && project.value) closeProject() }
onMounted(() => window.addEventListener('keydown', onKey, true))
onUnmounted(() => window.removeEventListener('keydown', onKey, true))

function restoreFocus() { opener?.focus?.(); opener = null }

function trapFocus(e) {
  const els = dialog.value.querySelectorAll('button, a[href], video[controls], [tabindex]:not([tabindex="-1"])')
  if (!els.length) return
  const first = els[0], last = els[els.length - 1]
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.modal-enter-active .modal-panel, .modal-leave-active .modal-panel { transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .modal-panel { transform: translateY(60px) scale(0.98); }
.modal-leave-to .modal-panel { transform: translateY(30px); }
</style>
