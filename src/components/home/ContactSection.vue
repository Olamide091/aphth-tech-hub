<template>
  <section id="contact" class="section overflow-hidden">
    <div class="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-[radial-gradient(ellipse_at_bottom,rgba(0,135,81,0.22),transparent_65%)]" aria-hidden="true"></div>

    <div class="wrap">
      <p class="eyebrow mb-6">Work With Us</p>
      <h2 v-split class="font-display text-display-xl font-semibold text-paper">Let’s build <span class="accent">together.</span></h2>
      <p class="lede mt-8 max-w-2xl" v-reveal>Have a project in mind, want to collaborate, or just want to learn more? We’d love to hear from you.</p>

      <div class="mt-16 grid gap-6 lg:grid-cols-12">
        <!-- Contact information -->
        <div class="space-y-4 lg:col-span-5" v-reveal.stagger>
          <a :href="waLink(whatsapp.general)" target="_blank" rel="noopener" class="group flex items-center justify-between gap-4 rounded-3xl bg-green-glow p-6 text-ink-950 transition-transform duration-500 ease-out-expo hover:-translate-y-1">
            <span class="flex items-center gap-4">
              <Icon name="whatsapp" class="h-8 w-8" />
              <span>
                <span class="block text-lg font-semibold">Chat With Us on WhatsApp</span>
                <span class="block text-sm text-ink-950/70">Fastest way to reach the team</span>
              </span>
            </span>
            <Icon name="arrow-up-right" class="h-6 w-6 transition-transform duration-500 group-hover:rotate-45" />
          </a>

          <dl class="card divide-y divide-line">
            <div class="flex gap-4 p-6">
              <Icon name="pin" class="mt-0.5 h-5 w-5 flex-none text-green-glow" />
              <div><dt class="label">Headquarters</dt><dd class="text-paper"><span v-for="l in contact.address" :key="l" class="block">{{ l }}</span></dd></div>
            </div>
            <div class="flex gap-4 p-6">
              <Icon name="phone" class="mt-0.5 h-5 w-5 flex-none text-green-glow" />
              <div>
                <dt class="label">Phone</dt>
                <dd v-for="p in contact.phones" :key="p.wa"><a :href="waLink(p.wa)" target="_blank" rel="noopener" class="text-paper hover:text-green-glow">{{ p.display }}</a></dd>
              </div>
            </div>
            <div class="flex gap-4 p-6">
              <Icon name="mail" class="mt-0.5 h-5 w-5 flex-none text-green-glow" />
              <div class="min-w-0"><dt class="label">Email</dt><dd><a :href="`mailto:${contact.email}`" class="break-all text-paper hover:text-green-glow">{{ contact.email }}</a></dd></div>
            </div>
            <div class="flex gap-4 p-6">
              <Icon name="globe" class="mt-0.5 h-5 w-5 flex-none text-green-glow" />
              <div><dt class="label">Website</dt><dd class="text-paper">{{ contact.website }}</dd></div>
            </div>
            <div class="flex gap-4 p-6">
              <Icon name="clock" class="mt-0.5 h-5 w-5 flex-none text-green-glow" />
              <div><dt class="label">Office Hours</dt><dd class="text-paper"><span v-for="h in contact.hours" :key="h" class="block">{{ h }}</span></dd></div>
            </div>
          </dl>
        </div>

        <!-- Message form: hands off to WhatsApp or email (no server, nothing stored) -->
        <form class="card p-6 md:p-10 lg:col-span-7" @submit.prevent="send('whatsapp')" v-reveal="0.1">
          <h3 class="font-display text-2xl font-semibold tracking-tight text-paper">Send a Message</h3>
          <p class="mt-2 text-sm text-mist">Your message opens in WhatsApp or your email app, ready to send.</p>

          <div class="mt-8 grid gap-5 sm:grid-cols-2">
            <div>
              <label for="c-first" class="label">First name *</label>
              <input id="c-first" v-model.trim="f.firstName" required autocomplete="given-name" class="field" />
            </div>
            <div>
              <label for="c-last" class="label">Last name *</label>
              <input id="c-last" v-model.trim="f.lastName" required autocomplete="family-name" class="field" />
            </div>
            <div class="sm:col-span-2">
              <label for="c-email" class="label">Email address *</label>
              <input id="c-email" v-model.trim="f.email" type="email" required autocomplete="email" class="field" />
            </div>
            <div class="sm:col-span-2">
              <label for="c-subject" class="label">Subject</label>
              <select id="c-subject" v-model="f.subject" class="field cursor-pointer appearance-none">
                <option value="">Select subject</option>
                <option v-for="s in contact.subjects" :key="s">{{ s }}</option>
              </select>
            </div>
            <div class="sm:col-span-2">
              <label for="c-msg" class="label">Message *</label>
              <textarea id="c-msg" v-model.trim="f.message" required rows="5" class="field resize-y"></textarea>
            </div>
          </div>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="submit" class="btn-primary flex-1"><Icon name="whatsapp" class="h-5 w-5" /> Send via WhatsApp</button>
            <button type="button" class="btn-ghost flex-1" @click="send('email')"><Icon name="mail" class="h-5 w-5" /> Send via Email</button>
          </div>
          <p class="mt-4 min-h-[1.25rem] text-sm text-green-glow" role="status" aria-live="polite">{{ status }}</p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { contact, whatsapp, waLink } from '@/data/site'
import Icon from '@/components/ui/Icon.vue'

const f = reactive({ firstName: '', lastName: '', email: '', subject: '', message: '' })
const status = ref('')

function send(channel) {
  const form = document.querySelector('#contact form')
  if (!form.reportValidity()) return
  const subject = f.subject || 'General Inquiry'
  const body = `${f.message}\n\n— ${f.firstName} ${f.lastName} (${f.email})`
  if (channel === 'whatsapp') {
    window.open(waLink(whatsapp.general, `*${subject}*\n\n${body}`), '_blank', 'noopener')
    status.value = 'WhatsApp opened in a new tab — press send there to deliver your message.'
  } else {
    location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`[Website] ${subject}`)}&body=${encodeURIComponent(body)}`
    status.value = 'Your email app should open with the message ready to send.'
  }
}
</script>
