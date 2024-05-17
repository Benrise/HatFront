<template>
    <header class="header">
        <div class="header__container">
            <router-link :to="appRoutes?.getHome() || '/'"><img src="/images/svg/logo/logo.svg" alt="Logo"/></router-link>
            <div class="header__content header__content_desktop">
                <div class="header__left">
                    <div class="header__menu menu">
                        <ul v-if="route.name === AppPages.promo" class="menu__list menu__list_desktop">
                            <router-link class="header__link" :to="appRoutes?.getLogin() || '#'">
                                К поиску
                            </router-link>
                            <li class="menu__item"><a class="header__link" href="#features">Функции</a></li>
                            <li class="menu__item"><a class="header__link" href="#steps">Шаги</a></li>
                        </ul>
                        <ul v-else class="menu__list menu__list_desktop">
                            <li class="menu__item">
                                <router-link class="header__link" :to="appRoutes?.getHome() || '#'">
                                    Главная
                                </router-link>
                            </li>
                            <li class="menu__item">
                                <router-link class="header__link" :to="appRoutes?.getPromo() || '#'">
                                    О сервисе
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="header__right">
                    <Button @click="toggleColorMode" variant="ghost" class="rounded-full h-10 w-10" size="icon">
                        <IconSun v-if="mode === 'light'"/>
                        <IconMoon v-else/>
                    </Button>
                    <UserBadge v-if="isAuthorized" :user="{}" hide-name/>
                    <router-link v-if="!isAuthorized" :to="appRoutes?.getLogin() || '#'" class="header__link">
                        <Button size="icon" class="rounded-full">
                            <IconLogin/>
                        </Button>
                    </router-link>
                    <AlertDialog v-else>
                        <AlertDialogTrigger as-child>
                            <Button v-if="isAuthorized" size="icon" variant="ghost" class="rounded-full h-10 w-10">
                                <IconLogout/>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Выход</AlertDialogTitle>
                            <AlertDialogDescription>
                              Вы уверены, что хотите выйти?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction  @click="logout">Выйти</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                </div>
            </div>
            <div class="header__content header__content_mobile">
                <Sheet class="header__sheet sheet">
                    <Button @click="toggleColorMode" variant="ghost" class="rounded-full" size="icon">
                        <IconSun v-if="mode === 'light'"/>
                        <IconMoon v-else/>
                    </Button>
                    <SheetTrigger><IconBars class="sheet__trigger"/></SheetTrigger>
                    <SheetContent side="right">
                        <div class="sheet__content">
                            <SheetHeader class="sheet__header">Меню</SheetHeader>
                            <div class="header__menu menu">
                                <ul v-if="route.name === AppPages.promo" class="menu__list menu__list_mobile">
                                    <SheetClose>
                                        <li class="menu__item menu__item_mobile">
                                            <router-link :to="appRoutes?.getHome() || '#'" class="header__link">
                                                К поиску
                                            </router-link>
                                        </li>
                                    </SheetClose>
                                    <SheetClose>
                                        <li class="menu__item menu__item_mobile"><a class="header__link" href="#features">Функции</a></li>
                                    </SheetClose> 
                                    <SheetClose>
                                        <li class="menu__item menu__item_mobile"><a class="header__link" href="#steps">Шаги</a></li>
                                    </SheetClose>
                                    <SheetClose v-if="isAuthorized" >
                                        <li class="menu__item menu__item_mobile">
                                            <router-link :to="appRoutes?.getProfile() || '#'" class="header__link">
                                                Профиль
                                            </router-link>
                                        </li>
                                    </SheetClose>
                                    <SheetClose v-if="isAuthorized" >
                                        <li class="menu__item menu__item_mobile">
                                            <router-link to="#" class="header__link" variant="secondary" @click="logout">
                                                Выход
                                                <IconLogout class="ml-2 w-4 h-4"/>
                                            </router-link>
                                        </li>
                                    </SheetClose>
                                    <SheetClose v-if="!isAuthorized" >
                                        <li class="menu__item menu__item_mobile">
                                            <router-link :to="appRoutes?.getLogin() || '#'" class="header__link">
                                                <IconLogin class="mr-2"/>
                                                Вход
                                            </router-link>
                                        </li>
                                    </SheetClose>
                                </ul>
                                <ul v-else class="menu__list menu__list_mobile">
                                    <SheetClose>
                                        <li class="menu__item menu__item_mobile">
                                            <router-link class="header__link" :to="appRoutes?.getHome() || '#'">
                                                Главная
                                            </router-link>
                                        </li>
                                    </SheetClose>
                                    <SheetClose>
                                        <li class="menu__item menu__item_mobile">
                                            <router-link class="header__link" :to="appRoutes?.getPromo() || '#'">
                                                О сервисе
                                            </router-link>
                                        </li>
                                    </SheetClose>
                                    <SheetClose v-if="isAuthorized">
                                        <li class="menu__item menu__item_mobile">
                                            <router-link :to="appRoutes?.getProfile() || '#'" class="header__link">
                                                Профиль
                                            </router-link>
                                        </li>
                                    </SheetClose>
                                    <SheetClose v-if="isAuthorized">
                                        <li class="menu__item menu__item_mobile">
                                            <router-link  to="#" class="header__link" variant="secondary" @click="logout">
                                                Выход
                                                <IconLogout class="ml-2 w-4 h-4"/>
                                            </router-link>
                                        </li>
                                    </SheetClose>
                                    <SheetClose v-if="!isAuthorized" >
                                        <li class="menu__item menu__item_mobile">
                                            <router-link :to="appRoutes?.getLogin() || '#'" class="header__link">
                                                <IconLogin class="mr-2"/>
                                                Вход
                                            </router-link>
                                        </li>
                                    </SheetClose>
                                </ul>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui/alert-dialog'

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
} from '@/shared/ui/sheet';
import { Button } from '@/shared/ui/button';

import IconBars from '~icons/heroicons/bars-3-bottom-right-16-solid?width=24px&height=24px';
import IconLogin from '~icons/heroicons/arrow-right-end-on-rectangle-20-solid';
import IconLogout from '~icons/heroicons/arrow-right-start-on-rectangle-20-solid';

import { UserBadge, UserModel } from '@/entities/user';
import { AppPages, router, useAppRoutes } from '@/router';
import { useRoute } from 'vue-router';
import IconSun from '~icons/heroicons/sun';
import IconMoon from '~icons/heroicons/moon';

import { useColorMode } from '@vueuse/core'

const mode = useColorMode()
const toggleColorMode = () => {
    mode.value = mode.value === 'light' ? 'dark' : 'light';
};

const appRoutes = useAppRoutes()
const userStore = UserModel.useUserStore();
const isAuthorized = userStore.isAuthorized;

const route = useRoute();

const logout = () => {
    userStore.logout()
    router.push({ name: AppPages.login, query: { logout: 'true' } })
}
</script>

<style scoped lang="scss">
@import './styles.scss';
</style>