<template>
    <div class="promo">
        <div class="promo__container">
            <div class="promo__greeting greeting">
                <div class="greeting__info">
                    <div class="greeting__header">
                            <h1>Найди команду для участия в хакатонах</h1>
                            <h2>Сервис по поиску и подбору команд для участия в хакатонах</h2>
                    </div>
                    <router-link :to="appRoutes?.getLogin() || '#'">
                        <Button class="max-w-fit">Начать</Button> 
                    </router-link>
                </div>
                <div class="greeting__logo">
                    <img :src="logoUrl" />
                </div>
            </div>
            <div id="features" class="promo__features features">
                <div class="features__title">
                    Функции сервиса
                </div>
                <div class="features__list">
                    <div v-for="(feature, index) in features" :key="index" class="features__item">
                        <component :is="feature.icon" class="features__item-icon" />
                        <div class="features__item-text">
                            <div class="features__item-title">{{ feature.title }}</div>
                            <div class="features__item-description">{{ feature.description }}</div>
                        </div>
                    </div>  
                </div>
            </div>
            <div id="steps" class="promo__steps steps">
                <div ref="el" class="steps__title">
                    Как достигнуть цели?
                </div>
                <div class="steps__list">
                    <div v-for="(step, index) in steps" :key="index" class="steps__item">
                        <div class="steps__item-bg">
                            <img :src="`/images/svg/promo/step-${step.step}.svg`">
                        </div>
                        <div class="steps__item-text">
                            <div class="steps__item-title">
                                <span class="steps__item-number">{{ step.step }}.</span> {{ step.title }}
                            </div>
                            <div v-html="step.description" class="steps__item-description"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '@/shared/ui/button'

import type { Component } from 'vue';
import IconGroup from '~icons/heroicons/user-group-20-solid?width=48px&height=48px';
import IconCup from '~icons/solar/cup-bold?width=48px&height=48px';
import IconPerson from '~icons/heroicons/user-circle-16-solid?width=48px&height=48px';
import IconPersonPlus from '~icons/heroicons/user-plus-20-solid?width=48px&height=48px';
import { useAppRoutes } from '@/router';
import { useColorMode } from '@vueuse/core'

import { computed } from 'vue';

const mode = useColorMode()
const logoUrl = computed(() => `/images/svg/logo/logo-abb-${mode.value}.svg`)

interface IFeature {
    title: string;
    description: string;
    icon: Component
}

interface IStep {
    step: string;
    title: string;
    description: string;
}

const features: IFeature[] = [
    {
        title: 'Поиск команд',
        description: 'Персонализированный поиск и подбор команд согласно твоим запросам',
        icon: IconGroup
    },
    {
        title: 'Поиск хакатонов',
        description: 'Вся информация о приближающихся хакатонах собрана в одном месте',
        icon: IconCup
    },
    {
        title: 'Профиль',
        description: 'Указанные навыки, стэк, опыт и достижения хранятся здесь',
        icon: IconPerson
    },
    {
        title: 'Создание команд',
        description: 'Легкий и простой способ собрать лучшую команду',
        icon: IconPersonPlus
    },
]

const steps: IStep[] = [
    {
        step: '1',
        title: 'Авторизируйся',
        description: 'При помощи <br> ЛКС МИРЭА или VK'
    },
    {
        step: '2',
        title: 'Заполни данные',
        description: 'Они пригодятся для более точного поиска и подбора команд'
    },
    {
        step: '3',
        title: 'Перейди на главную',
        description: 'Определи тип поиска: хакатоны или команды'
    }
]

const appRoutes = useAppRoutes()
</script>

<style scoped lang="scss">
@import './styles';
</style>