<template>
  <section id="contact" class="section-padding bg-brand-dark relative">

    <!-- Top line -->
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent"></div>

    <div class="section-inner">

      <!-- HEADER -->
      <div class="text-center mb-14">
        <div class="flex items-center justify-center gap-3 mb-4">
          <span class="gold-line"></span>
          <span class="section-label">Work With Us</span>
          <span class="gold-line"></span>
        </div>

        <h2 class="heading-lg mb-4">Get In Touch</h2>

        <p class="font-body text-white/50 max-w-md mx-auto text-sm leading-relaxed">
          Have a project in mind, want to collaborate, or just want to learn more?
          We’d love to hear from you.
        </p>
      </div>

      <!-- CONTENT -->
      <div class="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">

        <!-- LEFT SIDE -->
        <div>
          <h3 class="font-display text-xl font-semibold text-brand-cream mb-7">
            Contact Information
          </h3>

          <div class="space-y-6 mb-10">

            <!-- LOCATION -->
            <div class="flex gap-4">
              <div class="icon-box">📍</div>
              <div>
                <p class="label">Headquarters</p>
                <p class="value">
                  OAU Campus<br />
                  Ile-Ife, Osun State<br />
                  Nigeria
                </p>
              </div>
            </div>

            <!-- PHONE -->
            <div class="flex gap-4">
              <div class="icon-box">📞</div>
              <div>
                <p class="label">Phone</p>
                <p class="value">
                  <a href="https://wa.me/2348035645318" target="_blank">
                    +234 803 564 5318
                  </a><br />
                  <a href="https://wa.me/2347035478843" target="_blank">
                    +234 703 547 8843
                  </a>
                </p>
              </div>
            </div>

            <!-- EMAIL -->
            <div class="flex gap-4">
              <div class="icon-box">✉</div>
              <div>
                <p class="label">Email</p>
                <p class="value">
                  <a href="mailto:africanprohumanityhub@gmail.com">
                    africanprohumanityhub@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <!-- WEBSITE -->
            <div class="flex gap-4">
              <div class="icon-box">🌐</div>
              <div>
                <p class="label">Website</p>
                <p class="value">
                  <a href="https://africanprohumanitytechhub.org/" target="_blank">
                    africanprohumanitytechhub.org
                  </a>
                </p>
              </div>
            </div>

            <!-- HOURS -->
            <div class="flex gap-4">
              <div class="icon-box">🕒</div>
              <div>
                <p class="label">Office Hours</p>
                <p class="value">
                  Monday – Friday: 8:00 AM – 6:00 PM<br />
                  WAT (West Africa Time)
                </p>
              </div>
            </div>

          </div>

          <!-- CTA -->
          <a
            href="https://wa.me/2349037022997"
            target="_blank"
            class="btn-gold inline-block"
          >
            Chat With Us on WhatsApp
          </a>
        </div>

        <!-- RIGHT SIDE (FORM) -->
        <div>
          <h3 class="font-display text-xl font-semibold text-brand-cream mb-7">
            Send a Message
          </h3>

          <form @submit.prevent="handleSubmit" class="space-y-5">

            <div class="grid grid-cols-2 gap-4">
              <input v-model="form.firstName" placeholder="First Name" class="input-field" required />
              <input v-model="form.lastName" placeholder="Last Name" class="input-field" required />
            </div>

            <input v-model="form.email" type="email" placeholder="Email Address" class="input-field" required />

            <select v-model="form.subject" class="input-field">
              <option disabled value="">Select subject</option>
              <option>Project Collaboration</option>
              <option>Partnership</option>
              <option>General Inquiry</option>
            </select>

            <textarea
              v-model="form.message"
              rows="5"
              placeholder="Your message..."
              class="input-field"
              required
            ></textarea>

            <button type="submit" class="btn-gold w-full py-3">
              Send Message
            </button>

          </form>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
})

function handleSubmit() {
  console.log('Message:', form)
  alert('Message sent successfully!')
}
</script>

<style scoped>
.label {
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(201,146,42,0.7);
}

.value {
  color: rgba(255,255,255,0.7);
  font-size: 14px;
}

.icon-box {
  width: 36px;
  height: 36px;
  background: rgba(201,146,42,0.1);
  border: 1px solid rgba(201,146,42,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>