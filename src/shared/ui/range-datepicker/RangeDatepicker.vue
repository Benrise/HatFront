<template>
  <Popover>
    <PopoverTrigger as-child >
      <Button
        variant="outline"
        :class="cn(
          'w-full justify-start text-left font-normal border-border',
          !localValue && 'text-muted-foreground',
        )"
      >
        <IconCalendar :class="cn('mr-2 h-4 w-4', !(localValue.start || localValue.end) && 'text-muted-foreground')"/>
        <template v-if="localValue.start">
          <template v-if="localValue.end">
            {{ df.format(localValue.start.toDate(getLocalTimeZone())) }} - {{ df.format(localValue.end.toDate(getLocalTimeZone())) }}
          </template>

          <template v-else> 
            {{ df.format(localValue.start.toDate(getLocalTimeZone())) }}
          </template>
        </template>
        <template v-else>
          <span class="text-muted-foreground">Выберите дату</span>
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <RangeCalendar locale="ru-RU" v-model="localValue" initial-focus :number-of-months="2" @update:start-value="(startDate) => localValue.start = startDate" />
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { computed, ref, watch, type Ref } from 'vue'

import IconCalendar from '~icons/heroicons/calendar-days-20-solid';

import { RangeCalendar } from '@/shared/ui/range-calendar'
import { Button } from '@/shared/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { cn } from '@/shared/lib/utils'

import type { DateRange } from 'radix-vue';
import { DateFormatter, getLocalTimeZone } from '@internationalized/date';

const df = new DateFormatter('ru-RU', {
  dateStyle: 'short',
})

const props = defineProps({
  modelValue: {
      type: String,
      required: true,
      default: () => '',
  }
})

const emit = defineEmits(['update:modelValue']);

const fromValue = computed({
  get: () =>
    props.modelValue?.split(
      ',',
    )[0],
  set: (value) => {
    if (value) {
      emit('update:modelValue', `${value},${toValue.value}`);
    }
    else {
      emit('update:modelValue', undefined);
    }
  },
});

const toValue = computed({
  get: () =>
    props.modelValue?.split(',')[1] == 'null'
      ? ''
      : props.modelValue?.split(',')[1] || '',
  set: (value) => {
    if (value) {
      emit('update:modelValue', `${fromValue.value},${value ? value : ''}`);
    }
    else {
      emit('update:modelValue', undefined);
    }
  },
});

const localValue = ref({
  start: undefined,
  end: undefined,
}) as Ref<DateRange>

watch(() => localValue.value.start, (newValue) => {
  fromValue.value = newValue ? new Date(newValue.toDate(getLocalTimeZone())).toISOString() : ''
})

watch(() => localValue.value.end, (newValue) => {
  toValue.value = newValue ? new Date(newValue.toDate(getLocalTimeZone())).toISOString() : ''
})

watch(() => props.modelValue, (newValue) => {
  if (!newValue) {
    localValue.value = {
      start: undefined,
      end: undefined,
    }

    fromValue.value = ''
    toValue.value = ''
  }
})
</script>