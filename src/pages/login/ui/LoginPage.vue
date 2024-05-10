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
    <LoginForm />
  </template>

<script setup lang="ts">
import { LoginForm } from '@/features/login'

import { Button } from '@/shared/ui/button'

import { useAppRoutes } from '@/router';

const appRoutes = useAppRoutes()
</script>

<style scoped lang="scss">
@import './styles';
</style>
