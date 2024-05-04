<template>
    <div class="team-card">
        <div class="team-card__image">
            <img src="/images/png/team-cover.png" alt="">
        </div>
        <div class="team-card__main">
            <div class="team-card__info">
                <div class="team-card__title">
                    MISIS x MIREA Koptevo!
                </div>
                <div class="team-card__description">
                    Сборная студентов двух любимых вузов, которые любят ночевать в вузе во время хакатонов, отсылать решение за 6 секунд... 
                </div>
            </div>
            <div class="team-card__tags">
                <Badge class="team-card__tag">Vue</Badge>
                <Badge class="team-card__tag">Go</Badge>
                <Badge class="team-card__tag">PostgreSQL</Badge>
            </div>
            <div class="team-card__members">
                <Badge variant="outline">
                    <IconGroup class="mr-2"/>
                    2/3
                </Badge>
            </div>
            <div class="team-card__roles">
                <Badge class="team-card__role">Бэк (1/1)</Badge>
                <Badge class="team-card__role">Дизайн (1/1)</Badge>
                <Badge class="team-card__role">Фронт (0/1)</Badge>
            </div>
            <div class="team-card__actions">
                <Button class="w-full">Подробнее</Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';

import IconGroup from '~icons/heroicons/user-group';


</script>

<style scoped lang="scss">
@import './styles';
</style>