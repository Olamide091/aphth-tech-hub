import { whatsapp, waLink } from '@/data/site'

// WhatsApp link with the project name pre-filled.
export const enquireLink = project =>
  waLink(whatsapp.general, `Hello APHTH, I'm interested in the "${project.title}" project. Could you share more details?`)
