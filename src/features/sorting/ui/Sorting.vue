<template>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline">
            <IconSort class="size-6 mr-2"/>
          {{sortConfig[selectedValue]}}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56">
        <DropdownMenuLabel>Сортировка</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup v-model="selectedValue">
          <DropdownMenuRadioItem value="earliest">
            Сначала ранние 
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="latest">
            Сначала поздние
          </DropdownMenuRadioItem>
          <DropdownMenuSeparator />
          <DropdownMenuRadioItem value="costHigh" >
            Больший призовой фонд
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="costLow">
            Меньший призовой фонд
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
} from '@/shared/ui/dropdown-menu'
import { Button } from '@/shared/ui/button'

import { ref } from 'vue';

import IconSort from '~icons/heroicons/arrows-up-down';

const sortConfig: Record<string, string> = {
    earliest: 'Сначала ранние',
    latest: 'Сначала поздние',
    costHigh: 'Больший призовой фонд',
    costLow: 'Меньший призовой фонд'
}

const selectedValue = ref(Object.keys(sortConfig)[0])
</script>

<style scoped lang="scss">

</style>