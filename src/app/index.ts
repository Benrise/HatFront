import '@/app/styles/index.scss';

import validators from '@/shared/lib/validators';
import { createApp } from 'vue';
import { router } from '@/router';
import { store } from '@/store';
import App from './App.vue';

export const application = createApp(App).use(router).use(store).use(validators);