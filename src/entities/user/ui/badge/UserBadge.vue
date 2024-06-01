<template>
  <div class="user-badge" :class="team ? 'user-badge_team' : ''">
    <Avatar :store="userStore" :size="computedSize" class="user-badge__avatar" :entity="user"/>
    <div class="user-badge__text" :class="team ? 'user-badge_team' : ''">
      <span v-if="!props.me" class="user-badge__name">{{ fullName || 'Пользователь' }}</span>
      <slot name="subtext" />
    </div>
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
  me?: boolean,
  team?: boolean
}
const props = defineProps<IProps>()

const computedSize = computed(() => props.team ? 'lg' : props.size);

const fullName = computed(() => props.user.second_name + ' ' + props.user.first_name + ' ' + (props.user.patronymic ? props.user.patronymic : ''));

const userStore = UserModel.useUserStore();
</script>

<style scoped lang="scss">
@import './styles';
</style>