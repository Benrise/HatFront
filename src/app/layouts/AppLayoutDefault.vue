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
  
  <style scoped lang="scss">
  @import './styles';
  </style>
  