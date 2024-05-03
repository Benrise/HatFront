<template>
    <div class="relative w-full items-center">
        <Input id="search" type="text" placeholder="Поиск..." class="pl-10" />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
          <IconSearch class="size-6 text-muted-foreground" />
        </span>
    </div>
</template>

<script setup lang="ts">
import { Input } from '@/shared/ui/input';

import IconSearch from '~icons/radix-icons/magnifying-glass?width=6px&height=6px';

</script>

<style scoped lang="scss">

</style>