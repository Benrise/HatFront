<template>
    <div class="login-form">
        <div class="login-form__body form">
            <div class="form__header">
                <div class="form__title">
                    Вход
                </div>
                <div class="form__description">
                    Авторизируйтесь, чтобы получить доступ к функциям <router-link class="form__link" to="/promo">сервиса</router-link>
                </div>
            </div>
            <div class="form__actions">
                <a class="cursor-not-allowed" href="#">
                    <Button disabled class="w-full">Вход через ЛКС МИРЭА</Button>
                </a>
                <a :href="vkAuthUrl">
                    <Button class="w-full" variant="outline">Вход через Вконтакте</Button>
                </a>
            </div>
        </div>
        <img src="/images/png/noise-bg-20-b4b4b4.png" class="login-form__bg-image"/>
    </div>
</template>

<script setup lang="ts">
import { Button } from '@/shared/ui/button'

import { AUTH_VK_URL } from '@/app/config';

const currentURL = new URL(window.location.href);
currentURL.search = '';
const vkAuthUrl = `${AUTH_VK_URL}?returned_url=${currentURL.toString()}`;
</script>

<style scoped lang="scss">
@import './styles';
</style>