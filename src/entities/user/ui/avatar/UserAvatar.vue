<template>
  <div class="user-avatar">
    <Avatar :size="size" class="user-avatar__avatar">
      <AvatarImage class="user-avatar__image" :src="avatarSrc" alt="Аватар" />
      <AvatarFallback class="user-avatar__fallback">{{ avatarFallback }}</AvatarFallback>
    </Avatar>
    <Button size="icon" v-if="editable" class="user-avatar__edit"><IconPencil/></Button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IUser } from '../../model';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';

import IconPencil from '~icons/heroicons/pencil';

interface IProps {
    user: IUser,
    editable?: boolean,
    size?: 'sm' | 'base' | 'lg' | 'xl'
}
const props = defineProps<IProps>()
const avatarFallback = props.user.name.charAt(0).toUpperCase()

const avatarSrc = computed(() => {
  if (props.user.avatar) {
    return props.user.avatar
  }
  return '#'
})

</script>

<style scoped lang="scss">
.user-avatar {
  position: relative;
  display: flex;

  cursor: pointer;

  &__edit {
    position: absolute;
    border-radius: 999px;
    bottom: 12px;
    right: 12px;
    outline: 6px solid hsl(var(--background));
    z-index: 999;
  }
}
</style>