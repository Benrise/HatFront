<template>
  <div class="content-section">
    <div class="content-section__tabs">
      <Tabs v-if="tabs" :default-value="defaultTab" class="flex flex-col w-full gap-4">
        <div class="content-section__header">
          <div class="text-3xl font-medium">{{ title }}</div>
          <TabsList>
            <TabsTrigger v-for="tab in tabs" :key="tab.value" :value="tab.value">
              {{ tab.title }}
            </TabsTrigger>
          </TabsList>
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

import { defineProps } from "vue";

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

const defaultTab = props.tabs && props.tabs[0].value;
</script>

<style lang="scss" scoped>
.content-section {
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  height: 100%;
  width: 100%;

  &__header {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
  }
}
</style>
