import { createApp } from 'vue'
import { router } from '@/router'
import { store } from '@/store'
import App from './App.vue'

import '@/app/styles/index.scss'

export const application = createApp(App).use(router).use(store)