<template>
    <div class="team-badge">
      <Avatar>
        <AvatarImage :src="avatarSrc" alt="Аватар" />
        <AvatarFallback>{{ avatarFallback }}</AvatarFallback>
      </Avatar>
      <span class="team-badge__name">{{ team.name }}</span>
      <Badge variant="outline">
        <IconGroup class="mr-2"/>
        2/3
      </Badge>
    </div>
  </template>
  

  <script setup lang="ts">
  import type { ITeam } from '../../model';
  import { computed } from 'vue';
  import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
  import { Badge } from '@/shared/ui/badge';

  import { STATIC_URL } from '@/app/config'

  import IconGroup from '~icons/heroicons/user-group';
  interface IProps {
    team: ITeam
  }
  const props = defineProps<IProps>()
  const avatarFallback = props.team.name.charAt(0).toUpperCase()

  const avatarSrc = computed(() => {
    if (props.team.avatar) {
      return STATIC_URL + props.team.avatar
    }
    return '#'
  })
  </script>

<style scoped lang="scss">
@import './styles';
</style>