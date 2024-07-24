<template>
    <div class="flex flex-col gap-3">
        <SearchBar :store="hackathonStore"/>
        <div v-if="!hackathonStore.isListLoading && hackathons.length" class="hackathons-list">
            <TransitionGroup name="list" appear>
                <HackathonCard v-for="hackathon in hackathons" :key="hackathon.id" :hackathon="hackathon"/>
            </TransitionGroup>
        </div>
        <div v-else-if="hackathonStore.isListLoading" class="h-[50vh] w-full flex items-center justify-center">
            <IconLoading class="h-16 w-16 mr-2 animate-spin text-primary" />
        </div>
        <div v-else class="h-[50vh] w-full flex items-center justify-center">
            <p>Ничего не найдено</p>
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

import IconLoading from '~icons/mingcute/loading-line';

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