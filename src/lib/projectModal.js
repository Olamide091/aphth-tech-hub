// Tiny shared store so any section can open the project detail view.
import { ref } from 'vue'

export const activeProject = ref(null)
export const playOnOpen = ref(false)
export const openProject = (p, { play = false } = {}) => { playOnOpen.value = play && !!p.video; activeProject.value = p }
export const closeProject = () => { activeProject.value = null }
