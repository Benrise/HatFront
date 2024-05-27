<template>
    <AlertDialog v-model:open="openLeave" class="leave">
        <AlertDialogTrigger as-child>
            <slot />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Покинуть команду <span class="font-bold">{{ team.name }}</span>?</AlertDialogTitle>
            <AlertDialogDescription v-if="isCaptain">
                <span v-if="team.users.length === 1">
                    Вы являетесь капитаном и единственным участником команды. Если вы покинете команду, она будет расформирована. 
                </span>
                <span v-else-if="team.users.length > 1">
                  Вы являетесь капитаном. Чтобы покинуть команду, необходимо назначить нового капитана.
                </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              v-if="isCaptain && team.users.length === 1"
              @click="deleteTeam(team.id, leaveTeamPage)" 
              class="bg-destructive">
                Расформировать
            </AlertDialogAction>
            <AlertDialogAction v-if="isCaptain && team.users.length > 1">
              Назначить
            </AlertDialogAction>
            <AlertDialogAction v-if="(isCaptain || isMember) && team.users.length !== 1" @click="leaveTeam(team.id, leaveTeamPage)">
              Покинуть
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
</template>

<script setup lang="ts">
import { TeamModel } from '@/entities/team';
import type { TeamDto } from '@/entities/team/model';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from '@/shared/ui/alert-dialog'
import { ref, type PropType } from 'vue';
import { router, useAppRoutes } from '@/router';

defineProps({
    team: {
      type: Object as PropType<TeamDto>,
      required: true
    },
    isCaptain: {
      type: Boolean,
      default: false
    },
    isMember: {
      type: Boolean,
      default: false
    }
  })

  const openLeave = ref(false);

  const teamStore = TeamModel.useTeamStore();

  const appRoutes = useAppRoutes();

  const leaveTeamPage = () => {
    router.push(appRoutes?.getHome() || '#')
  }

  const leaveTeam = (id: number, callback?: () => void) => {
    teamStore.leaveTeam(id, callback);
  }

  const deleteTeam = (id: number, callback?: () => void) => {
    teamStore.deleteTeam(id, callback);
  }
</script>

<style scoped lang="scss">

</style>