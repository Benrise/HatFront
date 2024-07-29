<template>
    <div class="flex gap-6 w-full">
        <Filters :store="hackathonStore"/>
        <div class="flex flex-col gap-3 w-full">
            <SearchBar :store="hackathonStore"/>
            <div v-if="hackathons.length" class="hackathons-list">
                <TransitionGroup name="list" appear>
                    <HackathonCard v-for="hackathon in hackathons" :key="hackathon.id" :hackathon="hackathon"/>
                </TransitionGroup>
            </div>
            <div v-if="hackathonStore.isListLoading" class="w-full flex items-center justify-center">
                <IconLoading class="h-12 w-12 mr-2 animate-spin text-primary" />
            </div>
            <div v-if="!hackathons.length && !hackathonStore.isListLoading" class="w-full flex items-center justify-center">
                <p>Ничего не найдено</p>
            </div>
            <div ref="observer"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { HackathonModel } from '@/entities/hackathon';
import { HackathonCard } from '@/entities/hackathon/ui';
import { computed, ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core'

import { SearchBar } from '@/features/search-bar';

import IconLoading from '~icons/mingcute/loading-line';

import { Filters } from '@/widgets/filters';

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