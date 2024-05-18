<template>
    <div class="hackathon-card">
        <div class="hackathon-card__image image">
                <img
                    v-if="hackathon.photo_url"
                    :src="hackathon.photo_url" 
                    class="image__bg"  
                    alt="Задний фон постера хакатона"
                >
                <img
                    v-if="hackathon.photo_url"
                    :src="hackathon.photo_url" 
                    class="image__main" 
                    alt="Постер хакатона"
                >
                <img 
                    v-if="!hackathon.photo_url"
                    src="/images/png/hackathon-bg-fallback.png"
                    alt="Постер хакатона"
                    class="rounded-md"
                >
        </div>
        <div class="hackathon-card__main">
            <div class="hackathon-card__info">
                <div class="hackathon-card__text">
                    <div class="hackathon-card__title">
                        {{ hackathon.name }}
                    </div>
                    <div class="hackathon-card__description">
                        {{ hackathon.description }}
                    </div>
                </div>
                <!-- <div class="hackathon-card__tags">
                    <Badge>go</Badge>
                    <Badge>backend</Badge>
                    <Badge>ml</Badge>
                    <Badge>go</Badge>
                    <Badge>backend</Badge>
                    <Badge>ml</Badge>
                </div> -->
                <div class="hackathon-card__additionals">
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
            </div>
            <div class="hackathon-card__actions">
                <Button class="w-full">Найти команду</Button>
                <Button class="w-full" variant="outline">Создать команду</Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';

import IconCalendar from '~icons/heroicons/calendar-days-20-solid';
import IconRuble from '~icons/solar/ruble-linear';
import IconGroup from '~icons/heroicons/user-group';
import IconClipboardCheck from '~icons/heroicons/clipboard-document-check';

import type { HackathonDto } from '../../model';

import { format } from "@formkit/tempo"

defineProps({
    hackathon: {
        type: Object as PropType<HackathonDto>,
        required: true
    }
})

</script>

<style scoped lang="scss">
@import './styles';
</style>