// Organisation-wide information. Edit this file to update contact details, stats or mission text.

export const org = {
  name: 'African Pro-Humanity Tech Hub',
  short: 'APHTH',
  tagline: "Engineering Africa's future through innovation, design, and sustainable technology.",
  url: 'https://africanprohumanitytechhub.org/',
}

export const hero = {
  eyebrow: 'Engineer Africa’s Future',
  titleLines: ['Building Africa’s', 'Engineering', 'Future'],
  body: 'A professional engineering organization delivering innovation through precision mechanics, human-centered design, and scalable technology solutions built for Africa and the world.',
}

export const stats = [
  { value: 10,  suffix: '+', label: 'Projects Delivered' },
  { value: 2,   suffix: '+', label: 'Years of Excellence' },
  { value: 30,  suffix: '+', label: 'Team Members' },
  { value: 100, suffix: '%', label: 'African-Led' },
]

export const pillars = [
  {
    title: 'Our Mission',
    body: 'To engineer solutions that serve humanity — combining African ingenuity with global engineering standards to create lasting impact.',
  },
  {
    title: 'Our Discipline',
    body: 'From precision mechanical systems to scalable digital platforms — we work across disciplines with uncompromising technical excellence.',
  },
  {
    title: 'Our Vision',
    body: 'A technologically empowered Africa — where local engineers solve local problems and export world-class innovation globally.',
  },
]

// WhatsApp numbers in international format, digits only.
export const whatsapp = {
  general: '2349037022997', // "Chat With Us on WhatsApp" + project enquiries
  ceo:     '2348035645318',
}

export const contact = {
  email: 'africanprohumanityhub@gmail.com',
  phones: [
    { display: '+234 803 564 5318', wa: '2348035645318' },
    { display: '+234 703 547 8843', wa: '2347035478843' },
  ],
  address: ['OAU Campus', 'Ile-Ife, Osun State', 'Nigeria'],
  website: 'africanprohumanitytechhub.org',
  hours: ['Monday – Friday: 8:00 AM – 6:00 PM', 'WAT (West Africa Time)'],
  subjects: ['Project Collaboration', 'Partnership', 'General Inquiry'],
  linkedin: 'https://linkedin.com/in/adam-muritala-9bb7743a',
}

export const nav = [
  { label: 'Home',     href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Gallery',  href: '#gallery' },
  { label: 'Team',     href: '#team' },
  { label: 'Contact',  href: '#contact' },
]

export function waLink(number, text = '') {
  return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`
}
