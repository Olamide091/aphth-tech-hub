// Central animation setup: GSAP + ScrollTrigger + Lenis smooth scrolling,
// plus the v-reveal / v-split / v-magnetic / v-parallax directives.
// Everything here degrades to "no motion" when the visitor prefers reduced motion.
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isTouch =
  typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches

let lenis = null
export const getLenis = () => lenis

export function initSmoothScroll() {
  if (reducedMotion) return null
  document.documentElement.classList.add('motion-ready')

  lenis = new Lenis({ duration: 1.15, easing: t => 1 - Math.pow(1 - t, 4), smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(time => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

// Smoothly scroll to "#id" (falls back to native behaviour without Lenis).
export function scrollToHash(hash, { offset = -72 } = {}) {
  const el = hash === '#hero' || hash === '#' ? 0 : document.querySelector(hash)
  if (el === null) return
  if (lenis) lenis.scrollTo(el, { offset, duration: 1.4 })
  else if (el === 0) window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
  else el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
}

export function lockScroll(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

// ── Directives ────────────────────────────────────────────────────────────────

// v-reveal            → fade + rise when entering the viewport
// v-reveal="0.15"     → with a delay (seconds)
// v-reveal.stagger    → animate direct children one after another
const reveal = {
  mounted(el, binding) {
    if (reducedMotion) return
    const targets = binding.modifiers.stagger ? Array.from(el.children) : [el]
    targets.forEach(t => t.setAttribute('data-reveal', ''))
    el._revealTween = gsap.fromTo(
      targets,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.1, ease: 'expo.out',
        delay: Number(binding.value) || 0,
        stagger: binding.modifiers.stagger ? 0.09 : 0,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      },
    )
  },
  unmounted(el) {
    el._revealTween?.scrollTrigger?.kill()
    el._revealTween?.kill()
  },
}

// v-split → splits text into masked words that slide up when visible.
// v-split.load → plays immediately (for the hero) instead of on scroll.
const split = {
  mounted(el, binding) {
    if (reducedMotion) return
    const words = []
    const walk = node => {
      Array.from(node.childNodes).forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment()
          child.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return }
            const line = document.createElement('span')
            line.className = 'split-line'
            const word = document.createElement('span')
            word.className = 'split-word'
            word.textContent = part
            line.appendChild(word)
            frag.appendChild(line)
            words.push(word)
          })
          child.replaceWith(frag)
        } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'BR') {
          walk(child)
        }
      })
    }
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim())
    walk(el)
    Array.from(el.children).forEach(c => c.setAttribute('aria-hidden', 'true'))

    const vars = {
      yPercent: 0, rotate: 0, duration: 1.25, ease: 'expo.out', stagger: 0.045,
      delay: Number(binding.value) || 0,
    }
    if (!binding.modifiers.load) vars.scrollTrigger = { trigger: el, start: 'top 85%', once: true }
    el._splitTween = gsap.fromTo(words, { yPercent: 110, rotate: 4 }, vars)
  },
  unmounted(el) {
    el._splitTween?.scrollTrigger?.kill()
    el._splitTween?.kill()
  },
}

// v-magnetic → element gently follows the pointer while hovered.
const magnetic = {
  mounted(el, binding) {
    if (reducedMotion || isTouch) return
    const strength = Number(binding.value) || 0.3
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })
    el._onMove = e => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    }
    el._onLeave = () => { xTo(0); yTo(0) }
    el.addEventListener('pointermove', el._onMove)
    el.addEventListener('pointerleave', el._onLeave)
  },
  unmounted(el) {
    el.removeEventListener('pointermove', el._onMove)
    el.removeEventListener('pointerleave', el._onLeave)
  },
}

// v-parallax="-15" → moves the element by that many percent of its height across the viewport.
const parallax = {
  mounted(el, binding) {
    if (reducedMotion) return
    const amount = Number(binding.value) || -12
    el._parallaxTween = gsap.fromTo(el, { yPercent: -amount / 2 }, {
      yPercent: amount / 2, ease: 'none',
      scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true },
    })
  },
  unmounted(el) {
    el._parallaxTween?.scrollTrigger?.kill()
    el._parallaxTween?.kill()
  },
}

export const motionDirectives = { reveal, split, magnetic, parallax }
