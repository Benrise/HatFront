<template>
    <DropdownMenu class="sorting">
      <DropdownMenuTrigger as-child>
        <Button variant="outline" class="border-border w-fit" :class="{ 'sorting_mobile': type==='mobile', 'sorting_desktop': type==='desktop'}">
            <IconSort class="mr-2"/>
          {{ selectedValue?.title }}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56">
        <DropdownMenuLabel>Сортировка</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup v-model="selectedValue">
          <DropdownMenuRadioItem @select="() => store.updateSort(item)" v-for="(item, index) in config" :key="index" :value="item">
            <span class="absolute left-4 flex h-3.5 w-3.5 items-center justify-center">
              <DropdownMenuCheckboxItem :checked="item.name === selectedValue?.name && item.value === selectedValue?.value"/>
            </span>
            {{ item.title }}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from '@/shared/ui/dropdown-menu'

import { Button } from '@/shared/ui/button'

import { computed, ref, type PropType } from 'vue';

import IconSort from '~icons/heroicons/arrows-up-down';
import type { SortConfig } from '../model';

const props = defineProps({
    store: {
        type: Object,
        required: true
    },
    type: {
        type: String as PropType<'desktop' | 'mobile'>,
        default: 'desktop'
    },
    config: {
        type: Array as PropType<SortConfig[]>,
        required: true
    }
})

const sort = computed(() => props.store.sort)

const selectedValue = ref(props.config.find(item => item.value === sort.value[item.name]))

</script>

<style lang="scss">
@import './styles';
</style>