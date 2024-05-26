<template>
  <transition name="fade" mode="out-in">
    <div v-show="visible" class="bottom-right">
      <div @click="scrollTop" class="bottom-right__button">
        <IconArrowUp/>
      </div>
  </div>
  </transition>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

import IconArrowUp from '~icons/heroicons/arrow-up-16-solid?width=24px&height=24px';

const visible = ref(false);

const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
};

const scrollListener = () => {
  visible.value = window.scrollY > 150;
};

onMounted(() => {
  window.addEventListener('scroll', scrollListener);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scrollListener);
});
</script>

<style scoped lang="scss">
@import './styles';
</style>