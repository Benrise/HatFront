<template>
    <Dialog class="dialog" v-model:open="openCreating" @update:open="fetch($event)">
      <DialogTrigger as-child>
        <slot />
      </DialogTrigger>
        <DialogContent class="w-full" as="form" @submit="onSubmit">
          <DialogTitle>Создание команды</DialogTitle>
          <div class="dialog__content creating">
            <div class="invitation__field-group">
              <div class="creating__field">
                <Combobox
                  @update:modelValue="(e) => updateCaseFields(e)"
                  v-model="selectedHackathon"
                  placeholder="Выберите хакатон"
                  :store="hackathonStore"
                />
                <div v-if="errors.case_id" class="text-[0.8rem] font-medium text-destructive">
                  <span v-if="!cases.length">
                    У хакатона отсутствуют кейсы, выберете другой хакатон
                  </span>
                  <span v-if="!selectedHackathon">
                    Необходимо выбрать хакатон
                  </span>
                </div>
              </div>
            </div>
            <div class="creating__field-group">
              <FormField v-slot="{ componentField }" name="case_id">
                <FormItem v-if="cases.length" class="creating__field">
                  <FormLabel class="creating__field-label">Кейс</FormLabel>
                  <FormControl>
                    <transition name="fade" mode="out-in">
                      <RadioGroup
                        class="flex flex-col space-y-1"
                        v-bind="componentField"
                      >
                        <FormItem v-for="item in cases" :key="item.id" class="flex items-center space-y-0 gap-x-2">
                          <FormControl>
                            <RadioGroupItem :value="(item.id as unknown as string)"/>
                          </FormControl>
                          <FormLabel class="creating__field-label">
                            {{ item.name }}
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </transition>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
            <div class="creating__field-group">
              <FormField v-slot="{ componentField }" name="name">
                <FormItem class="creating__field">
                  <FormLabel class="creating__field-label">Название</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Введите название команды" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
            <div class="creating__field-group">
              <FormField v-slot="{ componentField }" name="url_group">
                <FormItem class="creating__field">
                  <FormLabel class="creating__field-label">Ссылка на беседу</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Введите название команды" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
            <div class="creating__field-group">
              <FormField v-slot="{ componentField }" name="description">
                <FormItem class="creating__field">
                  <FormLabel class="creating__field-label">Описание команды</FormLabel>
                  <FormControl>
                    <Textarea class="resize-none" placeholder="Кратко о команде" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
            <div class="creating__field-group">
              <FormField v-slot="{ componentField }" name="is_visible">
                <FormItem class="creating__field">
                  <FormLabel class="creating__field-label">Статус</FormLabel>
                  <FormControl>
                    <RadioGroup
                      class="flex flex-col space-y-1"
                      v-bind="componentField"
                    >
                      <FormItem class="flex items-center space-y-0 gap-x-2">
                        <FormControl>
                          <RadioGroupItem :value="(true as unknown as string)" />
                        </FormControl>
                        <FormLabel class="creating__field-label">
                          В поиске участников
                        </FormLabel>
                      </FormItem>
                      <FormItem class="flex items-center space-y-0 gap-x-2">
                        <FormControl>
                          <RadioGroupItem :value="(false as unknown as string)" />
                        </FormControl>
                        <FormLabel class="creating__field-label">
                          Набор закрыт
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </div>
          <DialogFooter class="flex gap-2">
            <Button type="submit" class="w-full">
              Создать
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
import { Input } from '@/shared/ui/input';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'
import { TeamModel } from '@/entities/team';
import { HackathonModel } from '@/entities/hackathon';

import { formSchema } from '../model';

import { useForm } from 'vee-validate';
import { CaseDto } from '@/entities/hackathon/model';

defineProps({
  user: {
    type: Object as PropType<UserDto>,
    required: true,
  },
});

const openCreating = ref(false);

const teamStore = TeamModel.useTeamStore();
const hackathonStore = HackathonModel.useHackathonStore();

const fetch = async (state: boolean) => {
  if (!state) {
    resetForm();
    cases.value = [];
    selectedHackathon.value = undefined;
  }
}

const hackathon = computed(() => hackathonStore.getHackathon);
const selectedHackathon = ref<number | string >();
const cases = ref<CaseDto[]>([]);

const { handleSubmit, resetForm, errors } = useForm({
  validationSchema: computed(() => formSchema)
});

const closeDialog = () => {
  openCreating.value = false;
  resetForm();
}

const onSubmit = handleSubmit((values: any) => {
    return teamStore.createTeam(values, closeDialog);
});

const updateCaseFields = async (hackathon_id: number | string | null) => {
  if (!hackathon_id) return;
  await hackathonStore.fetchHackathon(+hackathon_id);
  if (hackathon.value) {
    cases.value = hackathon.value.cases;
  }
}
</script>

<style scoped lang="scss">
@import './styles';
</style>