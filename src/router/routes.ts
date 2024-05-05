import { AppLayoutsEnum } from '@/app/layouts/layouts.types';
import type { RouteRecordRaw } from 'vue-router';
import { AppPages } from './types';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/:catchAll(.*)*',
        redirect: { name: AppPages.promo},
    },
    {
        name: AppPages.login,
        path: '/login',
        component: () => import('@/pages/login'),
        meta: {
            layout: AppLayoutsEnum.login
        }
    },
    {
        name: AppPages.home,
        path: '/',
        component: () => import('@/pages/home'),
        meta: {
            layout: AppLayoutsEnum.default
        }
    },
    {
        name: AppPages.promo,
        path: '/promo',
        component: () => import('@/pages/promo'),
        meta: {
            layout: AppLayoutsEnum.default
        }
    },
    {
        name: AppPages.profile,
        path: '/profile',
        component: () => import('@/pages/profile'),
        meta: {
            layout: AppLayoutsEnum.default
        }
    }
]

export default routes;
