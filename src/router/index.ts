import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { layoutMiddleware } from './middleware/layout.middleware';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(layoutMiddleware);