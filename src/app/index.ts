import '@/app/styles/index.scss';

import { createApp } from 'vue';
import { router } from '@/router';
import { store } from '@/store';
import App from './App.vue';

export const application = createApp(App).use(router).use(store);
