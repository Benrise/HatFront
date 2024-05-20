<template>
  <div class="user-badge">
    <UserAvatar :size="size" class="user-badge__avatar" :user="user"/>
    <span v-if="!props.me" class="user-badge__name">{{ fullName || 'Пользователь' }}</span>
  </div>
</template>
  

<script setup lang="ts">
import type { UserDto } from '../../model';

import { UserAvatar } from '@/entities/user/ui/avatar';

import { computed } from 'vue';

interface IProps {
  user: UserDto,
  size?: 'sm' | 'base' | 'lg' | 'xl',
  me?: boolean
}
const props = defineProps<IProps>()

const fullName = computed(() => props.user.first_name + ' ' + props.user.second_name + ' ' + (props.user.patronymic ? props.user.patronymic : ''));
</script>

<style scoped lang="scss">
@import './styles';
</style>