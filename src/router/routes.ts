import { AppLayoutsEnum } from '@/app/layouts/layouts.types';
import type { RouteRecordRaw } from 'vue-router';
import { AppPages } from './router.types';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/:catchAll(.*)*',
        redirect: { name: AppPages.promo},
    },
    {
        name: AppPages.login,
        path: '/login',
        component: () => import('@/pages/LoginPage.vue'),
        meta: {
            layout: AppLayoutsEnum.login
        }
    },
    // {
    //     name: AppPages.home,
    //     path: '/',
    //     component: () => import('@/pages/HomePage.vue'),
    //     meta: {
    //         layout: AppLayoutsEnum.default
    //     }
    // },
    {
        name: AppPages.promo,
        path: '/promo',
        component: () => import('@/pages/PromoPage.vue'),
        meta: {
            layout: AppLayoutsEnum.default
        }
    }
]

export default routes;
