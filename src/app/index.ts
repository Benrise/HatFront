import '@/app/styles/index.scss';

import { setFormLocale } from '@/app/locale';
import { createApp } from 'vue';
import { router } from '@/router';
import { store } from '@/store';
import App from './App.vue';

setFormLocale();

export const application = createApp(App).use(router).use(store);
