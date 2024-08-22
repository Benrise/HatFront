<template>
    <div :class="cn(props.class)" class="overflow-hidden text-ellipsis whitespace-nowrap block" >
        <slot/>
    </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/shared/lib/utils'


interface Props  {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<style scoped>

</style>