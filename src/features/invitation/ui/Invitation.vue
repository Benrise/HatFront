<template>
    <Dialog class="dialog" @update:open="fetch($event)">
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
              <div class="user-detail__item">
                Команда
              </div>
              <div class="user-detail__fields">
                <FormField name="team">
                  <FormItem>
                    <FormControl>
                      <Combobox
                        @update:modelValue="setFieldValue('team', $event), updateSpecializationsFields(values.team)"
                        placeholder="Выберите команду"
                        :items="myTeams"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>
            </div>
            <transition name="fade" mode="out-in">
              <div v-if="selectedTeamSpecializations.length" class="invitation__field-group">
                <div class="user-detail__item">
                  Роль в команде
                </div>
                <div class="user-detail__fields">
                  <FormField name="specializations">
                    <FormItem class="flex flex-col gap-2">
                      <FormField
                        v-for="item in selectedTeamSpecializations"
                        v-slot="{ value, handleChange }"
                        :key="item.id"
                        type="checkbox"
                        :value="item.id"
                        :unchecked-value="false"
                        :name="`specialization_i_ds`"
                      >
                        <FormItem class="flex flex-row items-start space-x-3 space-y-0">
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
                    </FormItem>
                  </FormField>
                </div>
              </div>
            </transition>
            <div class="invitation__field-group">
              <div class="user-detail__item">
                Сообщение
              </div>
              <div class="user-detail__fields">
                <FormField v-slot="{ componentField }" name="message">
                  <FormItem>
                    <FormControl>
                      <Textarea class="resize-none" placeholder="Напишите сопроводительное письмо" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>
            </div>
          </div>
          <DialogFooter class="flex gap-2">
            <Button type="submit" class="w-full">
              Пригласить в команду
            </Button>
          </DialogFooter>
        </DialogContent>
      <UserPreview v-model:open="open" :user="user" team />
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

import { formSchema } from '../model';

import { useForm } from 'vee-validate';
import type { BaseDto } from '@/shared/api/types';

const props = defineProps({
  user: {
    type: Object as PropType<UserDto>,
    required: true,
  },
  me: {
    type: Boolean,
    default: false,
  },
});

const open = ref(false);

const toggleOpen = () => {
  open.value = !open.value;
}

const teamStore = TeamModel.useTeamStore();

const fetch = async (state: boolean) => {
  if (state) {
    await teamStore.fetchTeamsMe();
  }
  else {
    resetForm();
    selectedTeamSpecializations.value = [];
  }
}

const myTeams = computed<TeamDto[]>(() => teamStore.getMyTeams);

const selectedTeamSpecializations = ref<BaseDto[]>([]);

const updateSpecializationsFields = (team_id: number | string | null) => {
  if (!team_id) return;
  const team = myTeams.value.find((item) => item.id.toString() === team_id.toString()) as TeamDto;
  if (team && team.specializations) {
    selectedTeamSpecializations.value = team.specializations;
  }
}

const { handleSubmit, values, setFieldValue, resetForm, errors } = useForm({
  validationSchema: computed(() => formSchema),
  initialValues: {
    team: null,
    message: '',
    specialization_i_ds: []
  }
});

const onSubmit = handleSubmit((values: any) => {
    return teamStore.invite(props.user.id, values, () => toggleOpen);
});
</script>

<style scoped lang="scss">
.invitation {

  display: flex;
  flex-direction: column;
  @include adaptiveValue('gap', 24, 16);

  @media screen and (max-width: 379px) {
    overflow-y: auto;
    max-height: 400px;
  }

  &__header {
    display: flex;
    flex-direction: row;
    @include adaptiveValue('gap', 36, 8);
  }

  &__field-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__item {
    @include body();
    width: fit-content;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    gap: 4px;

    @media screen and (max-width: 500px) {
      white-space: wrap;
    }
  }
}
</style>