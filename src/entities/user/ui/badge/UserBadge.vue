<template>
  <div class="user-badge">
    <router-link class="flex" :to="appRoutes?.getProfile() || '#'">
      <UserAvatar :size="size"  class="user-badge__avatar" :user="user"/>
    </router-link>
    <span v-if="!props.hideName" class="user-badge__name">{{ fullName || 'Пользователь' }}</span>
  </div>
</template>
  

<script setup lang="ts">
import type { UserDto } from '../../model';

import { UserAvatar } from '@/entities/user/ui/avatar';

import { useAppRoutes } from '@/router';
import { computed } from 'vue';

interface IProps {
  user: UserDto,
  hideName?: boolean,
  size?: 'sm' | 'base' | 'lg' | 'xl',
}
const props = defineProps<IProps>()
const appRoutes = useAppRoutes()

const fullName = computed(() => props.user.first_name + ' ' + props.user.second_name + ' ' + (props.user.patronymic ? props.user.patronymic : ''));
</script>

<style scoped lang="scss">
@import './styles';
</style>