<template>
    <div class="teammate-card">
        <div class="teammate-card__main">
            <div class="teammate-card__info">
                <UserBadge :team="team" :user="user" @click="toggleOpen">
                    <template #subtext>
                        <span class="text-sm text-muted-foreground">{{ user.is_capitan ? 'Капитан' : '' }}</span>
                    </template>
                </UserBadge>
                <div v-if="!team" class="teammate-card__description">
                    {{ user.about }}
                </div>
            </div>
            <div  class="teammate-card__skills">
                <Badge v-for="(skill, index) in user?.skills" :key="index" class="team-card__tag">
                    {{ skill.name }}
                </Badge>
                <Badge variant="secondary" v-if="user?.skills?.length === 0">Технологии не указаны</Badge>
            </div>
            <div class="teammate-card__roles">
                <Badge  class="teammate-card__role">
                    <div v-for="(spec, index) in user?.specializations" :key="index">
                        {{ spec.name + (index !== user?.specializations?.length - 1 ? ',' : '') + '&#8200;'}}
                    </div>
                    <div v-if="user?.specializations?.length === 0">Специализации не указаны</div>
                </Badge>
            </div>
        </div>
        <div class="teammate-card__actions">
            <Button v-if="!team" class="w-full">Пригласить в команду</Button>
            <UserPreview v-model:open="open" :user="user" team/>
            <Button variant="outline" class="w-full" @click="toggleOpen">Подробнее</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { UserBadge } from '@/entities/user';
import { UserDto } from '@/entities/user/model';

import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';

import { UserPreview } from '@/entities/user/ui/preview';
import { ref } from 'vue';

defineProps({
    user: {
        type: UserDto,
        required: true
    },
    team: {
        type: Boolean,
        default: false
    }
})

const open = ref(false)

const toggleOpen = () => {
    open.value = !open.value
}
</script>

<style scoped lang="scss">
@import './styles';
</style>