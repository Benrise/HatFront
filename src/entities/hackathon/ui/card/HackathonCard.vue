<template>
<div class="hackathon-card" v-if="hackathon?.id" :class="team ? 'max-w-[824px] !p-3' : '' ">
        <router-link 
            :to="appRoutes?.getHackathon(hackathon.id) || '0'"
            class="w-full"
        >
            <HackathonPoster :photo_url="hackathon.photo_url" :class="team ? '!cursor-pointer' : ''"/>
        </router-link>
        <div class="hackathon-card__main">
            <div class="hackathon-card__info">
                <div class="hackathon-card__header">
                    <router-link 
                        :to="appRoutes?.getHackathon(hackathon.id) || '#'"
                        class="hackathon-card__title">
                        {{ hackathon.name }}
                    </router-link>
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
                <div class="hackathon-card__tags">
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
            <div v-if="!team" class="hackathon-card__actions">
                <!-- <Button v-if="!hackathon.team_id" class="w-full" disabled>Найти команду</Button> -->
                    <router-link 
                        :to="appRoutes?.getTeam(hackathon?.team_id || 0) || '0'"
                        class="w-full"
                        v-if="hackathon.team_id"
                    >
                        <Button v-if="hackathon.team_id" class="w-full" variant="default">
                            К команде
                        </Button>
                    </router-link>
                    <Creating v-else :hackathonId="hackathon.id" :callback="openCreatedTeam">
                        <Button variant="outline" class="w-full">Создать команду</Button>
                    </Creating>
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

import { HackathonPoster } from '@/entities/hackathon'

import type { HackathonDto } from '../../model';

import { format } from "@formkit/tempo"

import { router, useAppRoutes } from '@/router';

import { Creating } from '@/features/team/create';

defineProps({
    hackathon: {
        type: Object as PropType<HackathonDto>,
        required: true
    },
    team:{
        type: Boolean,
        default: false
    }
})

const appRoutes = useAppRoutes()

const openCreatedTeam = async (team_id: number) => {
    router.push(appRoutes?.getTeam(team_id) || '#')
}
</script>

<style scoped lang="scss">
@import './styles';
</style>