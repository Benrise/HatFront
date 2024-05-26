<template>
    <div class="team-detail">
        <div class="team-detail__main">
          <div class="team-detail__image">
            <Avatar :store="teamStore" :entity="team" size="xl" editable></Avatar>
            <Leave v-if="isMember" :team="team" :isCaptain="isCaptain">
              <Button variant="outline" class="w-full">Покинуть команду</Button>
            </Leave>
            <Join v-if="!isMember" :team="team">
              <Button :disabled="team.has_request"  variant="outline" class="w-full">
                 {{ team.has_request ? 'Заявка отправлена' : 'Вступить в команду' }}
              </Button>
            </Join>
          </div>
          <div v-if="!isCaptain" class="team-detail__info">
              <div class="team-detail__name">
                {{ team.name }}
              </div>
            <div class="team-detail__tags">
              <Badge variant="outline">
                <IconGroup class="mr-2"/>
                {{ team.user_count }}
              </Badge>
              <Badge variant="outline">
                {{ visabilityTitle }}
              </Badge>
            </div>
            <div class="team-detail__description">
              {{ team.description }}
            </div>
            <div class="team-detail__additionals">
              <div class="team-detail__tags">
                <Badge v-for="skill in team.skills" :key="skill.id" class="team-card__tag">{{ skill.name }}</Badge>
              </div>
              <div class="team-detail__roles">
                <Badge v-for="specialization in team.specializations" :key="specialization.id" class="team-detail__specialization">
                  {{ specialization.name }} {{ `(${specialization.current} / ${specialization.required})` }}
                </Badge>
              </div>
            </div>
          </div>
          <form v-else class="team-detail__info" @submit="onSubmit">
            <div class="team-detail__field-group">
              <div class="team-detail__fields">
                <FormField v-slot="{ componentField }" name="name">
                  <FormItem class="team-detail__field">
                    <FormLabel class="team-detail__field-label">Название</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Введите название команды" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="url_group">
                  <FormItem class="team-detail__field">
                    <FormLabel class="team-detail__field-label">Ссылка на беседу</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="https://example.com" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>
            </div>
            <div class="team-detail__field-group">
              <FormField v-slot="{ componentField }" name="description">
                <FormItem class="team-detail__field">
                  <FormLabel class="team-detail__field-label">Описание команды</FormLabel>
                  <FormControl>
                    <Textarea class="resize-none" placeholder="Кратко о команде" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
            <div class="team-detail__field-group">
              <FormField v-slot="{ componentField }" name="user_count">
                <FormItem class="team-detail__field">
                  <FormLabel class="team-detail__field-label">Количество участников</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      class="w-[36px]"
                      placeholder="1-5"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
            <div class="team-detail__field-group">
              <div class="team-detail__fields">
                <FormField name="specializations" v-slot="{ componentField }">
                  <FormItem class="team-detail__field">
                    <FormLabel class="team-detail__field-label">Специализации</FormLabel>
                    <FormControl>
                      <TagsInputCombobox v-model="componentField.modelValue" @update:modelValue="componentField['onUpdate:modelValue']" :objects="specializations"/>
                    </FormControl>
                  </FormItem>
                </FormField>
              </div>
              <div class="team-detail__fields team-detail__fields_addable">
                <FormField
                  v-for="(specialization, index) in values.specializations"
                  :key="specialization.id"
                  :name="`specializations[${index}].current`"
                  v-slot="{ componentField, errorMessage }"
                >
                  <FormItem class="team-detail__field team-detail__field_addable">
                    <FormLabel class="team-detail__field-label team-detail__field-label_addable">
                      {{ specialization.name }}
                    </FormLabel>
                    <FormControl>
                      <Input
                        v-bind="componentField"
                        :value="specialization.current || 0"
                        type="number"
                        disabled
                        class="w-[64px]"
                        placeholder="0"
                        :class="{ 'border-red-500': errorMessage }"
                      />
                    </FormControl>
                  </FormItem>
                  <FormField
                    :name="`specializations[${index}].required`"
                    v-slot="{ componentField, errorMessage }"
                  >
                    <FormItem class="team-detail__field team-detail__field_addable">
                      <FormControl>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger as-child>
                              <Input
                                v-bind="componentField"
                                v-model="values.specializations[index].required"
                                type="number"
                                class="w-[64px]"
                                :class="{ 'border-red-500': errorMessage }"
                                placeholder="Необходимое количество"
                              />
                            </TooltipTrigger>
                            <TooltipContent v-if="!errorMessage" side="bottom">
                              <p>Необходимое количество человек</p>
                            </TooltipContent>
                            <TooltipContent class="text-red-500 bg-red-100" v-else side="bottom">
                              <p>{{ errorMessage }}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormControl>
                    </FormItem>
                  </FormField>
                </FormField>
              </div>
            </div>
            <div class="team-detail__field-group">
              <div class="team-detail__title">
                Компетенции
              </div>
              <div class="team-detail__fields">
                <FormField name="skills" v-slot="{ componentField }">
                  <FormItem class="team-detail__field">
                    <FormLabel class="team-detail__field-label">Технологии</FormLabel>
                    <FormControl>
                      <TagsInputCombobox v-model="componentField.modelValue" @update:modelValue="componentField['onUpdate:modelValue']" :objects="skills"/>
                    </FormControl>
                  </FormItem>
                </FormField>
              </div>
            </div>
            <div class="team-detail__field-group">
              <FormField v-slot="{ componentField }" name="is_visible">
                <FormItem class="team-detail__field">
                  <FormLabel class="team-detail__field-label">Статус</FormLabel>
                  <FormControl>
                    <RadioGroup
                      class="flex flex-col space-y-1"
                      v-bind="componentField"
                    >
                      <FormItem class="flex items-center space-y-0 gap-x-2">
                        <FormControl>
                          <RadioGroupItem :value="(true as unknown as string)" />
                        </FormControl>
                        <FormLabel class="team-detail__field-label">
                          В поиске участников
                        </FormLabel>
                      </FormItem>
                      <FormItem class="flex items-center space-y-0 gap-x-2">
                        <FormControl>
                          <RadioGroupItem :value="(false as unknown as string)" />
                        </FormControl>
                        <FormLabel class="team-detail__field-label">
                          Набор закрыт
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
            <Button class="w-fit" :loading="isLoading" type="submit">Сохранить</Button>
          </form>
        </div>
        <div class="team-detail__section">
          <div class="team-detail__section-title">
            Активный хакатон
          </div>
          <HackathonCard :hackathon="hackathon" team/>
        </div>
        <div class="team-detail__section">
          <div class="team-detail__section-title">
            Состав команды
          </div>
          <div class="team-detail__users">
            <TeammateCard class="w-fit" v-for="user in team.users" :key="user.id" :user="user" :specializations="team.specializations" team/>
          </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import TeammateCard from '@/entities/teammate/ui/card/TeammateCard.vue'
import { HackathonCard } from '@/entities/hackathon';
import { computed, onBeforeMount, watch, type ComputedRef } from 'vue';
import { useRoute } from 'vue-router';

import { TeamModel } from '@/entities/team';

import { Avatar } from '@/features/avatar'

import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'
import { TagsInputCombobox } from '@/shared/ui/tags-input-combobox';

import { Join } from '@/features/team/join';
import { Leave } from '@/features/team/leave';

import IconGroup from '~icons/heroicons/user-group';

import type { HackathonDto } from '@/entities/hackathon/model';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';

import { useForm } from 'vee-validate';
import { formSchema } from '../model'
import { UserModel } from '@/entities/user';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/tooltip'


const route = useRoute()

const teamStore = TeamModel.useTeamStore();
const specializationsStore = UserModel.useSpecializationsStore();
const skillsStore = UserModel.useSkillsStore();

const teamId = computed(() => +route.params.id);

onBeforeMount(async () => {
    await teamStore.fetchTeam(teamId.value);
    await skillsStore.fetchList();
    await specializationsStore.fetchList();
})

const team = computed(() => teamStore.getTeam);
const specializations = computed(() => specializationsStore.getSpecializations)
const skills = computed(() => skillsStore.getSkills)
const hackathon = computed(() => team.value.hackathon) as ComputedRef<HackathonDto>;

const visabilityTitle = computed(() => team.value.is_visible ? 'Открыта для набора' : 'Закрыта для набора');

const isMember = computed(() => teamStore.isMember);
const isCaptain = computed(() => teamStore.isCaptain);
const isLoading = computed(() => teamStore.isLoading);

const { handleSubmit, setValues, values } = useForm({
  validationSchema: computed(() => formSchema),
})

onBeforeMount(() => {
  setValues(team.value)
})

watch(team, () => {
  setValues(team.value)
})

const onSubmit = handleSubmit((updatedValues: any) => {
  return teamStore.updateTeam(teamId.value, updatedValues);
})
</script>

<style scoped lang="scss">
@import './styles';
</style>