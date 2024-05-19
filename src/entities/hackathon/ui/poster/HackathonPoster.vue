<template>
    <div class="hackathon-card__image image">
        <div class="image__wrapper image">
            <img
                v-if="posterSrc !== '#'"
                :src="posterSrc" 
                class="image__bg"  
                alt="Задний фон постера хакатона"
            >
            <img
                v-if="posterSrc !== '#'"
                :src="posterSrc" 
                class="image__main" 
                alt="Постер хакатона"
            >
            <img 
                v-if="posterSrc === '#'"
                src="/images/png/hackathon-bg-fallback.png"
                alt="Постер хакатона"
                class="image__fallback"
            >
        </div>
        <Button class="image__button" size="icon">
            <IconChevronRight class="w-6 h-6"/>
        </Button>
    </div>
</template>

<script setup lang="ts">
import { STATIC_URL } from '@/app/config'

import IconChevronRight from '~icons/heroicons/chevron-right-20-solid';

import { Button } from '@/shared/ui/button';

import { computed } from 'vue';

const props = defineProps<{
    photo_url?: string
}>()

const posterSrc = computed(() => {
  return props.photo_url ? STATIC_URL + props.photo_url : '#';
})
</script>

<style scoped lang="scss">
@import './styles.scss';
</style>