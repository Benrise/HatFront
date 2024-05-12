<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import { ComboboxAnchor, ComboboxInput, ComboboxPortal, ComboboxRoot } from 'radix-vue'
import { CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/shared/ui/command'
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from '@/shared/ui/tags-input'
import { type IBase } from "@/shared/api/types";

const props = defineProps<{
  objects: IBase[]
}>()

const modelValue = defineModel({
  type: Array as PropType<IBase[]>,
  default: () => [],
  required: true
})

const open = ref(false)
const searchTerm = ref('')

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const filteredItems = computed(() => props.objects.filter(i => !modelValue.value.includes(i)))

const filterFunction = (objects: IBase[], search: string) => {
  return objects.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
}

const removeItem = (item: IBase) => {
  modelValue.value.splice(modelValue.value.findIndex(i => i.id === item.id), 1)
}
</script>

<template>
  <TagsInput class="px-0 gap-0 w-ful" :model-value="modelValue">
    <div class="flex gap-2 flex-wrap items-center px-3">
      <TagsInputItem v-for="item in modelValue" :key="item.id" :value="item.name">
        <TagsInputItemText />
        <TagsInputItemDelete @click="removeItem(item)" />
      </TagsInputItem>
    </div>

    <ComboboxRoot :filter-function="filterFunction" v-model="modelValue" v-model:open="open" v-model:searchTerm="searchTerm" class="w-full">
      <ComboboxAnchor as-child>
        <ComboboxInput placeholder="Поиск" as-child>
          <TagsInputInput class="w-full px-3" :class="modelValue.length > 0 ? 'mt-2' : ''" @keydown.enter.prevent />
        </ComboboxInput>
      </ComboboxAnchor>

      <ComboboxPortal>
        <CommandList
          position="popper"
          class="w-[--radix-popper-anchor-width] rounded-md mt-2 border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        >
          <CommandEmpty>Ничего не найдено</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="item in filteredItems" :key="item.id" :value="item"
              @select.prevent="(ev) => {
                searchTerm = ''
                modelValue.push(ev.detail.value as IBase)
                if (filteredItems.length === 0) {
                  open = false
                }
              }"
            >
              {{ item.name }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </ComboboxPortal>
    </ComboboxRoot>
  </TagsInput>
</template>

