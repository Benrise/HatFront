<template>
  <div class="user-badge">
    <Avatar :store="userStore" :size="size" class="user-badge__avatar" :entity="user"/>
    <span v-if="!props.me" class="user-badge__name">{{ fullName || 'Пользователь' }}</span>
  </div>
</template>
  

<script setup lang="ts">
import type { UserDto } from '../../model';

import { UserModel } from '@/entities/user'

import { Avatar } from '@/features/avatar'

import { computed } from 'vue';

interface IProps {
  user: UserDto,
  size?: 'sm' | 'base' | 'lg' | 'xl',
  me?: boolean
}
const props = defineProps<IProps>()

const fullName = computed(() => props.user.first_name + ' ' + props.user.second_name + ' ' + (props.user.patronymic ? props.user.patronymic : ''));

const userStore = UserModel.useUserStore();
</script>

<style scoped lang="scss">
@import './styles';
</style>