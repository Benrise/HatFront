<template>
  <div class="user-avatar">
    <Avatar :size="size" class="user-avatar__avatar">
      <AvatarImage class="user-avatar__image" :src="avatarSrc" alt="Аватар" />
      <AvatarFallback class="user-avatar__fallback">{{ avatarFallback }}</AvatarFallback>
    </Avatar>
    <UpdateAvatar
        v-if="editable" 
        :avatar-src="avatarSrc" 
        :is-loading="isLoading"
        @update-avatar="uploadFile" 
        @remove-avatar="removeAvatar"
        />
  </div>
</template>

<script setup lang="ts">
import { UpdateAvatar } from '@/features/update-avatar'
import { computed, type PropType } from 'vue';
import type { UserDto } from '../../model';
 
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

import { UserModel } from '@/entities/user';
import { STATIC_URL } from '@/app/config'

const props = defineProps({
  editable: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<'sm' | 'base' | 'lg' | 'xl'>,
    default: 'sm'
  },
  user: {
    type: Object as PropType<UserDto>,
    required: true
  }
});

const userStore = UserModel.useUserStore();
const isLoading = computed<boolean>( () => userStore.isLoading);

const avatarFallback = props.user.first_name?.charAt(0).toUpperCase() || '?';
const avatarSrc = computed(() => {
  return props.user.photo_url ? STATIC_URL + props.user.photo_url : '#';
})

const uploadFile = (file: File) => {
  if (file) {
    userStore.updateAvatar(file);
  }
};

const removeAvatar = () => {
  userStore.deleteAvatar();
}
</script>

<style scoped lang="scss">
.user-avatar {
  position: relative;
  display: flex;

  cursor: pointer;

  width: fit-content;

  &__edit {
    position: absolute;
    border-radius: 999px;
    bottom: 12px;
    right: 12px;
    outline: 6px solid hsl(var(--background));
    z-index: 50;
  }
}
</style>