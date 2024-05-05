<template>
    <div class="login-promo">
        <div class="login-promo__wrapper">
            <div class="login-promo__logo">
                <img class="login-promo__img" src="/images/svg/logo/logo-abb.svg" alt="logo" />
            </div>
            <div class="login-promo__header">
                <div class="login-promo__title">
                    <h1>Объединяйся & Побеждай
                    </h1>
                    <p>
                        Сервис по поиску и подбору команд для участия в хакатонах
                    </p>
                </div>
                <router-link :to="appRoutes?.getPromo()">
                    <Button class="max-w-fit" >Узнать подробнее</Button>
                </router-link>
            </div>
        </div>
    </div>
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
                <a href="#">
                    <Button class="w-full">Вход через ЛКС МИРЭА</Button>
                </a>
                <a :href="AUTH_VK_URL">
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
import { useAppRoutes } from '@/router';

const appRoutes = useAppRoutes()
</script>

<style scoped lang="scss">
@import './styles';
</style>
