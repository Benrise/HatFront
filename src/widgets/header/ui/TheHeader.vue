<template>
    <div class="header">
        <div class="header__container">
            <div class="header__left">
                <router-link to="/"><img src="/images/svg/logo/logo.svg" alt="Logo"/></router-link>
                <div class="header__menu menu">
                    <ul clas="=menu__list">
                        <li class="menu__item"><router-link class="header__link" to="/">Функции</router-link></li>
                    </ul>
                </div>
            </div>
            <div class="header__right">
                <router-link class="header__link" to="/login">Войти</router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>
<style scoped lang="scss">
@import '@/app/styles/variables.scss';
@import '@/app/styles/mixins.scss';

.header {
    z-index: 999;
    border-bottom: 1px solid $border;
    &__container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__left {
        display: flex;
        align-items: center;
        gap: 24px;
    }

    &__link {
        color: $text-secondary;
        &:hover {
            color: $text;
        }
    }
}

</style>