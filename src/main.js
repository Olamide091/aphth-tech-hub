import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// ── Routes ──────────────────────────────────────────────────
import HomeView from './views/HomeView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  // Phase 2: Add admin route here
  // { path: '/admin', name: 'Admin', component: () => import('./views/AdminView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return savedPosition || { top: 0 }
  }
})

createApp(App).use(router).mount('#app')
