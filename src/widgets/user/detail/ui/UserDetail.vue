<template>
    <Form class="user-detail" @submit="() => {}">
        <div class="user-detail__image">
          <UserAvatar size="lg" :user="undefined" editable/>
          <Button class="w-fit" variant="outline">Публичный просмотр</Button>
        </div>
        <div class="user-detail__field-group">
            <div class="user-detail__title">
                Личные данные
            </div>
            <div class="user-detail__fields">
                <FormField v-slot="{ componentField }" name="name">
                    <FormItem class="user-detail__field">
                        <FormLabel class="user-detail__field-label">Фамилия</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Иванов" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="surname">
                    <FormItem class="user-detail__field">
                        <FormLabel class="user-detail__field-label">Имя</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Иван" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="patronymic">
                    <FormItem class="user-detail__field">
                        <FormLabel class="user-detail__field-label">Отчество</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Иванович" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ field, value }" name="birthday">
                  <FormItem class="user-detail__field">
                    <FormLabel class="user-detail__field-label">Дата рождения</FormLabel>
                    <Popover>
                      <PopoverTrigger as-child>
                        <FormControl>
                          <Button
                            variant="outline" :class="cn(
                              'justify-start text-left font-normal border-border',
                              !value && 'text-muted-foreground',
                            )"
                          >
                            <IconCalendar class="mr-2 h-4 w-4 opacity-50" />
                            <span>{{ value ? df.format(toDate(dateValue, getLocalTimeZone())) : "Введите дату рождения" }}</span>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent class="p-0">
                        <ExtendedCalendar/>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                  <input type="hidden" v-bind="field">
                </FormField>
                <FormField v-slot="{ componentField }" type="radio" name="type">
                    <FormItem class="user-detail__field">
                      <FormLabel class="user-detail__field-label">Пол</FormLabel>
                      <FormControl>
                        <RadioGroup
                          class="flex flex-row gap-4"
                          v-bind="componentField"
                        >
                          <FormItem class="flex items-center space-x-3 h-9">
                            <FormControl>
                              <RadioGroupItem value="male" />
                            </FormControl>
                            <FormLabel class="font-normal">
                              Мужской
                            </FormLabel>
                          </FormItem>
                          <FormItem class="flex items-center space-x-3 h-9">
                            <FormControl>
                              <RadioGroupItem value="female" />
                            </FormControl>
                            <FormLabel class="font-normal">
                              Женский
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
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
          <div class="user-detail__fields">
            <FormField type="select" name="type">
              <FormItem class="user-detail__field">
                <FormLabel class="user-detail__field-label">Университет</FormLabel>
                <FormControl>
                  <Combobox :items="universities" :placeholder="'Выберите университет'"/>
                </FormControl>
              </FormItem>
            </FormField>
            <FormField type="select" name="type">
              <FormItem class="user-detail__field">
                <FormLabel class="user-detail__field-label">Программа</FormLabel>
                <FormControl>
                  <Combobox :items="programms" :placeholder="'Выберите направление'"/>
                </FormControl>
              </FormItem>
            </FormField>
            <FormField type="select" name="course">
              <FormItem class="user-detail__field">
                <FormLabel class="user-detail__field-label">Курс</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите курс" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Высшее образование - бакалавриат</SelectLabel>
                        <SelectItem value="hb-1">
                          1 курс
                        </SelectItem>
                        <SelectItem value="hb-2">
                          2 курс
                        </SelectItem>
                        <SelectItem value="hb-3">
                          3 курс
                        </SelectItem>
                        <SelectItem value="hb-4">
                          4 курс
                        </SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Высшее образование - магистратура</SelectLabel>
                        <SelectItem value="hm-1">
                          1 курс
                        </SelectItem>
                        <SelectItem value="hm-2">
                          2 курс
                        </SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Высшее образование - аспирантура</SelectLabel>
                        <SelectItem value="hp-1">
                          1 курс
                        </SelectItem>
                        <SelectItem value="hp-2">
                          2 курс
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            </FormField>
          </div>
        </div>
        <div class="user-detail__field-group">
          <div class="user-detail__title">
            Компетенции
          </div>
          <div class="user-detail__fields">
            <FormField type="select" name="type">
              <FormItem class="user-detail__field">
                <FormLabel class="user-detail__field-label">Роли</FormLabel>
                <FormControl>
                  <TagsInputCombobox :options="roles"/>
                </FormControl>
              </FormItem>
            </FormField>
            <FormField type="select" name="type">
              <FormItem class="user-detail__field">
                <FormLabel class="user-detail__field-label">Технологии</FormLabel>
                <FormControl>
                  <TagsInputCombobox :options="technologies"/>
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
            <FormField type="select" name="type">
              <FormItem class="user-detail__field">
                <FormLabel class="user-detail__field-label">Город</FormLabel>
                <FormControl>
                  <Combobox :items="cities" :placeholder="'Выберите город'"/>
                </FormControl>
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="vk">
              <FormItem class="user-detail__field">
                  <FormLabel class="user-detail__field-label">Вконтакте</FormLabel>
                  <FormControl>
                      <Input type="text" placeholder="vk.com/example" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="tg">
              <FormItem class="user-detail__field">
                  <FormLabel class="user-detail__field-label">Telegram</FormLabel>
                  <FormControl>
                      <Input type="text" placeholder="@example" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="email">
              <FormItem class="user-detail__field">
                  <FormLabel class="user-detail__field-label">Электронная почта</FormLabel>
                  <FormControl>
                      <Input type="email" placeholder="example@mal.ru" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="github">
              <FormItem class="user-detail__field">
                  <FormLabel class="user-detail__field-label">Github</FormLabel>
                  <FormControl>
                      <Input type="email" placeholder="example" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </div>
        <div class="user-detail__field-group">
          <div class="user-detail__title">
            О себе
          </div>
          <div class="user-detail__fields">
            <FormField v-slot="{ componentField }" name="about">
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Вкратце о себе" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </div>
    </Form>
</template>

<script setup lang="ts">

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/shared/ui/form'

import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'
import { Button } from '@/shared/ui/button'

import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'

import { ExtendedCalendar } from '@/shared/ui/extended-calendar'
import { Combobox } from '@/shared/ui/combobox'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/popover'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'

import { TagsInputCombobox } from '@/shared/ui/tags-input-combobox'
import { UserAvatar } from '@/entities/user/ui/avatar';

import { toDate } from 'radix-vue/date'

import { DateFormatter, getLocalTimeZone } from '@internationalized/date'

import IconCalendar from '~icons/heroicons/calendar-days-20-solid';

import { cn } from '@/shared/lib/utils'

import { ref } from 'vue'

import { UserModel } from '@/entities/user'

const dateValue = ref()

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const date = ref()

const universities = [
  { value: 'rtu-mirea', label: 'РТУ МИРЭА' },
  { value: 'mgtu', label: 'МГТУ' },
]

const programms = [
  { value: 'programming-engineering', label: 'Программная инженерия' },
]

const roles = [
  { value: 'designer', label: 'Дизайнер' },
  { value: 'frontend', label: 'Фронтенд' },
  { value: 'backend', label: 'Бэкенд' },
]

const technologies = [
  { value: 'figma', label: 'Figma' },
  { value: 'go', label: 'Go' },
  { value: 'python', label: 'Python' },
]

const cities = [
  { value: 'moscow', label: 'Москва' },
]

</script>

<style scoped lang="scss">
.user-detail {
    display: flex;
    flex-direction: column;
    @include adaptiveValue('gap', 64, 36);
    &__title {
        @include subtitle();
    }

    &__field-group {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    &__fields {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(224px, 1fr));
        gap: 24px;
        grid-auto-flow: dense;
    }

    &__image {
        display: flex;
        flex-direction: column;
        @include adaptiveValue('gap', 24, 12);
        height: fit-content;
        width: 100%;
        align-items: center;

        @media screen and (min-width: 779.98px) {
          display: none;
        }
    }

    &__field {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    &__field-label {
      @include body();
    }
}
</style>