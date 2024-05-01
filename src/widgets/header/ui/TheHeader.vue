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

<style lang="scss">
@import './styles.scss';
</style>