<template>
    <div class="teammate-card">
        <div class="teammate-card__main">
            <div class="teammate-card__info">
                <UserBadge :user="user" @click="toggleOpen"/>
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
            <UserPreview v-model:open="open" :user="user"/>
            <Button variant="outline" class="w-full" @click="toggleOpen">Подробнее</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { UserBadge } from '@/entities/user';
import type { UserDto } from '@/entities/user/model';

import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';

import { UserPreview } from '@/entities/user/ui/preview';
import { ref } from 'vue';

defineProps<{
    user: UserDto
}>();

const open = ref(false)

const toggleOpen = () => {
    open.value = !open.value
}
</script>

<style scoped lang="scss">
@import './styles';
</style>