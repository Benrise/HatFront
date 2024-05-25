<template>
  <div class="content-section">
    <div class="content-section__tabs tabs">
      <Tabs v-if="tabs" :default-value="defaultTab" @update:model-value="updateTab" class="flex flex-col w-full gap-4">
        <div class="content-section__header">
          <div class="content-section__title">{{ title }}</div>
          <TabsList class="tabs__list tabs__list_desktop">
            <TabsTrigger v-for="tab in tabs" :key="tab.value" :value="tab.value">
              {{ tab.title }}
            </TabsTrigger>
          </TabsList>
          <div class="tabs__list tabs__list_mobile">
            <TabsList as-child>
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="secondary" class="w-full">
                    {{ tabsLabels[dropdownTabsValue] }}
                    <IconChevronDown class="ml-2"/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuRadioGroup :model-value="String(dropdownTabsValue)" >
                    <div class="flex flex-col">
                      <TabsTrigger as-child v-for="tab in tabs" :key="tab.value" :value="tab.value">
                        <DropdownMenuRadioItem :value="tab.value">
                          {{  tab.title }}
                        </DropdownMenuRadioItem>
                      </TabsTrigger>
                    </div>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TabsList>
          </div>
        </div>
        <slot/>
        <TabsContent v-for="tab in tabs" :key="tab.value" :value="tab.value">
          <component :key="tab.value" :is="tab.content" />
        </TabsContent>
      </Tabs>
      <div v-if="!tabs && title" class="text-3xl font-medium">{{ title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger, type ITabsConfig } from "@/shared/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Button } from '@/shared/ui/button';

import IconChevronDown from '~icons/heroicons/chevron-down-20-solid';

import { ref } from "vue";
import type { StringOrNumber } from "node_modules/radix-vue/dist/shared/types";


const props = defineProps({
  title: {
    type: String,
    default: null
  },
  tabs: {
    type: Array as () => ITabsConfig[],
    default: null
  }
})

const tabsLabels: Record<string, string> = props.tabs?.reduce((acc: Record<string, string>, tab) => {
  acc[tab.value] = tab.title
  return acc
}, {})

const defaultTab = props.tabs && props.tabs[0].value;
const dropdownTabsValue = ref<StringOrNumber>(defaultTab);

const updateTab = (value: StringOrNumber) => {
  dropdownTabsValue.value = value;
}
</script>

<style scoped lang="scss">
@import './styles';
</style>
