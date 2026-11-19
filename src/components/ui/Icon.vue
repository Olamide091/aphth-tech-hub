<template>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <template v-if="name === 'arrow'"><path d="M5 12h14M13 6l6 6-6 6" /></template>
    <template v-else-if="name === 'arrow-up-right'"><path d="M7 17 17 7M8 7h9v9" /></template>
    <template v-else-if="name === 'arrow-left'"><path d="M19 12H5M11 6l-6 6 6 6" /></template>
    <template v-else-if="name === 'close'"><path d="M6 6l12 12M18 6 6 18" /></template>
    <template v-else-if="name === 'plus'"><path d="M12 5v14M5 12h14" /></template>
    <template v-else-if="name === 'play'"><path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" stroke="none" /></template>
    <template v-else-if="name === 'gear'">
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.8v2.4M12 18.8v2.4M21.2 12h-2.4M5.2 12H2.8M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7M18.5 18.5l-1.7-1.7M7.2 7.2 5.5 5.5" />
      <circle cx="12" cy="12" r="6.6" />
    </template>
    <template v-else-if="name === 'code'"><path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4.5l-3 15" /></template>
    <template v-else-if="name === 'flask'"><path d="M9 3h6M10 3v6.2L4.6 18.4A1.7 1.7 0 0 0 6.1 21h11.8a1.7 1.7 0 0 0 1.5-2.6L14 9.2V3M7.2 15h9.6" /></template>
    <template v-else-if="name === 'whatsapp'">
      <path d="M3.5 20.5 5 16.2A8.5 8.5 0 1 1 8 19.3l-4.5 1.2Z" />
      <path d="M9.2 8.6c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.6l-.5.6c-.1.2-.1.4 0 .5.6 1 1.4 1.8 2.4 2.4.2.1.4.1.5 0l.6-.6c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3 0 .6-.5.8-.6.3-1.6.5-2.9-.1a9 9 0 0 1-4.3-4.3c-.6-1.3-.4-2.3-.1-2.9Z" fill="currentColor" stroke="none" />
    </template>
    <template v-else-if="name === 'mail'"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></template>
    <template v-else-if="name === 'phone'"><path d="M5 4h3.5l1.8 4.4-2.2 1.4a11 11 0 0 0 6.1 6.1l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" /></template>
    <template v-else-if="name === 'pin'"><path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></template>
    <template v-else-if="name === 'globe'"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></template>
    <template v-else-if="name === 'clock'"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></template>
    <template v-else-if="name === 'linkedin'">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V16M8 7.6v.1M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.3-2.6s2.2.9 2.2 2.6V16" />
    </template>
    <template v-else-if="name === 'expand'"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></template>
  </svg>
</template>

<script setup>
defineProps({ name: { type: String, required: true } })
</script>
