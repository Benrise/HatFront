<template>
    <Dialog class="dialog" v-model:open="openInvitation" @update:open="fetch($event)">
      <DialogTrigger as-child>
        <slot />
      </DialogTrigger>
        <DialogContent class="w-full" as="form" @submit="onSubmit">
          <DialogTitle>Приглашение в команду</DialogTitle>
          <div class="dialog__content invitation">
            <div class="invitation__header">
              <UserBadge :user="user" @click="toggleOpen" />
            </div>
            <div class="invitation__field-group">
                <FormField name="team_id">
                  <FormItem class="invitation__field">
                    <FormLabel class="invitation__field-label">Команда</FormLabel>
                    <FormControl>
                        <Combobox
                          v-if="hasOwnTeams" 
                          @update:modelValue="setFieldValue('team_id', $event), updateSpecializationsFields(values.team_id)"
                          placeholder="Выберите команду"
                          :store="teamStore"
                          me
                        />
                        <Creating v-else :user="user">
                          <Button variant="outline" class="w-fit">Создать команду</Button>
                        </Creating>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
            </div>
            <div class="invitation__field-group" v-if="selectedTeamSpecializations.length">
              <FormField name="specialization_ids">
                <FormItem class="invitation__field">
                  <FormLabel class="invitation__field-label">Роль в команде</FormLabel>
                  <div class="flex flex-col gap-2">
                    <FormField
                      v-for="item in selectedTeamSpecializations"
                      v-slot="{ value, handleChange }"
                      :key="item.id"
                      type="checkbox"
                      :value="item.id"
                      :unchecked-value="false"
                      :name="`specialization_ids`"
                    >
                    <FormItem class="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          :checked="!!value && value.includes(item.id)"
                          @update:checked="handleChange"
                        />
                      </FormControl>
                      <FormLabel class="font-normal">
                        {{ item.name }}
                      </FormLabel>
                    </FormItem>
                  </FormField>
                  </div>
                </FormItem>
              </FormField>
            </div>
            <div class="invitation__field-group">
                <FormField v-slot="{ componentField }" name="message">
                  <FormItem class="invitation__field">
                    <FormLabel class="invitation__field-label">Сообщение</FormLabel>
                    <FormControl>
                      <Textarea class="resize-none" placeholder="Напишите сопроводительное письмо" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>
          </div>
          <DialogFooter class="flex gap-2">
            <Button type="submit" class="w-full">
              Отправить приглашение
            </Button>
          </DialogFooter>
        </DialogContent>
      <UserPreview :user="user" team />
  </Dialog>

</template>

<script setup lang="ts">
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogTitle,
} from '@/shared/ui/dialog';

import { Textarea } from '@/shared/ui/textarea';

import { computed, ref, type PropType } from 'vue';
import { UserBadge } from '@/entities/user';
import type { UserDto } from '@/entities/user/model';
import { UserPreview } from '@/entities/user';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';

import { Combobox } from '@/shared/ui/combobox';

import { Checkbox } from '@/shared/ui/checkbox';
import { TeamDto } from '@/entities/team/model';
import { TeamModel } from '@/entities/team';

import { formSchema } from '@/features/team/invitation';

import { useForm } from 'vee-validate';

import type { BaseDto } from '@/shared/api/types';

import { Creating } from '@/features/team/create';

import { UserModel } from '@/entities/user';

const props = defineProps({
  user: {
    type: Object as PropType<UserDto>,
    required: true,
  },
});

const openInvitation = ref(false);

const toggleOpen = () => {
  openInvitation.value = !openInvitation.value;
}

const teamStore = TeamModel.useTeamStore();
const userStore = UserModel.useUserStore();

const hasOwnTeams = computed(() => teamStore.hasOwnTeams);

const fetch = async (state: boolean) => {
  if (state) {
    await teamStore.fetchListMe();
  }
  else {
    resetForm();
    selectedTeamSpecializations.value = [];
  }
}

const myTeams = computed<TeamDto[]>(() => teamStore.getListMe);

const selectedTeamSpecializations = ref<BaseDto[]>([]);

const updateSpecializationsFields = (team_id: number | string | null) => {
  if (!team_id) return;
  const team = myTeams.value.find((item) => item.id.toString() === team_id.toString()) as TeamDto;
  if (team && team.specializations) {
    selectedTeamSpecializations.value = team.specializations;
  }
}

const { handleSubmit, values, setFieldValue, resetForm } = useForm({
  validationSchema: computed(() => formSchema),
  initialValues: {
    team_id: null,
    message: '',
    specialization_ids: []
  },
});

const closeDialog = () => {
  openInvitation.value = false;
  resetForm();
}

const onSubmit = handleSubmit((values: any) => {
    return userStore.invite(props.user.id, values, closeDialog);
});
</script>

<style scoped lang="scss">
@import './styles';
</style>