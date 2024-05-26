<template>
    <Dialog class="dialog" v-model:open="openJoin" @update:open="fetch($event)">
      <DialogTrigger as-child>
        <slot />
      </DialogTrigger>
        <DialogContent class="w-full" as="form" @submit="onSubmit">
          <DialogTitle>Приглашение в команду</DialogTitle>
          <div class="dialog__content join">
            <div class="join__header">
              <TeamBadge :team="team" @click="toggleOpen" />
            </div>
            <div class="join__field-group" v-if="selectedTeamSpecializations.length">
                <FormField name="specialization_ids">
                  <FormItem class="join__field">
                    <FormLabel class="join__field-label">Роль в команде</FormLabel>
                    <div class="flex flex-col gap-2">
                      <FormField
                        v-for="item in selectedTeamSpecializations"
                        v-slot="{ value, handleChange }"
                        :key="item.id"
                        type="checkbox"
                        :value="item.id"
                        :unchecked-value="false"
                        name="specialization_ids"
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
            <div class="join__field-group">
                <FormField v-slot="{ componentField }" name="message">
                  <FormItem class="join__field">
                    <FormLabel class="join__field-label">Сообщение</FormLabel>
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

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';

import { Checkbox } from '@/shared/ui/checkbox';
import { TeamDto } from '@/entities/team/model';
import { TeamModel } from '@/entities/team';

import { formSchema } from '@/features/team/join';

import { useForm } from 'vee-validate';

import type { BaseDto } from '@/shared/api/types';

import { TeamBadge } from '@/entities/team';

const props = defineProps({
  team: {
    type: Object as PropType<TeamDto>,
    required: true,
  },
});

const openJoin = ref(false);

const selectedTeamSpecializations = ref<BaseDto[]>([]);

const teamStore = TeamModel.useTeamStore();

const toggleOpen = () => {
    openJoin.value = !openJoin.value;
}

const { handleSubmit, resetForm } = useForm({
  validationSchema: computed(() => formSchema),
  initialValues: {
    message: '',
    specialization_ids: []
  },
});

const fetch = async (state: boolean) => {
  if (state) {
    selectedTeamSpecializations.value = props.team.specializations || [];
  }
  else {
    resetForm();
    selectedTeamSpecializations.value = [];
  }
}

const closeDialog = () => {
    openJoin.value = false;
    resetForm();
}

const onSubmit = handleSubmit((values: any) => {
    return teamStore.join(props.team.id, values, closeDialog);
});
</script>

<style scoped lang="scss">
@import './styles';
</style>