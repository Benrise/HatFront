<template>
  <transition name="fade" mode="out-in">
    <div @click="scrollTop" v-show="visible" class="bottom-right">
      <slot></slot>
  </div>
  </transition>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

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

<style scoped>
.bottom-right {
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
}
</style>