<template>
    <div class="hackathon-detail">
        <div class="hackathon-detail__main">
            <div class="hackathon-detail__left">
                <div class="hackathon-detail__info">
                    <div class="hackathon-detail__header">
                        <div class="hackathon-detail__title">{{hackathon.name}}</div>
                        <div class="hackathon-detail__description">
                            {{ hackathon.description }}
                        </div>
                    </div>
                    <div class="hackathon-detail__tags">
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
                    <a v-if="hackathon?.url_web" :href="hackathon?.url_web">
                        <Button class="w-fit text-muted-foreground hover:text-foreground" variant="link">На страницу организатора</Button>
                    </a>
                </div>
                <div class="hackathon-detail__actions">
                    <!-- <Button  class="w-full" disabled>Найти команду</Button> -->
                    <Creating v-if="!hackathon.team_id" :hackathonId="hackathon.id" :callback="openCreatedTeam">
                        <Button variant="outline" class="w-full">Создать команду</Button>
                    </Creating>
                    <router-link class="w-full" v-else :to="appRoutes?.getTeam(hackathon.team_id) || '#'">
                        <Button class="w-full">К команде</Button>
                    </router-link>
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
                    <div v-for="(case_, index) in cases" :key="case_.id" class="cases__item case">
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
                        <div class="case__number">
                            {{ index + 1 }}
                        </div>
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
@import './styles';
</style>