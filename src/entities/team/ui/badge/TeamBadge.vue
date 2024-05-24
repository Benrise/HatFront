<template>
    <div class="team-badge">
      <Avatar>
        <AvatarImage :src="avatarSrc" alt="Аватар" />
        <AvatarFallback>{{ avatarFallback }}</AvatarFallback>
      </Avatar>
      <span class="team-badge__name">{{ team.name }}</span>
      <Badge variant="outline">
        <IconGroup class="mr-2"/>
        {{ team.user_count }}
      </Badge>
    </div>
  </template>
  

  <script setup lang="ts">
  import { TeamDto } from '../../model';
  import { computed } from 'vue';
  import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
  import { Badge } from '@/shared/ui/badge';

  import { STATIC_URL } from '@/app/config'

  import IconGroup from '~icons/heroicons/user-group';

  const props = defineProps({
    team: {
      type: TeamDto,
      required: true
    }
  })
  const avatarFallback = props.team.name?.charAt(0).toUpperCase()

  const avatarSrc = computed(() => {
    if (props.team.photo_url) {
      return STATIC_URL + props.team.photo_url
    }
    return '#'
  })
  </script>

<style scoped lang="scss">
@import './styles';
</style>