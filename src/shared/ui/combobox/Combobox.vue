<template>
    <Popover v-model:open="open">
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            role="combobox"
            :aria-expanded="open"
            class="justify-between border-border"
          >
            {{ value
              ? items.find((item) => item.id.toString() === value)?.name
              : placeholder }}
            <IconChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent class="p-0">
          <Command>
            <CommandInput class="h-9" :placeholder="placeholder" />
            <CommandEmpty>Ничего не найдено</CommandEmpty>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  v-for="item in items"
                  :key="item.id"
                  :value="item.id"
                  @select="(ev) => {
                    if (typeof ev.detail.value === 'string' || typeof ev.detail.value === 'number') {
                        value = ev.detail.value.toString()
                    }
                    open = false
                  }"
                >
                  {{ item.name }}
                  <CheckIcon
                    :class="cn(
                      'ml-auto h-4 w-4',
                      value === item.id.toString() ? 'opacity-100' : 'opacity-0',
                    )"
                  /> 
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
</template>

<script setup lang="ts">
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/shared/ui/command'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/popover'

import { Button } from '@/shared/ui/button'

import IconChevronDown from '~icons/heroicons/chevron-down-20-solid';
import { CheckIcon } from '@radix-icons/vue'

import { cn } from '@/shared/lib/utils'

import { ref, type PropType } from 'vue';
import { BaseDto } from '@/shared/api/types';


const open = ref(false)
const value = defineModel();

defineProps({
  placeholder: {
    type: String,
    default: 'Введите значение'
  },
  items: {
    type: Array as PropType<BaseDto[]>,
    required: true
  },
  cursor: {
    type: Number,
    default: 0
  },
})
</script>

<style scoped>

</style>