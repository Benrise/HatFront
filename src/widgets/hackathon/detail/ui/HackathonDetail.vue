<template>
    <div class="hackathon-detail">
        <div class="hackathon-detail__main">
            <div class="hackathon-detail__left">
                <div class="hackathon-detail__info">
                    <h1 class="hackathon-detail__title">{{hackathon.name}}</h1>
                    <div class="hackathon-detail__additionals">
                        <Badge variant="outline" v-if="hackathon.time_start && hackathon.time_end">
                            <IconCalendar class="mr-2"/>
                            {{ format(hackathon.time_start, "short")}} - {{ format(hackathon.time_end, "short") }}
                        </Badge>
                        <Badge variant="outline">
                            <IconRuble class="mr-2"/>
                            {{ hackathon.prize_fund }} руб.
                        </Badge>
                        <Badge variant="outline">
                            <IconGroup class="mr-2"/>
                            {{ hackathon.people_from }} - {{ hackathon.people_to }}
                        </Badge>
                        <Badge variant="outline" v-if="hackathon.time_end_registration">
                            <IconClipboardCheck class="mr-2"/>
                            Регистрация открыта до {{ format(hackathon.time_end_registration, "DD.MM.YYYY HH:mm")}}
                        </Badge>
                    </div>
                    <div class="hackathon-detail__description">
                        {{ hackathon.description }}
                    </div>
                    <a :href="hackathon.url_web">
                        <Button class="w-fit text-muted-foreground hover:text-foreground" variant="link">На страницу организатора</Button>
                    </a>
                </div>
                <div class="hackathon-detail__actions">
                    <!-- <Button  class="w-full" disabled>Найти команду</Button> -->
                    <Creating :hackathonId="hackathon.id" :callback="openCreatedTeam">
                        <Button variant="outline" class="w-full">Создать команду</Button>
                    </Creating>
                </div>
            </div>
            <div class="hackathon-detail__right">
                <HackathonPoster :photo_url="hackathon.photo_url"/>
            </div>
        </div>
        <div class="hackathon-detail__about">
            <div class="hackathon-detail__description-title">
                О хакатоне
            </div>
            <div class="prose dark:prose-invert
                    prose-h1:font-bold prose-h1:text-xl
                    prose-a:text-blue-600 prose-p:text-justify prose-img:rounded-xl
                    prose-headings:underline
                    max-w-none
                    "
            >
                <VueMarkdown :source="markdownSrc"/>
            </div>
        </div>
        <template v-if="!!cases && cases.length">
            <div class="hackathon-detail__cases cases">
                <div class="cases__title">
                    Кейсы
                </div>
                <div class="cases__items">
                    <div v-for="case_ in cases" :key="case_.id" class="cases__item case">
                        <div class="case__preview">
                            <div class="case__title">
                                {{ case_.name }}
                            </div>
                            <div class="case__owner opacity-50">
                                {{ case_.owner }}
                            </div>
                        </div>
                        <CasePreview :item="case_" :hackathon-id="hackathonId">
                            <Button class="w-fit">Подробнее</Button>
                        </CasePreview>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router'

import IconCalendar from '~icons/heroicons/calendar-days-20-solid';
import IconRuble from '~icons/solar/ruble-linear';
import IconGroup from '~icons/heroicons/user-group';
import IconClipboardCheck from '~icons/heroicons/clipboard-document-check';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';

import { format } from "@formkit/tempo";

import { HackathonModel } from '@/entities/hackathon';
import { HackathonPoster } from '@/entities/hackathon';
import { CasePreview } from '@/entities/case';

import { Creating } from '@/features/team/create';
import { router, useAppRoutes } from '@/router';

import VueMarkdown from 'vue-markdown-render'

const route = useRoute()

const hackathonStore = HackathonModel.useHackathonStore();
const hackathonId = computed(() => +route.params.id);


if (hackathonId.value) {
    hackathonStore.fetchHackathon(hackathonId.value);
}   

const hackathon = computed(() => hackathonStore.getHackathon);
const cases = computed(() => hackathonStore.getCases);

const appRoutes = useAppRoutes()

const openCreatedTeam = async (team_id: number) => {
    router.push(appRoutes?.getTeam(team_id) || '#')
}

const markdownSrc = computed(() => hackathon.value?.about || 'Подробное описание отсутствует')
</script>

<style lang="scss" scoped>
.hackathon-detail {

    display: flex;
    flex-direction: column;
    @include adaptiveValue('gap', 128, 48);

    &__main {
        display: flex;
        width: 100%;
        justify-content: space-between;
        @include adaptiveValue('gap', 64, 12);
    }

    &__additionals,
    &__tags {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 8px;
    }

    &__title {
        @include title();
    }

    &__left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 50%;
        @include adaptiveValue('gap', 48, 24);
    }

    &__info {
        display: flex;
        flex-direction: column;
        gap: 24px;
        max-width: 624px;
        width: 100%;
    }

    &__actions {
        display: flex;
        flex-direction: row;
        @include adaptiveValue('gap', 12, 6);
        align-items: center;
        justify-content: center;
    }

    &__right {
        width: 50%
    }

    &__description {
        @include body($line-height:32);
    }

    &__about {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 8px;
        @include body($line-height:32);
    }

    &__description-title {
        @include subtitle();
    }

    &__description-body {
        @include body($line-height:32);
    }
    
    @media screen and (max-width: 770px) {
        &__main {
            flex-direction: column-reverse;
        }
        
        &__left,
        &__right {
            width: 100%;
        }
    }

    @media screen and (max-width: 380px) {
        &__actions {
            flex-direction: column;
        }
    }
}

.cases {
    display: flex;
    flex-direction: column;
    gap: 8px;

    &__items {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(312px, 1fr));
        grid-gap: 1rem;
    }

    @media screen and (max-width: 380px) {
        &__items {
            grid-template-columns: repeat(auto-fit, minmax(224px, 1fr));
        }
    }

    &__title {
        @include subtitle();
    }
}

.case {
    position: relative;

    display: flex;
    flex-direction: column;
    gap: 24px;
    justify-content: space-between;

    @include adaptiveValue('padding', 24, 16);
    background-color: hsl(var(--card));
    width: 100%;

    border: 1px solid hsl(var(--border));

    border-radius: 12px;

    &:hover {
        @include gradientBorder()
    }

    &__title {
        @include body($line-height:32);
        width: 100%;
    }

    &__preview {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    
    @include adaptiveValue('min-height', 224, 156);
}
</style>