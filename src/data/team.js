import { img } from '@/lib/media'
import { whatsapp, waLink } from './site'

export const teamIntro = {
  eyebrow: 'The People Behind APHTH',
  title: 'Meet the Team',
  body: 'Driven engineers and innovators building technology that serves humanity from Africa.',
}

export const founder = {
  name: 'Professor Adam Olatunji Muritala',
  title: 'Founder & CEO',
  role: 'Mechanical Engineering | Researcher | Innovator',
  bio: 'Professor of Mechanical Engineering at Obafemi Awolowo University with over 27 years of experience in teaching, research, and innovation. Inventor of a patented fuel-less generator and currently advancing fuel-less vehicle technology.',
  skills: ['Mechanical Engineering', 'Energy Systems', 'Innovation', 'Research'],
  photo: img('team/ceo-adam-muritala', 'Professor Adam Olatunji Muritala'),
  avatar: img('team/ceo-adam-muritala-avatar', 'Professor Adam Olatunji Muritala'),
  linkedin: 'https://linkedin.com/in/adam-muritala-9bb7743a',
  contact: waLink(whatsapp.ceo),
  message: [
    'At the African Pro-Humanity Technology Hub, we hold a firm conviction that Africa’s greatest wealth is not buried beneath its soil, but embedded within the untapped potential of its people. For too long, brilliance across the continent has been conditioned to pass examinations rather than to solve real-world problems that shape societies. This must change.',
    'Our mission is to awaken and equip a new generation of builders: young minds trained in practical engineering, artificial intelligence, and product development. We are training people capable of translating ideas into solutions for pressing community challenges.',
    'We are raising innovators who will not merely consume technology, but who will design, prototype, and manufacture it within Africa, for Africa, and for the world.',
    'Through hands-on learning, bold experimentation, and a deep commitment to human-centered innovation, we are laying the foundation for a future defined by self-reliance, technological sovereignty, and transformative impact where ideas do not remain abstract but become engines of progress.',
  ],
}

// To add a photo for a member: put it in media/originals/team/, run `npm run media`,
// then set  photo: img('team/<file-name>', '<name>')
export const members = [
  {
    name: 'Engr. L. A Aminu',
    role: 'Chief Technology Officer',
    bio: 'Quality control engineer in area of subsea engineering, pipeline engineering, destructive and non destructive engineering, Corrosion engineering. He is a certified Procurement manager.',
    skills: ['Software Engineering', 'AI/ML', 'Technology Strategy'],
    photo: null,
  },
  {
    name: 'Mr Jire-Alao Daniel',
    role: 'Head of Programs',
    bio: 'Expert in Inventor, C Programming, 3D modeling and an Automobile Engineer.',
    skills: ['Program Development', 'Education', 'Youth Leadership'],
    photo: null,
  },
  {
    name: 'Engr. Abdulfatai',
    role: 'Director of Innovation',
    bio: 'Serial entrepreneur and innovation consultant overseeing incubation and startup acceleration.',
    skills: ['Innovation Management', 'Startup Incubation', 'Business Development'],
    photo: null,
  },
  {
    name: 'Mr Ikraam Abdulsalaam',
    role: 'Head of Operations',
    bio: 'Ensures smooth delivery of programs and efficient resource management.',
    skills: ['Operations Management', 'Project Management', 'Resource Optimization'],
    photo: null,
  },
  {
    name: 'Ismail',
    role: 'Frontend Engineer | Full Stack Developer',
    bio: 'Responsible for building UI, integrating backend systems, and delivering scalable web solutions.',
    skills: ['Vue.js', 'JavaScript', 'Frontend Development', 'UI/UX', 'API Integration'],
    linkedin: 'https://linkedin.com/in/abolarinwa-ismail-94a0a83b6',
    photo: null,
  },
]

export const joinCta = {
  eyebrow: 'We’re Growing',
  title: 'Join the APHTH Family',
  body: 'We’re looking for passionate engineers, developers, and innovators to join our mission.',
}
