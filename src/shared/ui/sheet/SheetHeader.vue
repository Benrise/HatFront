<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/shared/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    :class="
      cn('flex flex-col gap-y-2 text-center text-left text-xl', props.class)
    "
  >
    <slot />
  </div>
</template>
