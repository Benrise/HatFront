<template>
    <div class="header">
        <div class="header__container">
            <router-link to="/"><img src="/images/svg/logo/logo.svg" alt="Logo"/></router-link>
            <div class="header__content header__content_default">
                <div class="header__left">
                    <div class="header__menu menu">
                        <ul class="menu__list menu__list_default">
                            <li class="menu__item"><a class="header__link" href="#features">Функции</a></li>
                            <li class="menu__item"><a class="header__link" href="#steps">Шаги</a></li>
                        </ul>
                    </div>
                </div>
                <div class="header__right">
                    <router-link class="header__link" to="/login">Вход</router-link>
                </div>
            </div>
            <div class="header__content header__content_mobile">
                <Sheet>
                    <SheetTrigger><IconBars class="text-primary-foreground"/></SheetTrigger>
                    <SheetContent class="z-[999] sm:max-w-sm bg-neutral-900 border-none flex flex-col gap-4">
                        <div class="header__menu menu">
                            <ul class="menu__list menu__list_mobile">
                                <SheetClose>
                                    <li class="menu__item"><a class="header__link" href="#features">Функции</a></li>
                                </SheetClose> 
                                <SheetClose>
                                    <li class="menu__item"><a class="header__link" href="#steps">Шаги</a></li>
                                </SheetClose>
                            </ul>
                        </div>
                    </SheetContent>
                  </Sheet>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from '@/shared/ui/sheet';

import IconBars from '~icons/heroicons/bars-3-bottom-right-16-solid?width=24px&height=24px';
</script>

<style lang="scss">
@import './styles.scss';
</style>