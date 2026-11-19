<template>
  <Teleport to="body">
    <Transition name="lb">
      <div
        v-if="album"
        ref="dialog"
        class="fixed inset-0 z-[80] flex flex-col outline-none bg-ink-950/95 backdrop-blur-xl"
        role="dialog" aria-modal="true" :aria-label="`${album.title} — media viewer`"
        tabindex="-1"
      >
        <div class="flex items-center justify-between gap-4 px-4 pb-3 pt-[max(1rem,env(safe-area-inset-top))] sm:px-8">
          <div class="min-w-0">
            <p class="truncate text-sm font-medium text-paper">{{ album.title }}</p>
            <p class="truncate font-mono text-[11px] tabular-nums text-haze">
              {{ index + 1 }} / {{ total }}<template v-if="item.type === 'video' && item.title"> · {{ item.title }}</template>
            </p>
          </div>
          <button type="button" class="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-white/15 text-paper hover:bg-white hover:text-ink-950" aria-label="Close viewer" @click="$emit('close')">
            <Icon name="close" class="h-5 w-5" />
          </button>
        </div>

        <div
          class="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-20"
          @click.self="$emit('close')"
          @touchstart.passive="touchStart"
          @touchend="touchEnd"
        >
          <Transition :name="dir" mode="out-in">
            <video
              v-if="item.type === 'video'"
              :key="item.src"
              ref="player"
              :src="item.src" :poster="item.poster"
              controls autoplay playsinline preload="metadata"
              class="max-h-full max-w-full rounded-2xl bg-black shadow-2xl"
            ></video>
            <img v-else :key="item.src" :src="item.src" :alt="item.alt" class="max-h-full max-w-full rounded-2xl object-contain shadow-2xl" />
          </Transition>
          <button type="button" class="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink-950/60 text-paper hover:bg-white hover:text-ink-950 sm:flex" aria-label="Previous" @click="prev">
            <Icon name="arrow-left" class="h-5 w-5" />
          </button>
          <button type="button" class="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink-950/60 text-paper hover:bg-white hover:text-ink-950 sm:flex" aria-label="Next" @click="next">
            <Icon name="arrow" class="h-5 w-5" />
          </button>
        </div>

        <div v-if="total > 1" class="flex gap-2 overflow-x-auto px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 sm:justify-center">
          <button
            v-for="(m, i) in album.media" :key="m.src" type="button"
            :class="['relative h-12 w-16 flex-none overflow-hidden rounded-lg border-2 transition', i === index ? 'border-green-glow' : 'border-transparent opacity-50 hover:opacity-100']"
            :aria-label="m.type === 'video' ? `Video ${i + 1}` : `Photo ${i + 1}`" :aria-current="i === index ? 'true' : undefined"
            @click="go(i)"
          >
            <img :src="m.type === 'video' ? m.poster : m.small" alt="" class="h-full w-full object-cover" loading="lazy" />
            <Icon v-if="m.type === 'video'" name="play" class="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow" />
          </button>
        </div>
        <div v-else class="pb-[max(1.25rem,env(safe-area-inset-bottom))]"></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { lockScroll } from '@/lib/motion'
import Icon from './Icon.vue'

const props = defineProps({ album: Object, index: { type: Number, default: 0 } })
const emit = defineEmits(['close', 'nav'])

const dialog = ref()
const dir = ref('lb-next')
let opener = null

const item = computed(() => props.album.media[props.index])
const total = computed(() => props.album?.media.length ?? 0)

function go(i) { dir.value = i < props.index ? 'lb-prev' : 'lb-next'; emit('nav', i) }
function next() { if (total.value > 1) { dir.value = 'lb-next'; emit('nav', (props.index + 1) % total.value) } }
function prev() { if (total.value > 1) { dir.value = 'lb-prev'; emit('nav', (props.index - 1 + total.value) % total.value) } }

// Swipe left/right on phones (ignored while scrubbing the video's own controls area).
let tx = 0, ty = 0
const touchStart = e => { tx = e.changedTouches[0].clientX; ty = e.changedTouches[0].clientY }
const touchEnd = e => {
  const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty
  if (e.target.tagName === 'VIDEO' && Math.abs(dy) < 40 && e.changedTouches[0].clientY > innerHeight * 0.7) return
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) dx < 0 ? next() : prev()
}

// Keys are handled at window level so they still work while the video player has focus.
function onKey(e) {
  if (!props.album) return
  if (e.key === 'Escape') emit('close')
  else if (e.key === 'ArrowRight' && item.value.type !== 'video') next()
  else if (e.key === 'ArrowLeft' && item.value.type !== 'video') prev()
}
onMounted(() => window.addEventListener('keydown', onKey, true))
onUnmounted(() => window.removeEventListener('keydown', onKey, true))

watch(() => props.album, (a, old) => {
  if (a && !old) {
    opener = document.activeElement
    lockScroll(true)
    nextTick(() => dialog.value?.focus())
  } else if (!a && old) {
    lockScroll(false)
    opener?.focus?.()
  }
})
</script>

<style scoped>
.lb-enter-active, .lb-leave-active { transition: opacity 0.35s ease; }
.lb-enter-from, .lb-leave-to { opacity: 0; }
.lb-next-enter-active, .lb-next-leave-active, .lb-prev-enter-active, .lb-prev-leave-active { transition: opacity 0.25s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
.lb-next-enter-from { opacity: 0; transform: translateX(40px); }
.lb-next-leave-to   { opacity: 0; transform: translateX(-40px); }
.lb-prev-enter-from { opacity: 0; transform: translateX(-40px); }
.lb-prev-leave-to   { opacity: 0; transform: translateX(40px); }
</style>
