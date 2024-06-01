<template>
    <div class="flex flex-col gap-3">
        <!-- <SearchBar/> -->
        <div class="hackathons-list">
            <TransitionGroup name="list" appear>
                <HackathonCard v-for="hackathon in hackathons" :key="hackathon.id" :hackathon="hackathon"/>
            </TransitionGroup>
        </div>
        <div ref="observer"></div>
    </div>
</template>

<script setup lang="ts">
import { HackathonModel } from '@/entities/hackathon';
import { HackathonCard } from '@/entities/hackathon/ui';
import { computed, ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core'

import { SearchBar } from '@/features/search-bar';

const hackathonStore = HackathonModel.useHackathonStore();

const fetch = async (intersect: boolean) => {
    if (hackathons.value.length > 0 && !intersect) return
    await hackathonStore.fetchList();
}

const observer = ref<HTMLElement | null>(null);
const hackathons = computed(() => hackathonStore.getList);
const intersect = ref(false);

useIntersectionObserver(
    observer,
    ([{ isIntersecting }]) => {
        if (isIntersecting) {
            fetch(intersect.value);
            intersect.value = true
        }
    },
    {
        root: null,
        rootMargin: '0px',
        threshold: 1
    }
)
</script>

<style scoped lang="scss">
@import './styles';
</style>