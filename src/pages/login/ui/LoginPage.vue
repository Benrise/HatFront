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
                    <h2>
                        Найди хакатон, собери команду
                    </h2>
                </div>
                <router-link to="/promo">
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
                <Button>Вход через ЛКС МИРЭА</Button>
                <Button variant="outline">Вход через Вконтакте</Button>
            </div>
        </div>
        <img src="/images/png/login-bg.png" class="login-form__bg-image"/>
    </div>
  </template>

<script setup lang="ts">
import { Button } from '@/shared/ui/button'

</script>

<style scoped lang="scss">
@import './style';
</style>
