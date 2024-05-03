<script setup lang="ts">
import { type Ref, ref } from 'vue'
import {
  DateFormatter,
  getLocalTimeZone,
} from '@internationalized/date'

import IconCalendar from '~icons/heroicons/calendar-days-20-solid';

import type { DateRange } from 'radix-vue'
import { RangeCalendar } from '@/shared/ui/range-calendar'
import { Button } from '@/shared/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { cn } from '@/shared/lib/utils'

const df = new DateFormatter('ru-RU', {
  dateStyle: 'medium',
})

const value = ref({
  start: undefined,
  end: undefined,
}) as Ref<DateRange>
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          'w-[280px] justify-start text-left font-normal',
          !value && 'text-muted-foreground',
        )"
      >
        <IconCalendar class="mr-2 h-4 w-4" />
        <template v-if="value.start">
          <template v-if="value.end">
            {{ df.format(value.start.toDate(getLocalTimeZone())) }} - {{ df.format(value.end.toDate(getLocalTimeZone())) }}
          </template>

          <template v-else> 
            {{ df.format(value.start.toDate(getLocalTimeZone())) }}
          </template>
        </template>
        <template v-else>
          Выберите дату
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <RangeCalendar locale="ru-RU" v-model="value" initial-focus :number-of-months="2" @update:start-value="(startDate) => value.start = startDate" />
    </PopoverContent>
  </Popover>
</template>