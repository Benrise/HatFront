<template>
    <div class="header">
        <div class="header__container">
            <div class="header__left">
                <router-link to="/"><img src="/images/svg/logo/logo.svg" alt="Logo"/></router-link>
                <div class="header__menu menu">
                    <ul class="menu__list">
                        <li class="menu__item"><a class="header__link" href="#features">Функции</a></li>
                        <li class="menu__item"><a class="header__link" href="#steps">Шаги</a></li>
                    </ul>
                </div>
            </div>
            <div class="header__right">
                <router-link class="header__link" to="/login">Вход</router-link>
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
        @include adaptiveValue('gap', 24, 12);
    }

    &__link {
        color: $text-secondary;
        &:hover {
            color: $text;
        }
        @include adaptiveValue('font-size', 16, 12);
    }
}

.menu {
    &__list {
        display: flex;
        flex-direction: row;
        align-items: center;
        @include adaptiveValue('gap', 24, 8);
    }
}

</style>