<template>
    <div class="avatar">
      <Skeleton v-if="isLoading" :class="skeletonSize" class="rounded-full"></Skeleton>
      <Avatar v-else :size="size" class="avatar__main">
        <AvatarImage class="avatar__image" :src="avatarSrc" alt="Аватар" />
        <AvatarFallback class="avatar__fallback">{{ avatarFallback }}</AvatarFallback>
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
  import Skeleton from '@/shared/ui/skeleton/Skeleton.vue'
  import { UpdateAvatar } from '@/features/update-avatar'
  import { computed, type PropType } from 'vue';

  import type { BaseDtoAvatar } from '@/shared/api/types';
   
  import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
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
    entity: {
      type: Object as PropType<BaseDtoAvatar>,
      required: true
    },
    store: {
      type: Object as PropType<any>,
      required: true
    }
  });
  const isLoading = computed<boolean>(() => props.store.isLoading);
  
  const name = computed(() => (props.entity.name || props.entity.first_name) || '?');
  const avatarFallback = computed(() => name.value.charAt(0).toUpperCase());
  
  const avatarSrc = computed(() => {
    return props.entity.photo_url ? STATIC_URL + props.entity.photo_url : '#';
  })

  const skeletonSize = computed(() => {
    switch (props.size) {
      case 'sm':
        return 'w-10 h-10 text-xs';
      case 'base':
        return 'w-16 h-16 text-2xl';
      case 'lg':
        return 'w-32 h-32 text-5xl';
      case 'xl':
        return 'w-56 h-56 text-8xl';
      default:
        return 'w-10 h-10 text-xs';
    }
  });

  const uploadFile = (file: File) => {
    if (file) {
        props.store.updateAvatar(file);
    }
  };
  
  const removeAvatar = () => {
    props.store.deleteAvatar();
  }
  </script>
  
  <style scoped lang="scss">
    @import './styles';
  </style>