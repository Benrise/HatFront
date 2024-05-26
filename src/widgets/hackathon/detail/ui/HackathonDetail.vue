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
                    <Button class="w-fit text-muted-foreground hover:text-foreground" variant="link">На страницу организатора</Button>
                </div>
                <div class="hackathon-detail__actions">
                    <Button class="w-full">Найти команду</Button>
                    <Button class="w-full" variant="outline">Создать команду</Button>
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
            <div class="hackathon-detail__description-body">
                «GeoVision Hack» - трёхдневное соревнование в гибридном формате, которое соберет талантливых разработчиков со всей России для работы над увлекательным кейсом!В рамках хакатона участники объединятся в команды для работы над кейсом, предоставленным одной из ведущих компаний в сфере IT-рекрутмента  – SENSE, а также партнёрами мероприятия.
                <br>
                <br>
                Партнерами соревнования стали 3 крупные компании: Кластер «Геотех», MyGeoMap, Институт перспективных исследований нефти и газа МГУ.  Принять участие в хакатоне смогут студенты ИТ-направлений; junior, middle и senior разработчики, готовые разработать лучшее решение актуального кейса!  Командам предстоит поработать над решением кейса «Алгоритм для автооцифровки данных геофизических исследований скважин (ГИС)». 24-25 мая команды пройдут чек-поинты в онлайн-формате, а уже 26 мая участники приглашаются на площадку в Москве пройдет питч-сессия. Если ваша команда из региона, вам доступно участие в онлайн-формате, если из Москвы, то приглашаем вас на площадку для презентации своей работы перед экспертами.
            </div>
        </div>
        <template v-if="!!cases && cases.length">
            <Tabs orientation="vertical" :default-value="hackathon.cases[0].id" class="hackathon-detail__cases tabs">
                <TabsList class="tabs__list">
                    <div class="tabs__title">
                        Кейсы
                    </div>
                    <TabsTrigger class="tabs__trigger" v-for="item in hackathon.cases" :key="item.id" :value="item.id">
                            {{ item.name }}
                    </TabsTrigger>
                </TabsList>
                <TabsContent class="tabs__content content" v-for="item in hackathon.cases" :key="item.id" :value="item.id">
                    <div class="content__group">
                        <div class="content__title">
                            Описание кейса
                        </div>
                        <div class="content__body">
                            {{ item.task }}
                        </div>
                    </div>
                    <div class="content__group">
                        <div class="content__title">
                            Предполагаемый результат
                        </div>
                        <div class="content__body">
                            {{ item.result }}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router'

import IconCalendar from '~icons/heroicons/calendar-days-20-solid';
import IconRuble from '~icons/solar/ruble-linear';
import IconGroup from '~icons/heroicons/user-group';
import IconClipboardCheck from '~icons/heroicons/clipboard-document-check';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

import { format } from "@formkit/tempo";

import { HackathonModel } from '@/entities/hackathon';
import { HackathonPoster } from '@/entities/hackathon';

const route = useRoute()

const hackathonStore = HackathonModel.useHackathonStore();
const hackathonId = computed(() => +route.params.id);


if (hackathonId.value) {
    hackathonStore.fetchHackathon(hackathonId.value);
}   

const hackathon = computed(() => hackathonStore.getHackathon);
const cases = computed(() => hackathonStore.getCases);

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
        gap: 4px;
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

.tabs {
    display: flex;
    width: 100%;
    @include adaptiveValue('gap', 64, 32);
    
    &__list {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: none;
        gap: 24px;
    }

    &__trigger {
        position: relative;

        border-radius: 12px;

        flex-grow: 1;
        flex-basis: 0;
        box-sizing: border-box;
        max-width: 464px;

        text-wrap: wrap;
        word-wrap: break-word;
        word-break: break-word;

        padding: 28px 28px;
        background-color: hsl(var(--card));
        width: 100%;

        border: 1px solid hsl(var(--border));

        &[data-state="active"] {
            @include gradientBorder()
        }
    }

    &__title {
        @include subtitle();
        width: 100%;
    }

    @media screen and (max-width: 724px) {
        flex-direction: column;
    }
}

.content {
    display: flex;
    flex-direction: column;
    gap: 24px;

    max-width: 60%;

    &__group {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    &__body {
        @include body($line-height:32);
    }

    &__title {
        @include subtitle();
    }

    @media screen and (max-width: 724px) {
        max-width: 100%;
    }
}

@keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
    }
  }
  
@keyframes fadeOut {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(30px);
    }
}
.content[data-state="active"] {
    animation: fadeIn 300ms ease-out;
}
.content[data-state="inactive"] {
    animation: fadeOut 300ms ease-in;
}
</style>