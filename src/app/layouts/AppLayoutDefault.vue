<template>
    <div class="default-layout">
      <TheHeader/>
      <main class="default-layout__main">
        <slot />
      </main>
      <ScrollTopButton/>
      <TheFooter/>
    </div>
  </template>
  
  <script setup lang="ts">
  import TheHeader from "@/widgets/header";
  import TheFooter from "@/widgets/footer";
  import { ScrollTopButton } from '@/shared/ui/scroll-top-button'
  </script>
  
  <style lang="scss">
  .default-layout {
    display: flex;
    flex-direction: column;
    min-height: 100%;

    &__main {
      flex: 1 1 auto;
    }
  }
  </style>
  