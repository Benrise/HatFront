<template>
    <div class="teammate-card">
        <div class="teammate-card__main">
            <div class="teammate-card__info">
                <UserBadge :user="mockUser"/>
                <div class="teammate-card__description">
                    UI/UX-дизайнер с опытом около года. Специализируюсь на интерфейсах и презентациях. Также есть опыт в разработке логотипов и favicon. 
                </div>
            </div>
            <div class="teammate-card__technologies">
                <Badge class="team-card__tag">Vue</Badge>
                <Badge class="team-card__tag">Go</Badge>
                <Badge class="team-card__tag">PostgreSQL</Badge>
            </div>
            <div class="teammate-card__roles">
                <Badge class="teammate-card__role">
                    Дизайн, Презентации, Фигма, Логотипы, UX/UI, +5...
                </Badge>
            </div>
        </div>
        <div class="teammate-card__actions">
            <Button class="w-full">Пригласить в команду</Button>
            <Button variant="outline" class="w-full">Подробнее</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { EGender, UserBadge, type IUser } from '@/entities/user';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';

const mockUser: IUser = {
    id: 1,
    name: 'John Doe',
    surname: 'Doe',
    patronymic: 'Doe',
    gender: EGender.male,
    birthday: new Date(),
    avatar: '',
    city: 'Moscow',
    university: 'Moscow State University',
    specialization: 'Computer Science',
    roles: [],
    technologies: [],
    vk: '',
    telegram: '',
    email: '',
    github: '',
    about: ''
}
</script>

<style scoped lang="scss">
.teammate-card {
    display: flex;
    flex-direction: row;
    background-color: hsl(var(--card));
    @include adaptiveValue('padding', 24, 12);
    border-radius: 12px;
    gap: 24px;

    &__main {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    &__actions {
        display: flex;
        flex-direction: column;
        @include adaptiveValue('gap', 12, 6);
        align-items: center;
        justify-content: center;
    }

    &__info {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    &__description {
        @include body();
        display: -webkit-box; 
        -webkit-box-orient: vertical; 
        -webkit-line-clamp: 3; 
        overflow: hidden; 
        text-overflow: ellipsis; 
        @include body();
        color: hsl(var(--muted-foreground));
    }

    &__roles,
    &__technologies {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 8px;
    }

    &__role {
        background: none;
        border-left: 1px solid hsl(var(--accent));
        border-radius: 0;
        max-width: 324px;
    }
    
    @media screen and (max-width: 1360px) {
        flex-direction: column;

        &__actions {
            flex-direction: row;
        }
    }

    @media screen and (max-width: 991.98px) {
        flex-direction: row;

        &__actions {
            flex-direction: column;
        }
    }

    @media screen and (max-width: 579.98px) {
        flex-direction: column;

        &__actions {
            flex-direction: row;
        }
    }

    @media screen and (max-width: 479.98px) {
        &__actions {
            flex-direction: column;
        }
    }
}
</style>