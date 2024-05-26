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
            ? items.find((item: BaseDto) => item.id === value)?.name
            : placeholder }}
          <IconChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="p-0">
        <Command>
          <CommandInput class="h-9" :placeholder="placeholder" />
          <CommandList>
            <CommandGroup>
              <transition-group name="list" appear>
                <CommandItem
                v-for="item in items"
                :key="item.id"
                :value="item.id"
                @select="(ev) => {
                  if (typeof ev.detail.value === 'number') {
                      value = ev.detail.value
                  }
                  open = false
                }"
            >
              {{ item.name }}
              <CheckIcon
                :class="cn(
                  'ml-auto h-4 w-4',
                  value === item.id ? 'opacity-100' : 'opacity-0',
                )"
              /> 
            </CommandItem>
              </transition-group>
            </CommandGroup>
            <div v-if="isLoading" class="flex items-center justify-center w-full p-4">
              <IconLoading class="h-4 w-4 mr-2 animate-spin" />
            </div>
            <CommandEmpty v-if="!isLoading">Ничего не найдено</CommandEmpty>
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

import { computed, ref, watch } from 'vue';

import IconLoading from '~icons/mingcute/loading-line';
import type { BaseDto } from '@/shared/api/types';


const open = ref(false)
const value = defineModel();

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Введите значение'
  },
  cursor: {
    type: Number,
    default: 0
  },
  store: {
    type: Object,
    required: true
  },
  me: {
    type: Boolean,
  }
})

const items = computed<BaseDto[]>(() => {
  if (props.me) {
    return props.store.getListMe
  }
  else {
    return props.store.getList
  }
})

const isLoading = computed(() => props.store.isLoading)

watch(open, async () => {
  if (open.value) {
    await fetch();
  }
})

const fetch = async () => {
  if (props.me) {
    await props.store.resetListMe();
    await props.store.fetchListMe();
  }
  else {
    await props.store.resetList();
    await props.store.fetchList();
  }
}
</script>
