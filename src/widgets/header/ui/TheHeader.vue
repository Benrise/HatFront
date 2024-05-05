<template>
    <header class="header">
        <div class="header__container">
            <router-link to="/"><img src="/images/svg/logo/logo.svg" alt="Logo"/></router-link>
            <div class="header__content header__content_desktop">
                <div class="header__left">
                    <div class="header__menu menu">
                        <ul class="menu__list menu__list_desktop">
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
                <Sheet class="header__sheet sheet">
                    <SheetTrigger><IconBars class="sheet__trigger"/></SheetTrigger>
                    <SheetContent side="right">
                        <div class="sheet__content">
                            <SheetHeader class="sheet__header">Меню</SheetHeader>
                            <div class="header__menu menu">
                                <ul class="menu__list menu__list_mobile">
                                    <SheetClose>
                                        <li class="menu__item menu__item_mobile"><a class="header__link" href="#features">Функции</a></li>
                                    </SheetClose> 
                                    <SheetClose>
                                        <li class="menu__item menu__item_mobile"><a class="header__link" href="#steps">Шаги</a></li>
                                    </SheetClose>
                                </ul>
                            </div>
                            <router-link class="header__link header__link_mobile" to="/login">
                                <Button>Вход</Button>
                            </router-link>
                        </div>
                    </SheetContent>
                  </Sheet>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
} from '@/shared/ui/sheet';
import { Button } from '@/shared/ui/button';

import IconBars from '~icons/heroicons/bars-3-bottom-right-16-solid?width=24px&height=24px';

import { UserBadge } from '@/entities/user';
</script>

<style scoped lang="scss">
@import './styles.scss';
</style>