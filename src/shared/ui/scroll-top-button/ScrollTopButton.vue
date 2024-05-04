<template>
  <transition name="fade" mode="out-in">
    <div @click="scrollTop" v-show="visible" class="bottom-right">
      <div class="w-fit p-4 rounded-full bg-violet-600">
        <IconArrowUp class="text-foreground"/>
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
.bottom-right {
  position: sticky;
  bottom: 0;
  @include adaptiveValue('padding-right', 24, 16);
  @include adaptiveValue('padding-bottom', 24, 16);
  cursor: pointer;
  border-radius: 99px;
  width: 100%;
  display: flex;
  justify-content: end;
}
</style>