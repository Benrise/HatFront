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
const apiService = env?.VITE_APP_API_HOST || 'localhost';
const apiPort = env?.VITE_APP_API_SERVICE_PORT || '80';

export default defineConfig({
  plugins: [
    vue(),
    Icons({ compiler: 'vue3' }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  logLevel: 'info',
  server: {
    proxy: {
      [apiUrl]: {
        target: `${apiProtocol}://${apiService}:${apiPort}/${apiUrl}`,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
    },
    port: 8080
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
