// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS — the single source of truth for every project on the website.
//
// To ADD a project, copy the template at the bottom of this file, fill it in and
// append it to the `projects` list. Nothing else needs to change.
//
//   image:  put the photo in media/originals/projects/, run `npm run media`,
//           then reference it as img('projects/<file-name-without-extension>')
//   video:  put the video in media/originals/videos/, run `npm run videos`,
//           then reference it as video('<file-name-without-extension>', 'Caption')
//   photos: extra images for the detail view — folder('gallery/<folder>') or
//           a list of img(...) calls
//   featured: true  → also shown in the cinematic scroll story near the top
// ─────────────────────────────────────────────────────────────────────────────
import { img, video } from '@/lib/media'

export const projectsIntro = {
  eyebrow: 'Engineering Work',
  title: 'Featured Projects',
  body: 'Precision-engineered models, mechanisms, and digital systems solving real-world challenges.',
}

export const projects = [
  // ── Projects previously managed in Sanity (live site) ──────────────────────
  {
    id: 'subsonic-wind-tunnel',
    title: 'First Made-in-Nigeria Subsonic Wind Tunnel for Aerodynamic Research',
    shortTitle: 'Subsonic Wind Tunnel',
    category: 'Research',
    featured: true,
    summary: 'A locally designed and fabricated subsonic wind tunnel developed for studying the aerodynamic behavior of solid bodies and airfoil systems.',
    description: 'A locally designed and fabricated subsonic wind tunnel developed for studying the aerodynamic behavior of solid bodies and airfoil systems. The system was engineered using custom 3D-printed components, airflow control mechanisms, DC motor propulsion, and transparent observation chambers for experimental analysis and STEM education applications.',
    tech: [],
    image: img('projects/wind-tunnel', 'Subsonic wind tunnel built from 3D-printed components'),
    video: null,
    photos: [],
  },
  {
    id: 'afri-inverter-solar-generator',
    title: 'Afri-Inverter Solar Generator',
    shortTitle: 'Afri-Inverter Solar Generator',
    category: 'Energy',
    featured: true,
    summary: 'A locally designed and fabricated solar inverter system developed to provide sustainable and reliable power generation for homes, schools, laboratories, and small businesses.',
    description: 'A locally designed and fabricated solar inverter system developed to provide sustainable and reliable power generation for homes, schools, laboratories, and small businesses. The Afri-Inverter Solar Generator combines renewable energy technology with locally sourced engineering solutions to address electricity challenges through clean and efficient power systems. The project demonstrates innovation in power electronics, energy storage integration, and practical African-centered engineering for energy independence and technological self-reliance.',
    tech: [],
    image: img('projects/afri-inverter', 'Afri-Inverter Solar Generator units'),
    video: null,
    photos: [],
  },
  {
    id: 'advanced-geneva-mechanism',
    title: 'Advanced Geneva Mechanism for Precision Motion Control',
    shortTitle: 'Advanced Geneva Mechanism',
    category: 'Mechanical',
    featured: true,
    summary: 'A precision-engineered Geneva mechanism designed for controlled intermittent rotary motion in automated mechanical systems.',
    description: 'A precision-engineered Geneva mechanism designed for controlled intermittent rotary motion in automated mechanical systems. This project demonstrates advanced mechanical design principles, motion transfer systems, and precision engineering for industrial automation, robotics, and manufacturing applications. The mechanism was modeled and analyzed using CAD engineering tools to study rotational indexing, motion synchronization, and mechanical efficiency.',
    tech: [],
    image: img('projects/geneva-mechanism', 'CAD drawings of the Geneva mechanism: exploded, side and additional views'),
    video: null,
    photos: [],
  },

  // ── New projects ───────────────────────────────────────────────────────────
  {
    id: 'oau-greenride',
    title: 'OAU GreenRide — Indigenous Electric Tricycle',
    shortTitle: 'OAU GreenRide',
    category: 'Mobility',
    featured: true,
    summary: 'An indigenous electric tricycle designed by the OAU Mechanical Engineering team — clean energy, smart mobility, made in Nigeria.',
    description: 'OAU GreenRide is an indigenous electric tricycle designed by the Obafemi Awolowo University Mechanical Engineering team and tested and proven on campus. It is 100% electric with zero emissions, has a low operating cost, is built to be reliable and durable on Nigerian roads, and is comfortable and spacious for passengers and goods. Its indigenous design and assembly support local jobs and industrial growth — a contribution to Nigeria’s e-mobility future, from our university to the community.',
    tech: ['100% Electric', 'Zero Emission', 'Indigenous Design & Assembly'],
    image: img('projects/oau-greenride', 'The OAU GreenRide electric tricycle outside the Department of Mechanical Engineering'),
    video: video('oau-greenride-campus-demo', 'OAU GreenRide — campus demonstration'),
    photos: [],
  },

  // ── Projects from the original site source ─────────────────────────────────
  {
    id: 'geneva-mechanism-model',
    title: 'Geneva Mechanism Model',
    category: 'Mechanical',
    summary: 'Precision-fabricated Geneva wheel demonstrating intermittent rotary motion — used in film projectors and indexing machines.',
    description: 'Precision-fabricated Geneva wheel mechanism showcasing 4-slot and 6-slot variants with accurate geometry, hand-finished from mild steel. Used as both an educational tool and an engineering demonstration piece.',
    tech: ['CAD', 'CNC Machining', 'Mild Steel', 'Mechanism Design'],
    image: null,
    video: null,
    photos: [],
  },
  {
    id: 'automated-sorting-system',
    title: 'Automated Sorting System',
    category: 'Automation',
    summary: 'Conveyor-based prototype using sensor arrays to sort components by size and material — built for small-scale manufacturing.',
    description: 'Conveyor-based prototype using IR sensors and servo actuators to sort components by dimension and material type. Designed for small-scale African manufacturing environments using locally-sourced components.',
    tech: ['Arduino', 'Servo Systems', 'Sensor Arrays', 'PLC'],
    image: null,
    video: null,
    photos: [],
  },
  {
    id: 'aphth-organization-portal',
    title: 'APHTH Organization Portal',
    category: 'Software',
    summary: 'Full-stack web platform for managing member profiles, project submissions, and organizational communication.',
    description: 'Vue.js + Firebase platform covering member management, project tracking, gallery, and admin dashboard — built with a scalable component architecture and real-time database.',
    tech: ['Vue.js', 'Firebase', 'Tailwind CSS', 'Firestore'],
    image: null,
    video: null,
    photos: [],
  },
  {
    id: 'cam-follower-test-rig',
    title: 'Cam & Follower Test Rig',
    category: 'Mechanical',
    summary: 'Adjustable test rig for analysing cam profiles and follower motion curves — for kinematics education and research.',
    description: 'Adjustable test rig allowing swappable cam profiles and follower types. Used to measure displacement, velocity, and acceleration curves for undergraduate kinematics education.',
    tech: ['SolidWorks', 'Steel Fabrication', 'Kinematics'],
    image: null,
    video: null,
    photos: [],
  },
  {
    id: 'community-water-monitor',
    title: 'Community Water Monitor',
    category: 'Hardware',
    summary: 'IoT device for real-time monitoring of water quality in community boreholes — transmitting data to a cloud dashboard.',
    description: 'ESP32-based IoT system measuring turbidity, pH, and temperature in community boreholes. Data streams to a Firebase dashboard with alert thresholds for community administrators.',
    tech: ['IoT', 'ESP32', 'Firebase', 'Sensors'],
    image: null,
    video: null,
    photos: [],
  },
  {
    id: 'engineering-learning-platform',
    title: 'Engineering Learning Platform',
    category: 'Software',
    summary: 'Interactive web tool with animated mechanism simulations for teaching machine element design to students.',
    description: 'Vue.js web platform with canvas-based animated simulations of mechanisms — allowing students to adjust parameters and see real-time kinematic changes for self-directed learning.',
    tech: ['Vue.js', 'Canvas API', 'Animation', 'Education'],
    image: null,
    video: null,
    photos: [],
  },

  // ── NEW PROJECT TEMPLATE (copy, uncomment, fill in) ────────────────────────
  // {
  //   id: 'my-new-project',                 // unique, lowercase-with-dashes
  //   title: 'Full Project Name',
  //   shortTitle: 'Short Name',            // optional, used where space is tight
  //   category: 'Mechanical',              // Mechanical | Automation | Software | Hardware | Energy | Research | ...
  //   featured: false,
  //   summary: 'One or two sentences shown on the card.',
  //   description: 'Full description shown in the detail view.',
  //   tech: ['Tool', 'Material'],
  //   image: img('projects/my-new-project', 'What the photo shows'),
  //   video: video('my-new-project', 'Caption'),  // or null
  //   photos: [],
  // },
]

