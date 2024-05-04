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
                <Button>Подробнее</Button>
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
.team-card {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
    background-color: hsl(var(--card));
    border-radius: 12px;

    &__info {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    &__roles,
    &__tags {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 8px;
        white-space: nowrap;
    }
    
    overflow-x: hidden;

    @media screen and (max-width: 579.98px) {
        &__roles,
        &__tags {
            flex-wrap: nowrap;
            overflow-y: hidden;
            overflow-x: scroll;
            padding-bottom: 4px;
        }
    }

    &__image {
        img {
            width: 100%;
        }
    }

    &__role {
        background: none;
        border-left: 1px solid hsl(var(--accent));
        border-radius: 0;
    }

    &__main {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    &__title {
        @include subtitle();
    }

    &__description {
        display: -webkit-box; 
        -webkit-box-orient: vertical; 
        -webkit-line-clamp: 3; 
        overflow: hidden; 
        text-overflow: ellipsis; 
        @include body();
    }
}
</style>