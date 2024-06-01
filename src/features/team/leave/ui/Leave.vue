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
            <AlertDialogAction
              v-if="isCaptain && team.users.length > 1"
              @click="openAppoint = true"
            >
                Назначить
            </AlertDialogAction>
            <AlertDialogAction
              v-if="!isCaptain"
              @click="leaveTeam(team.id, leaveTeamPage)">
                Покинуть
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog v-model:open="openAppoint">
          <DialogContent class="dialog w-full" as="form" @submit="onSubmit">
            <DialogTitle>Переопределение капитана</DialogTitle>
            <div class="dialog__content leave">
              <div class="leave__field-group">
                <FormField v-slot="{ componentField }" name="user_id">
                  <FormItem class="leave__field">
                    <div class="leave__field-label">Капитан</div>
                    <Select v-bind="componentField">
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите нового капитана" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent align="center">
                        <SelectGroup>
                          <SelectItem v-for="user in filteredUsers" :key="user.id" :value="(user.id as unknown as string)">
                            {{ user.first_name }}
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>
            </div>
            <DialogFooter class="flex gap-2">
              <Button @click="openAppoint = false" variant="outline" type="submit" class="w-fit">
                Отмена
              </Button>
              <Button :loading="isLoading" type="submit" class="w-fit">
                Назначить и покинуть команду
              </Button>
            </DialogFooter>
          </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { Button } from '@/shared/ui/button';
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

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/shared/ui/dialog'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/ui/form';

import { computed, ref, type PropType } from 'vue';
import { router, useAppRoutes } from '@/router';

import { formSchema } from '../model';

import { useForm } from 'vee-validate';

const props = defineProps({
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
  const openAppoint = ref(false);

  const teamStore = TeamModel.useTeamStore();
  const isLoading = computed(() => teamStore.isLoading);

  const appRoutes = useAppRoutes();

  const filteredUsers = computed(() => {
    return props.team.users.filter(user => !user.is_capitan);
  });

  const leaveTeamPage = () => {
    router.push(appRoutes?.getHome() || '#')
  }

  const leaveTeam = (id: number, callback?: () => void) => {
    teamStore.leaveTeam(id, callback);
  }

  const deleteTeam = (id: number, callback?: () => void) => {
    teamStore.deleteTeam(id, callback);
  }
  
  const { handleSubmit } = useForm({
    validationSchema: computed(() => formSchema),
  });

  const onSubmit = handleSubmit((values: any) => {
    teamStore.updateCaptain(values.user_id, () => leaveTeam(props.team.id, () => leaveTeamPage()));
});
</script>

<style scoped lang="scss">
.leave {
  &__field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
}
</style>