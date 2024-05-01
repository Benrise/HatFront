<template>
    <div class="default-layout">
      <TheHeader></TheHeader>
      <main class="default-layout__main">
        <slot />
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import TheHeader from "@/widgets/header";
  </script>
  
  <style lang="scss">
  @import '@/app/style/variables.scss';
  @import '@/app/style/mixins.scss';

  .default-layout {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    overflow: hidden;

    &__main {
      flex: 1 1 auto;
      @include adaptiveValue("padding", 24,6);
    }
  }
  </style>
  