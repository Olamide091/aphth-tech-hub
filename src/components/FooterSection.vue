<template>
  <footer class="bg-brand-dark border-t border-white/[0.06]">

    <!-- Top line -->
    <div class="h-px bg-gradient-to-r from-transparent via-brand-gold/25 to-transparent"></div>

    <!-- Main -->
    <div class="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        <!-- Brand -->
        <div>
          <a href="/" class="flex items-center gap-3 mb-5 group">
            <div class="w-9 h-9 bg-brand-gold flex items-center justify-center font-bold text-black">
              A
            </div>
            <div>
              <p class="font-display text-brand-cream font-bold text-[13px]">African Pro Humanity</p>
              <p class="text-brand-gold text-[9px] uppercase tracking-[0.2em]">Tech Hub</p>
            </div>
          </a>

          <p class="text-white/40 text-sm max-w-[260px] mb-6">
            Engineering Africa's future through innovation, design, and sustainable technology.
          </p>

          <!-- ONLY LINKEDIN -->
          <a
            href="https://linkedin.com/in/adam-muritala-9bb7743a"
            target="_blank"
            class="inline-flex items-center gap-2 border border-white/10 px-4 py-2 text-white/60 text-sm hover:text-brand-gold hover:border-brand-gold transition"
          >
            LinkedIn →
          </a>
        </div>

        <!-- Navigation -->
        <div>
          <p class="text-brand-gold text-xs uppercase tracking-[0.2em] mb-5">Navigation</p>
          <ul class="space-y-3 text-white/50 text-sm">
            <li><a href="#hero" class="hover:text-white">Home</a></li>
            <li><a href="#services" class="hover:text-white">Services</a></li>
            <li><a href="#projects" class="hover:text-white">Projects</a></li>
            <li><a href="#gallery" class="hover:text-white">Gallery</a></li>
            <li><a href="#team" class="hover:text-white">Team</a></li>
            <li><a href="#contact" class="hover:text-white">Contact</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <p class="text-brand-gold text-xs uppercase tracking-[0.2em] mb-5">Contact</p>

          <ul class="space-y-3 text-white/50 text-sm">
            <li>📧 africanprohumanityhub@gmail.com</li>
            <li>
              📞 +2348035645318<br />
              +2347035478843
            </li>
            <li>
              📍 OAU Campus<br />
              Ile-Ife, Osun State<br />
              Nigeria
            </li>
          </ul>
        </div>

      </div>
    </div>

    <!-- Bottom -->
    <div class="border-t border-white/[0.05] px-6 md:px-12 lg:px-20 py-5">
      <div class="max-w-6xl mx-auto flex justify-between items-center">

        <p class="text-white/30 text-xs">
          © {{ new Date().getFullYear() }} APHTH Tech Hub
        </p>

        <p class="text-white/20 text-xs">
          Built with precision ⚙️
        </p>

      </div>
    </div>

  </footer>
</template>