<template>
    <div class="default-layout">
      <div class="default-layout__content">
        <slot />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style lang="scss">
  .default-layout {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    gap: 40px;
  
    &__content {}
  }
  </style>
  