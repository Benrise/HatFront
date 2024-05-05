import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueDevTools from 'vite-plugin-vue-devtools';
import path from 'path';

import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

import Icons from 'unplugin-icons/vite';

const env = loadEnv('', process.cwd(), '')

const apiUrl = env?.VITE_APP_API_BASE_URL || '/api';
const apiProtocol = env?.VITE_APP_API_PROTOCOL || 'http';
const apiService = env?.VITE_APP_API_SERVICE_URL || 'localhost';

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
  server: {
    proxy: {
      [apiUrl]: {
        target: `${apiProtocol}://${apiService}/${apiUrl}`,
        changeOrigin: true,
        ws: false,
        rewrite: path => path.replace(/^\/api/, '')
      },
    },
    port: 8085
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/app/styles/variables.scss"; 
          @import "@/app/styles/mixins.scss";
        `
      }
    }
  },
})
