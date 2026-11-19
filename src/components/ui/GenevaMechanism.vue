<!--
  A geometrically correct 6-slot Geneva drive, rendered in SVG.
  `angle` is the driver crank angle in degrees; the wheel indexes 60° per crank revolution,
  staying locked between engagements — exactly like the real mechanism.
-->
<template>
  <svg :viewBox="`${-A * 1.3} ${-R - 0.12} ${C + R + A * 1.3 + 0.12} ${(R + 0.12) * 2}`" role="img" aria-label="Animated Geneva mechanism illustration">
    <defs>
      <radialGradient id="gm-wheel" cx="35%" cy="30%" r="80%">
        <stop offset="0%" stop-color="#1F3A2E" />
        <stop offset="100%" stop-color="#0B1712" />
      </radialGradient>
      <linearGradient id="gm-driver" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#E8C27A" />
        <stop offset="100%" stop-color="#9E7428" />
      </linearGradient>
      <mask id="gm-wheel-mask">
        <path :d="wheelOutline" fill="#fff" />
        <g fill="#000">
          <rect
            v-for="i in N" :key="i"
            :x="slotInner" :y="-SLOT_W / 2" :width="R" :height="SLOT_W" :rx="SLOT_W / 2"
            :transform="`rotate(${(i - 1) * 60 + 30})`"
          />
        </g>
        <circle r="0.13" fill="#000" />
      </mask>
      <mask id="gm-driver-mask">
        <circle :r="LOCK_R" fill="#fff" />
        <circle :cx="Math.cos(rad) * C" :cy="Math.sin(rad) * C" :r="R * 1.02" fill="#000" />
      </mask>
    </defs>

    <!-- Construction lines -->
    <g stroke="rgba(214,236,224,0.12)" stroke-width="0.008" fill="none" stroke-dasharray="0.04 0.04">
      <line :x1="-A * 1.2" y1="0" :x2="C + R * 1.1" y2="0" />
      <circle :r="A" />
      <circle :cx="C" :r="R" />
    </g>

    <!-- Geneva wheel -->
    <g :transform="`translate(${C} 0) rotate(${wheelAngle})`">
      <rect :x="-R" :y="-R" :width="R * 2" :height="R * 2" fill="url(#gm-wheel)" mask="url(#gm-wheel-mask)" />
      <path :d="wheelOutline" fill="none" stroke="#3DDC97" stroke-opacity="0.55" stroke-width="0.012" />
      <circle r="0.24" fill="none" stroke="#3DDC97" stroke-opacity="0.35" stroke-width="0.01" />
    </g>

    <!-- Driver: locking disc + crank + pin -->
    <g>
      <circle :r="LOCK_R" fill="#0E1A15" mask="url(#gm-driver-mask)" />
      <circle :r="LOCK_R" fill="none" stroke="#D4A24C" stroke-opacity="0.35" stroke-width="0.01" mask="url(#gm-driver-mask)" />
      <g :transform="`rotate(${angle})`">
        <path :d="`M 0 -0.11 L ${A} -0.07 L ${A} 0.07 L 0 0.11 Z`" fill="url(#gm-driver)" />
        <circle :cx="A" r="0.1" fill="#E8C27A" />
        <circle :cx="A" r="0.04" fill="#5C4416" />
      </g>
      <circle r="0.13" fill="#E8C27A" />
      <circle r="0.05" fill="#3A2B0D" />
    </g>
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ angle: { type: Number, default: 0 } })

const N = 6
const A = 1                          // crank radius
const C = A / Math.sin(Math.PI / N)  // centre distance (= 2 for 6 slots)
const R = Math.sqrt(C * C - A * A)   // wheel radius (pin enters slot tangentially)
const LOCK_R = 0.72                  // locking disc radius
const SLOT_W = 0.22
const slotInner = C - A - SLOT_W / 2
const ENGAGE = Math.PI / 2 - Math.PI / N // ±60° of crank travel while engaged

const rad = computed(() => (props.angle * Math.PI) / 180)

// Concave locking arcs between slots: circle of radius LOCK_R at distance C from the wheel centre.
const wheelOutline = (() => {
  const pts = []
  const steps = 360
  for (let s = 0; s <= steps; s++) {
    const t = (s / steps) * Math.PI * 2
    // nearest arc centre: mid-angle between slots (slots at 30°, 90°, ... so mids at 0°, 60°, ...)
    const mid = Math.round(t / (Math.PI / 3)) * (Math.PI / 3)
    const d = t - mid
    const disc = LOCK_R * LOCK_R - C * C * Math.sin(d) ** 2
    let r = R
    if (disc > 0) r = Math.min(R, C * Math.cos(d) - Math.sqrt(disc))
    pts.push(`${(r * Math.cos(t)).toFixed(4)} ${(r * Math.sin(t)).toFixed(4)}`)
  }
  return `M ${pts.join(' L ')} Z`
})()

// Wheel angle (degrees) for a crank angle. The pin points at the wheel centre when the crank is at 0°.
const wheelAngle = computed(() => {
  const total = rad.value
  const k = Math.floor((total + Math.PI) / (2 * Math.PI))  // completed revolutions
  const theta = total - k * 2 * Math.PI                     // −π … π
  let local
  if (theta < -ENGAGE) local = Math.PI / N
  else if (theta > ENGAGE) local = -Math.PI / N
  else local = Math.atan2(A * Math.sin(theta), A * Math.cos(theta) - C) - Math.PI
  // normalise into (−π, π]
  local = Math.atan2(Math.sin(local), Math.cos(local))
  // The engaged slot (drawn at 30° in the wheel's frame) must point along wheel→pin,
  // i.e. at (local + 180°) in world space → base rotation of 180° − 30° = 150°.
  return ((-k * (2 * Math.PI / N) + local) * 180) / Math.PI + 150
})
</script>
