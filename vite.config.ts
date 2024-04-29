import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'

import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"

import Icons from 'unplugin-icons/vite'

export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    Icons({ compiler: 'vue3' }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
})
