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
                    Авторизируйтесь, чтобы получить доступ к функциям <a class="form__link" href="#">сервиса</a>
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
@import '@/app/styles/variables.scss';
@import '@/app/styles/mixins.scss';

.login-promo {
    @media only screen and (max-width: rem(936)) {
        display: none !important;
    }

    display: flex;
    flex-direction: column;
    gap: 36px;
    width: 100%;
    background-color: $background;

    &__wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        padding: 48px;
        gap: 48px;
    }

    &__header {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    &__title {
        display: flex;
        flex-direction: column;
        gap: 8px;

        h1 {
            color: $text;
            @include title();
        }

        h2 {
            @include body();
            color: $text;
        }
    }
}

.login-form {
    @media only screen and (max-width: rem(936)) {
        background: $background;
    }

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: $text;
    width: 100%;
    position: relative;
    overflow: hidden;

    &__bg-image {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.05;
        display: none
    }
}

.form {
    display: flex;
    flex-direction: column;
    background: $background;
    align-items: center;
    border-radius: 12px;
    padding: 64px 36px;
    z-index: 1;
    max-width: 396px;
    @include adaptiveValue('gap', 48, 16);

    &__header {
        display: flex;
        flex-direction: column;
        gap: 12px;
        align-items: center;
    }

    &__link {
        text-decoration: underline;
    }

    &__title {
        color: $text;
        @include title();
    }

    &__description {
        @include body();
        color: $text;
        text-align: center
    }

    &__actions {
        display: flex;
        flex-direction: column;
        gap: 16px;
        max-width: 200px;
    }
}
</style>
