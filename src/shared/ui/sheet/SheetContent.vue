<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  DialogClose,
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from 'radix-vue'
import { Cross2Icon } from '@radix-icons/vue'
import { type SheetVariants, sheetVariants } from '.'
import { cn } from '@/shared/lib/utils'

interface SheetContentProps extends DialogContentProps {
  class?: HTMLAttributes['class']
  side?: SheetVariants['side']
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<SheetContentProps>()

const emits = defineEmits<DialogContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, side, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    />
    <DialogContent
      :class="cn(sheetVariants({ side }), props.class)"
      v-bind="{ ...forwarded, ...$attrs }"
      :onCloseAutoFocus="(e: Event) => e.preventDefault()"
    >
    <div class="flex w-full justify-end">

      <DialogClose
      class="rounded-sm disabled:pointer-events-none"
      >
        <Cross2Icon class="text-primary w-6 h-6" />
      </DialogClose>
    </div>
      <slot />
    </DialogContent>
  </DialogPortal>
</template>

<style lang="scss">

</style>
