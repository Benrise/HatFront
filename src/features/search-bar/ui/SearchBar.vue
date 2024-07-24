<template>
    <div class="relative w-full items-center">
        <Input v-model="searchInputModelValue" id="search" type="text" placeholder="Поиск..." class="pl-10" />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
          <IconSearch class="size-6 text-muted-foreground" />
        </span>
    </div>
</template>

<script setup lang="ts">
import { Input } from '@/shared/ui/input';
import { computed } from 'vue';

import { useDebounceFn } from '@vueuse/core';

import IconSearch from '~icons/radix-icons/magnifying-glass?width=6px&height=6px';

const props = defineProps({
  store: {
    type: Object,
    required: true
  },
})

const updateSearchQuery = async (searchQuery?: string) => {
    await props.store.updateSearchQuery(searchQuery || '');
  };

const searchInputModelValue = computed<string>({
    get: () => props.store.searchQuery,
    set: useDebounceFn(updateSearchQuery, 500),
  });
  
</script>