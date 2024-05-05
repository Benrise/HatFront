<template>
  <div class="user-badge">
    <router-link class="flex" :to="appRoutes?.getProfile()">
      <UserAvatar class="user-badge__avatar" :user="user"/>
    </router-link>
    <span v-if="!props.hideName" class="user-badge__name">{{ user.name }}</span>
  </div>
</template>
  

<script setup lang="ts">
import type { IUser } from '../../model';

import { UserAvatar } from '@/entities/user/ui/avatar';

import { useAppRoutes } from '@/router';

interface IProps {
  user: IUser,
  hideName?: boolean
}
const props = defineProps<IProps>()
const appRoutes = useAppRoutes()
</script>

<style scoped lang="scss">
@import './styles';
</style>