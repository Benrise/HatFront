<template>
    <div class="avatar">
      <Avatar :size="size" class="avatar__main">
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
  const isLoading = computed<boolean>( () => props.store.isLoading);
  
  const name = computed(() => props.entity.name || props.entity.first_name || '?');

  const avatarFallback = name.value.charAt(0).toUpperCase();
  const avatarSrc = computed(() => {
    return props.entity.photo_url ? STATIC_URL + props.entity.photo_url : '#';
  })
  
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
  .avatar {
    position: relative;
    display: flex;
  
    cursor: pointer;
  
    width: fit-content;
  }
  </style>