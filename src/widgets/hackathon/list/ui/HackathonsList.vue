<template>
    <div class="flex gap-6 w-full" ref="scroll">
        <Filters :filters="filters" :store="hackathonStore" type="desktop"/>
        <div class="flex flex-col gap-3 w-full">
            <div class="flex gap-3">
                <SearchBar :store="hackathonStore"/>
                <Sorting :config="sort" :store="hackathonStore" type="desktop"/>
            </div>
            <div class="flex justify-between">
                <Filters :filters="filters" :store="hackathonStore" type="mobile"/>
                <Sorting :config="sort" :store="hackathonStore" type="mobile"/>
            </div>
            <div v-if="hackathons.length" class="hackathons-list">
                <TransitionGroup name="list" appear>
                    <HackathonCard v-for="hackathon in hackathons" :key="hackathon.id" :hackathon="hackathon"/>
                </TransitionGroup>
            </div>
            <div ref="observer"></div>
            <div v-if="hackathonStore.isListLoading" class="w-full flex items-center justify-center">
                <IconLoading class="h-12 w-12 mr-2 animate-spin text-primary" />
            </div>
            <div v-if="!hackathons.length && !hackathonStore.isListLoading" class="w-full flex items-center justify-center">
                <p>Ничего не найдено</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { HackathonModel } from '@/entities/hackathon';
import { HackathonCard } from '@/entities/hackathon/ui';
import { computed, ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core'

import { RangeDatepicker } from '@/shared/ui/range-datepicker';
import { DoubleInput } from '@/shared/ui/double-input';

import { SearchBar } from '@/features/search-bar';

import IconLoading from '~icons/mingcute/loading-line';

import { Filters } from '@/widgets/filters';
import { Sorting } from '@/features/sorting';
import type { FilterConfig } from '@/widgets/filters/model';
import type { SortConfig } from '@/features/sorting/model';

const hackathonStore = HackathonModel.useHackathonStore();

const fetch = async (intersect: boolean) => {
    if (hackathons.value.length > 0 && !intersect) return
    await hackathonStore.fetchList();
}

const observer = ref<HTMLElement | null>(null);
const hackathons = computed(() => hackathonStore.getList);
const intersect = ref(false);

const filters: FilterConfig[] = [
    {
        name: ['date_from', 'date_to'],
        title: 'Дата проведения',
        component: RangeDatepicker,
    },
    {
        name: ['people_from', 'people_to'],
        title: 'Участники',
        component: DoubleInput,
        type: 'number',
        class: 'max-w-[64px]',
        placeholders: ['1', '5'],
    },
    {
        name: ['prize_from', 'prize_to'],
        title: 'Призовой фонд',
        type: 'number',
        component: DoubleInput,
        placeholders: ['100 000', '1 000 000'],
    },
]

const sort: SortConfig[] = [
    {
        name: 'date_is_ascending',
        value: true,
        title: 'Сначала ранние',
    },
    {
        name: 'date_is_ascending',
        value: false,
        title: 'Сначала поздние',
    },
    {
        name: 'prize_is_ascending',
        value: true,
        title: 'Больший призовой фонд',
    },
    {
        name: 'prize_is_ascending',
        value: false,
        title: 'Меньший призовой фонд',
    },
]

useIntersectionObserver(
    observer,
    async ([{ isIntersecting }]) => {
        if (isIntersecting && !hackathonStore.isListLoading) {
            await fetch(intersect.value);
            intersect.value = true
        }
    },
    {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
    }
)
</script>

<style scoped lang="scss">
@import './styles';
</style>