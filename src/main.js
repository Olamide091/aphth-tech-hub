import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

import HomeView from './views/HomeView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
]

const router = createRouter({
  history: createWebHistory('/aphth-tech-hub/'), // 🔥 FIXED
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return savedPosition || { top: 0 }
  }
})

createApp(App).use(router).mount('#app')