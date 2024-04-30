<template>
    <div class="promo">
        <div class="promo__container">
            <div class="promo__greeting greeting">
                <div class="greeting__info">
                    <div class="greeting__header">
                            <h1>Найди команду для участия в хакатонах</h1>
                            <h2>Сервис по поиску и подбору команд для участия в хакатонах</h2>
                    </div>
                    <router-link to="/login">
                        <Button class="max-w-fit">Начать</Button> 
                    </router-link>
                </div>
                <div class="greeting__logo">
                    <img src="/images/svg/logo/logo-abb.svg" />
                </div>
            </div>
            <div class="promo__features features">
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


interface IFeature {
    title: string;
    description: string;
    icon: Component
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

</script>

<style scoped lang="scss">
@import '@/app/styles/variables.scss';
@import '@/app/styles/mixins.scss';

.promo {
    &__container {
        display: flex;
        flex-direction: column;
        gap: 192px;
    }
}

.greeting {
    &__info {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }

    &__header {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    &__logo {
        display: flex;
        justify-content: flex-end;
    }

    &__header {
        h1 {
            @include title();
        }

        h2 {
            @include body();
        }
    }
}

.features {
    display: flex;
    flex-direction: column;
    gap: 32px;

    &__title {
        @include title();
    }

    &__list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 24px;
    }

    &__item {
        display: flex;
        flex-direction: column;
        padding: 64px;
        background: $foreground;
        border-radius: 12px;
        color: $text;
        gap: 24px;
        align-items: center;

        &:nth-child(4n+1) &-icon,
        &:nth-child(4n+4) &-icon {
            color: $accent;
        }

        &:nth-child(4n+2) &-icon,
        &:nth-child(4n+3) &-icon {
            color: $primary;
        }
    }

    &__item-title {
        @include subtitle();
        text-align: center
    }

    &__item-description {
        @include body();
        text-align: center;
    }

    &__item-text {
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: center;
        max-width: 312px;
    }
}

</style>