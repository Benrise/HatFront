<template>
  <div class="user-badge">
    <router-link :to="appRoutes?.getProfile()">
      <Avatar class="user-badge__avatar avatar">
        <AvatarImage class="avatar__image" :src="avatarSrc" alt="Аватар" />
        <AvatarFallback class="avatar__fallback">{{ avatarFallback }}</AvatarFallback>
      </Avatar>
    </router-link>
    <span v-if="!props.hideName" class="user-badge__name">{{ user.name }}</span>
  </div>
</template>
  

<script setup lang="ts">
import type { IUser } from '../../model';

import { computed } from 'vue';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { useAppRoutes } from '@/router';

interface IProps {
  user: IUser,
  hideName?: boolean
}
const props = defineProps<IProps>()
const avatarFallback = props.user.name.charAt(0).toUpperCase()

const avatarSrc = computed(() => {
  if (props.user.avatar) {
    return props.user.avatar
  }
  return '#'
})

const appRoutes = useAppRoutes()
</script>

<style scoped lang="scss">
@import './styles';
</style>