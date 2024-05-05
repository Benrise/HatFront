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
    avatar: 'https://source.unsplash.com/random',
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
@import './styles';
</style>