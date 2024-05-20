<template>
  <form class="user-detail" @submit="onSubmit">
      <div class="user-detail__image">
        <UserAvatar size="lg" editable/>
        <UserPreview :user="user">
          <Button class="w-fit" variant="outline">Публичный просмотр</Button>
        </UserPreview>
      </div>
      <div class="user-detail__field-group">
          <div class="user-detail__title">
              Личные данные
              <TooltipProvider v-if="provider">
                <Tooltip>
                  <TooltipTrigger as-child>
                    <div class="user-detail__provider">
                      <img :src="provider.imgUrl" alt="logo" height="24" width="24"/>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Авторизация через {{provider.name}}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
          </div>
          <div class="user-detail__fields">
              <FormField name="first_name" v-slot="{ componentField }">
                  <FormItem class="user-detail__field">
                      <FormLabel class="user-detail__field-label">Имя</FormLabel>
                      <FormControl>
                          <Input type="text" placeholder="Введите имя" v-bind="componentField"/>
                      </FormControl>
                      <FormMessage />
                  </FormItem>
              </FormField>
              <FormField name="second_name" v-slot="{ componentField }">
                <FormItem class="user-detail__field">
                    <FormLabel class="user-detail__field-label">Фамилия</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Введите фамилия" v-bind="componentField"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField name="patronymic" v-slot="{ componentField }">
              <FormItem class="user-detail__field">
                  <FormLabel class="user-detail__field-label">Отчество</FormLabel>
                  <FormControl>
                      <Input type="text" placeholder="Введите отчество" v-bind="componentField"/>
                  </FormControl>
                  <FormMessage />
              </FormItem>
            </FormField>
              <FormField name="age" v-slot="{ componentField }">
                <FormItem class="user-detail__field">
                    <FormLabel class="user-detail__field-label">Возраст</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="Введите возраст" v-bind="componentField"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
          </div>
      </div>
      <div class="user-detail__field-group">
        <div class="user-detail__title">
          Образование
        </div>
        <transition name="fade" mode="out-in">
          <div class="user-detail__addable addable" v-if="values.education?.length">
            <transition-group name="addable" appear>
              <div v-for="(education, index) in values.education" :key="index" class="addable__item">
                <Button v-if="!education?.education_id" @click="removeEducation((values as UserDto), index)" type="button" class="addable__number">
                  <div class="addable__digit">
                    {{ index + 1 }}
                  </div>
                  <IconXmark class="addable__delete"/>
                </Button>
                <AlertDialog v-else>
                  <AlertDialogTrigger as-child>
                    <Button type="button" class="addable__number">
                      <div class="addable__digit">
                        {{ index + 1 }}
                      </div>
                      <IconXmark class="addable__delete"/>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Удалить образование №{{index + 1}} ?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Действие нельзя будет отменить, и оно будет выполнено немедленно.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Отмена</AlertDialogCancel>
                      <AlertDialogAction @click="removeEducation((values as UserDto), index, education.education_id)">Удалить</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <div class="user-detail__fields">
                  <FormField :name="`education[${index}].study_place`" v-slot="{ componentField }">
                    <FormItem class="user-detail__field">
                      <FormLabel class="user-detail__field-label">Учебное заведение</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Введите учебное заведение" v-bind="componentField"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                  <FormField :name="`education[${index}].education_program`" v-slot="{ componentField }">
                    <FormItem class="user-detail__field">
                      <FormLabel class="user-detail__field-label">Направление подготовки</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Введите направление подготовки" v-bind="componentField"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                  <FormField type="select" :name="`education[${index}].education_level.id`" v-slot="{ componentField }">
                    <FormItem class="user-detail__field">
                      <FormLabel class="user-detail__field-label">Уровень образования
                      </FormLabel>
                      <FormControl>
                        <Select v-bind="componentField">
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите уровень образования" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem v-for="level in education_levels" :key="level.id" :value="level.id as any">
                              {{ level.name }}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  </FormField>
                  <FormField :name="`education[${index}].course`" v-slot="{ componentField }">
                    <FormItem class="user-detail__field">
                        <FormLabel class="user-detail__field-label">Курс</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="Введите курс" v-bind="componentField"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  </FormField>
                  <!-- <FormField :name="`education[${index}].class`" v-slot="{ componentField }">
                    <FormItem class="user-detail__field">
                        <FormLabel class="user-detail__field-label">Класс</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="Введите класс" v-bind="componentField"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  </FormField> -->
                </div>
              </div>          
            </transition-group> 
          </div>
        </transition>
        <Button class="w-fit" type="button" variant="secondary" @click="addEducation(values as UserDto)">Добавить образование</Button>
      </div>
      <div class="user-detail__field-group">
        <div class="user-detail__title">
          Компетенции
        </div>
        <div class="user-detail__fields">
          <FormField name="specializations" v-slot="{ componentField }">
            <FormItem class="user-detail__field">
              <FormLabel class="user-detail__field-label">Специализации</FormLabel>
              <FormControl>
                <TagsInputCombobox v-model="componentField.modelValue" @update:modelValue="componentField['onUpdate:modelValue']" :objects="specializations"/>
              </FormControl>
            </FormItem>
          </FormField>
          <FormField name="skills" v-slot="{ componentField }">
            <FormItem class="user-detail__field">
              <FormLabel class="user-detail__field-label">Навыки</FormLabel>
              <FormControl>
                <TagsInputCombobox v-model="componentField.modelValue" @update:modelValue="componentField['onUpdate:modelValue']" :objects="skills"/>
              </FormControl>
            </FormItem>
          </FormField>
        </div>
      </div>
      <div class="user-detail__field-group">
        <div class="user-detail__title">
          Контакты
        </div> 
        <div class="user-detail__fields">
          <FormField name="city" v-slot="{ componentField }">
            <FormItem class="user-detail__field">
                <FormLabel class="user-detail__field-label">Город</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="Введите город" v-bind="componentField"/>
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
          <FormField v-slot="{ componentField }" name="contacts.vk_url">
            <FormItem class="user-detail__field">
                <FormLabel class="user-detail__field-label">Вконтакте</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="https://vk.com/example" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="contacts.telegram">
            <FormItem class="user-detail__field">
                <FormLabel class="user-detail__field-label">Telegram</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="@example" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="contacts.github_url">
            <FormItem class="user-detail__field">
                <FormLabel class="user-detail__field-label">Github</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="https://github.com/example" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="contacts.email">
            <FormItem class="user-detail__field">
                <FormLabel class="user-detail__field-label">Электронная почта</FormLabel>
                <FormControl>
                    <Input type="email" placeholder="example@mail.ru" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </div>
      <div class="user-detail__field-group">
        <div class="user-detail__item">
          О себе
        </div>
        <div class="user-detail__fields">
          <FormField v-slot="{ componentField }" name="about">
            <FormItem>
              <FormControl>
                <Textarea placeholder="Напишите вкратце о себе" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </div>
      <Button class="w-fit" :loading="isLoading" type="submit">Сохранить</Button>
  </form>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, watch } from 'vue'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/shared/ui/form'

import { useForm } from 'vee-validate';

import { Button } from '@/shared/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/tooltip'

import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'

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

import { TagsInputCombobox } from '@/shared/ui/tags-input-combobox';

import IconXmark from '~icons/heroicons/x-mark-20-solid';

import { type BaseDto } from "@/shared/api/types";

import { UserAvatar } from '@/entities/user/ui/avatar';
import type { UserDto } from '@/entities/user/model'

import { formSchema } from '../model'
import { UserModel } from '@/entities/user'
import { UserPreview } from '@/entities/user/ui';

const userStore = UserModel.useUserStore();
const educationLevelsStore = UserModel.useEducationLevelsStore();
const skillsStore = UserModel.useSkillsStore();
const specializationsStore = UserModel.useSpecializationsStore();

const isLoading = computed<boolean>( () => userStore.isLoading);

const fetch = async () => {
  await educationLevelsStore.fetchEducationLevels();
  await skillsStore.fetchSkills();
  await specializationsStore.fetchSpecializations();
}
fetch()

const specializations = computed<BaseDto[]>(() => specializationsStore.getSpecializations)
const skills = computed<BaseDto[]>(() => skillsStore.getSkills)
const education_levels = computed<BaseDto[]>(() => educationLevelsStore.getEducationLevels)
const user = computed<UserDto>(() => userStore.getUser);
const provider = computed<Record<string, string> | undefined>(() => userStore.getProvider);

const { handleSubmit, values, setValues } = useForm({
  validationSchema: computed(() => formSchema),
})

const onSubmit = handleSubmit((updatedValues: any) => {
  return userStore.updateUser(updatedValues);
})

onBeforeMount(() => {
  setValues(user.value)
})

watch(user, () => {
  setValues(user.value)
})

const addEducation = (values: UserDto) => {
  const newEducation = (values.education || []).concat([{}]);
  setValues({
    education: newEducation
  })
}

const removeEducation = (values: UserDto, index: number, id?: number) => {
  if (!id) {
    const newEducation = (values.education || []).filter((_, i) => i !== index);
    setValues({
      education: newEducation
    })
    return
  }
  const newEducation = (values.education || []).filter(item => item.education_id !== id);
  userStore.deleteEducation(id, () => setValues({
    education: newEducation
  }));
}

</script>
<style scoped lang="scss">
@import './styles';
</style>