<template>
    <div class="team-card">
        <TooltipProvider v-if="me" >
            <Tooltip>
            <TooltipTrigger class="team-card__visability" as-child>
                <IconVisible v-if="team.is_visible"/>
                <IconInvisible class="opacity-50" v-else />
            </TooltipTrigger>
            <TooltipContent side="bottom">
                <p v-if="team.is_visible">В поиске участников</p>
                <p v-else>Набор закрыт</p>
            </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <div class="team-card__main">
            <router-link :to="appRoutes?.getTeam(team.id) || '/'" class="w-fit">
                <TeamBadge :team="team"></TeamBadge>
            </router-link>
            <Badge v-if="team.hackathon" variant="secondary" class="w-fit">{{ team.hackathon?.name }}</Badge>
            <div class="team-card__info">
                <div class="team-card__description">
                    Сборная студентов двух любимых вузов, которые любят ночевать в вузе во время хакатонов, отсылать решение за 6 секунд... 
                </div>
            </div>
            <div class="team-card__tags">
                <Badge v-for="skill in team.skills" :key="skill.id" class="team-card__tag">{{ skill.name }}</Badge>
            </div>
            <div class="team-card__roles" v-if="desired_specializations.length">
                <Badge v-for="specialization in desired_specializations" :key="specialization.id" class="team-card__role">
                    <div class="!max-w-[192px] !overflow-hidden text-ellipsis"> {{ specialization.name }}</div>
                </Badge>
            </div>
            <div v-else  class="team-card__roles">
                <Badge v-for="specialization in team.specializations" :key="specialization.id" class="team-card__role">
                    <div class="!max-w-[192px] !overflow-hidden text-ellipsis"> {{ specialization.name }}</div>
                </Badge>
            </div>
        </div>
        <div v-if="!request" class="team-card__actions">
            <Join v-if="!me" :team="team">
                <Button :disabled="team.has_request" class="w-full">
                    {{ team.has_request ? 'Заявка отправлена' : 'Вступить в команду' }}
                </Button>
            </Join>
            <router-link :team="team" class="w-full" :to="appRoutes?.getTeam(team.id) || '/'">
                <Button variant="outline" class="w-full">Подробнее</Button>
            </router-link>
        </div>
        <div v-else class="team-card__actions">
            <slot name="request-actions">

            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';

import { TeamBadge } from '@/entities/team/ui/badge';
import { TeamDto } from '@/entities/team/model';

import { Join } from '@/features/team/join';

import { useAppRoutes } from '@/router/AppRoutes';
import type { PropType } from 'vue';
import type { BaseDto } from '@/shared/api/types';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/tooltip'

import IconVisible from '~icons/heroicons/eye-20-solid';
import IconInvisible from '~icons/heroicons/eye-slash-solid';

defineProps ({
    team: {
        type: TeamDto,
        required: true
    },
    request: {
        type: Boolean,
        default: false
    },
    desired_specializations: {
        type: Array as PropType<BaseDto[]>,
        default: () => []
    },
    me: {
        type: Boolean,
        default: false
    }
})

const appRoutes = useAppRoutes();
</script>

<style scoped lang="scss">
@import './styles';
</style>