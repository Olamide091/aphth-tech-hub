import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],

  /*
   IMPORTANT:
   - GitHub Pages needs the repo name
   - Vercel ignores this and still works fine
  */
  base: '/aphth-tech-hub/',

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})