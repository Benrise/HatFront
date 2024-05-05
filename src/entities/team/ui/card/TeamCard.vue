<template>
    <div class="team-card">
        <div class="team-card__main">
            <TeamBadge :team="mockTeam"></TeamBadge>
            <Badge variant="secondary" class="w-fit">{{ mockTeam.active_hackathon }}</Badge>
            <div class="team-card__info">
                <div class="team-card__description">
                    Сборная студентов двух любимых вузов, которые любят ночевать в вузе во время хакатонов, отсылать решение за 6 секунд... 
                </div>
            </div>
            <div class="team-card__tags">
                <Badge class="team-card__tag">Vue</Badge>
                <Badge class="team-card__tag">Go</Badge>
                <Badge class="team-card__tag">PostgreSQL</Badge>
            </div>
            <div class="team-card__roles">
                <Badge class="team-card__role">Бэк (1/1)</Badge>
                <Badge class="team-card__role">Дизайн (1/1)</Badge>
                <Badge class="team-card__role">Фронт (0/1)</Badge>
            </div>
        </div>
        <div class="team-card__actions">
            <Button class="w-full">Подать заявку</Button>
            <Button variant="outline" class="w-full">Подробнее</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';

import { TeamBadge } from '@/entities/team/ui/badge';
import type { ITeam } from '@/entities/team/model';

const mockTeam: ITeam = {
    id: 1,
    name: 'MISIS x MIREA Koptevo!',
    avatar: 'https://source.unsplash.com/random/48x48',
    active_hackathon: 'Phystech Radar Tech Challenge',
    members_count: 2
}

</script>

<style scoped lang="scss">
@import './styles';
</style>