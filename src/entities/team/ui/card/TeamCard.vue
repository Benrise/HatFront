<template>
    <div class="team-card">
        <div class="team-card__main">
            <div class="flex flex-row w-full items-center justify-between gap-4">
                <router-link :to="appRoutes?.getTeam(team.id) || '/'" class="w-fit">
                    <TeamBadge :team="team" :me="me"/>
                </router-link>
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
            </div>
            <RouterLink v-if="team.hackathon" :to="appRoutes?.getHackathon(team.hackathon?.id || 0) || '/'" class="w-fit">
                <Badge variant="secondary" class="w-fit">{{ team.hackathon?.name }}</Badge>
            </RouterLink>
            <div class="team-card__info">
                <div class="team-card__description">
                    {{ team.description }} 
                </div>
            </div>
            <div class="team-card__tags" v-if="team.skills.length">
                <Badge v-for="skill in team.skills" :key="skill.id" class="team-card__tag">{{ skill.name }}</Badge>
            </div>
            <div class="team-card__roles" v-if="desired_specializations.length">
                <Badge v-for="specialization in desired_specializations" :key="specialization.id" class="team-card__role">
                    <div class="!max-w-[192px] !overflow-hidden text-ellipsis"> {{ specialization.name }}</div>
                </Badge>
            </div>
            <div v-if="team.specializations.length"  class="team-card__roles">
                <Badge v-for="specialization in team.specializations" :key="specialization.id" class="team-card__role">
                    <div class="!max-w-[192px] !overflow-hidden text-ellipsis"> {{ specialization.name }} {{ `(${specialization.current}/${specialization.required})` }}</div>
                </Badge>
            </div>
        </div>
        <div v-if="!request" class="team-card__actions">
            <Join v-if="(!team.has_team && !me)" :team="team">
                <Button :disabled="team.has_request" class="w-full">
                    {{ team.has_request ? 'Заявка отправлена' : 'Вступить в команду' }}
                </Button>
            </Join>
            <router-link :team="team" class="w-full" :to="appRoutes?.getTeam(team.id) || '/'">
                <Button :variant="team.has_team ? 'default' : 'outline' " class="w-full">
                    {{ team.has_team ? 'К команде' : 'Подробнее' }}
                </Button>
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