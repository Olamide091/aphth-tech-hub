<template>
  <section id="team" class="section-padding bg-brand-black relative">

    <div class="section-inner">

      <!-- HEADER -->
      <div class="text-center mb-16">
        <div class="flex items-center justify-center gap-3 mb-4">
          <span class="gold-line"></span>
          <span class="section-label">The People Behind APHTH</span>
          <span class="gold-line"></span>
        </div>
        <h2 class="heading-lg mb-4">Meet the Team</h2>
        <p class="font-body text-white/50 max-w-md mx-auto text-sm leading-relaxed">
          Driven engineers and innovators building technology that serves humanity from Africa.
        </p>
      </div>

      <!-- CEO SECTION -->
      <div class="mb-16 grid md:grid-cols-[1.2fr_2fr] bg-brand-charcoal border border-white/[0.07] overflow-hidden">

        <!-- IMAGE -->
        <div class="relative min-h-[320px]">
          <img
            src="/ceoImg.png"
            alt="CEO"
            class="absolute inset-0 w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-[#08120E] via-transparent to-transparent opacity-80"></div>
        </div>

        <!-- INFO -->
        <div class="p-8">

          <span class="section-label block mb-2">
            Founder & CEO
          </span>

          <h3 class="text-3xl font-bold text-brand-cream mb-1">
            Professor Adam Olatunji Muritala 
          </h3>

          <p class="text-brand-gold text-[11px] uppercase tracking-[0.2em] mb-6">
            Mechanical Engineering | Researcher | Innovator
          </p>

          <p class="text-white/60 text-sm leading-relaxed mb-6 max-w-lg">
            Professor of Mechanical Engineering at Obafemi Awolowo University with over 27 years of experience in teaching, research, and innovation.
            Inventor of a patented fuel-less generator and currently advancing fuel-less vehicle technology.
          </p>

          <!-- SKILLS -->
          <div class="flex flex-wrap gap-2 mb-6">
            <span class="skill">Mechanical Engineering</span>
            <span class="skill">Energy Systems</span>
            <span class="skill">Innovation</span>
            <span class="skill">Research</span>
          </div>

          <!-- BUTTONS -->
          <div class="flex gap-3 mb-6">
            <a
              href="https://linkedin.com/in/adam-muritala-9bb7743a"
              target="_blank"
              class="btn-ghost text-[10px]"
            >
              LinkedIn
            </a>

            <a
              href="https://wa.me/2348035645318"
              target="_blank"
              class="btn-gold text-[10px]"
            >
              Contact CEO
            </a>
          </div>

          <!-- MESSAGE FROM FOUNDER -->
          <details class="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4 max-w-2xl">
            <summary class="cursor-pointer text-brand-gold text-sm font-semibold tracking-wide">
              View Message from the Founder
            </summary>

            <p class="text-white/70 text-sm leading-relaxed mt-4">
              At the African Pro-Humanity Technology Hub, we hold a firm conviction that Africa’s greatest wealth is not buried beneath its soil, but embedded within the untapped potential of its people. For too long, brilliance across the continent has been conditioned to pass examinations rather than to solve real-world problems that shape societies. This must change.
            </p>

            <p class="text-white/70 text-sm leading-relaxed mt-4">
              Our mission is to awaken and equip a new generation of builders: young minds trained in practical engineering, artificial intelligence, and product development. We are training people capable of translating ideas into solutions for pressing community challenges.
            </p>

            <p class="text-white/70 text-sm leading-relaxed mt-4">
              We are raising innovators who will not merely consume technology, but who will design, prototype, and manufacture it within Africa, for Africa, and for the world.
            </p>

            <p class="text-white/70 text-sm leading-relaxed mt-4">
              Through hands-on learning, bold experimentation, and a deep commitment to human-centered innovation, we are laying the foundation for a future defined by self-reliance, technological sovereignty, and transformative impact where ideas do not remain abstract but become engines of progress.
            </p>
          </details>

        </div>

      </div>

      <!-- TEAM MEMBERS -->
      <h3 class="text-xl text-brand-cream mb-8 text-center">Core Team Members</h3>

      <div class="flex justify-center">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl">

          <div
            v-for="member in teamMembers"
            :key="member.name"
            class="p-6 rounded-xl border transition text-center"
            :class="member.color"
          >

            <!-- NAME -->
            <h3 class="text-lg font-semibold text-black">
              {{ member.name }}
            </h3>

            <!-- ROLE -->
            <p class="text-sm font-medium text-blue-600 mt-1">
              {{ member.role }}
            </p>

            <!-- DESCRIPTION -->
            <p class="text-gray-600 text-sm mt-4 leading-relaxed">
              {{ member.description }}
            </p>

            <!-- SKILLS -->
            <div class="flex flex-wrap justify-center gap-2 mt-5">
              <span
                v-for="(skill, i) in member.skills"
                :key="i"
                class="text-[11px] px-3 py-1 bg-white border rounded-full text-gray-700"
              >
                {{ skill }}
              </span>
            </div>

            <!-- LINK -->
            <div v-if="member.linkedin" class="mt-6">
              <a
                :href="member.linkedin"
                target="_blank"
                class="btn-gold text-[10px]"
              >
                View Profile
              </a>
            </div>

          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
const teamMembers = [
  {
    name: "Engr. L. A Aminu",
    role: "Chief Technology Officer",
    description: "Quality control engineer in area of subsea engineering, pipeline engineering, destructive and non destructive engineering, Corrosion engineering. He is a certified Procurement manager.",
    skills: ["Software Engineering", "AI/ML", "Technology Strategy"],
    color: "bg-[#eef6fb] border-blue-200"
  },
  {
    name: "Mr Jire-Alao Daniel",
    role: "Head of Programs",
    description: "Expact in Inventor, C Programming, 3D modeling and a Automobile Engineer.",
    skills: ["Program Development", "Education", "Youth Leadership"],
    color: "bg-[#eef6fb] border-blue-200"
  },
  {
    name: "Engr. Abdulfatai",
    role: "Director of Innovation",
    description: "Serial entrepreneur and innovation consultant overseeing incubation and startup acceleration.",
    skills: ["Innovation Management", "Startup Incubation", "Business Development"],
    color: "bg-[#eef6fb] border-blue-200"
  },
  {
    name: "Mr Ikraam Abdulsalaam",
    role: "Head of Operations",
    description: "Ensures smooth delivery of programs and efficient resource management.",
    skills: ["Operations Management", "Project Management", "Resource Optimization"],
    color: "bg-[#fff7e6] border-yellow-300"
  },
  {
    name: "Ismail",
    role: "Frontend Engineer | Full Stack Developer",
    description: "Responsible for building UI, integrating backend systems, and delivering scalable web solutions.",
    skills: ["Vue.js", "JavaScript", "Frontend Development", "UI/UX", "API Integration"],
    linkedin: "https://linkedin.com/in/abolarinwa-ismail-94a0a83b6",
    color: "bg-[#eef6fb] border-blue-200"
  }
]
</script>

<style scoped>
.skill {
  font-size: 10px;
  border: 1px solid rgba(201,146,42,0.2);
  color: rgba(201,146,42,0.7);
  padding: 4px 8px;
  letter-spacing: 1px;
}
</style>