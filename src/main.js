import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'
import { motionDirectives } from '@/lib/motion'

import HomeView from './views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('./views/NotFoundView.vue') },
  ],
  // In-page anchors are handled by Lenis (see AppNav / scrollToHash).
  scrollBehavior: () => ({ top: 0 }),
})

const app = createApp(App).use(router)
for (const [name, directive] of Object.entries(motionDirectives)) app.directive(name, directive)
app.mount('#app')
