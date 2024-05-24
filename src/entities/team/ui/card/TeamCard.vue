<template>
    <div class="team-card">
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
            <div class="team-card__roles">
                <Badge v-for="specialization in team.specializations" :key="specialization.id" class="team-card__role">
                    {{ specialization.name }} {{ `(${specialization.current} / ${specialization.required})` }}
                </Badge>
            </div>
        </div>
        <div class="team-card__actions">
            <Button class="w-full">Подать заявку</Button>
            <router-link class="w-full" :to="appRoutes?.getTeam(team.id) || '/'">
                <Button variant="outline" class="w-full">Подробнее</Button>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';

import { TeamBadge } from '@/entities/team/ui/badge';
import { TeamDto } from '@/entities/team/model';

import { useAppRoutes } from '@/router/AppRoutes';

defineProps ({
    team: {
        type: TeamDto,
        required: true
    }
})

const appRoutes = useAppRoutes()
</script>

<style scoped lang="scss">
@import './styles';
</style>