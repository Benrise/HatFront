<template>
    <div class="filters">
        <div class="filters__main">
            <div v-for="(filter, index) in filters" :key="index" class="filters__item item">
                <div class="item__title">
                    {{ filter.title }}
                </div>
                <component 
                    :is="filter.component" 
                    :placeholders="filter.placeholders" 
                    :options="filter.options" 
                    :class="filter.class"
                    v-model="selectedFilters[filter.name]"
                />
            </div>
        </div>
        <div class="filters__actions">
            <Button @click="resetFilters" class="filters__action" variant="secondary">Сброс</Button>
            <Button :disabled="disabledApply" :loading="isLoading" @click="activateFilters" class="filters__action">Применить</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'

import { RangeDatepicker } from '@/shared/ui/range-datepicker';
import { Button } from '@/shared/ui/button';
import { DoubleInput } from '@/shared/ui/double-input';

const props = defineProps({
    store: {
        type: Object,
        required: true
    }
})

const selectedFilters = computed(() => props.store.selectedFilters)

interface FilterConfig {
    name: string[],
    title: string,
    component: Component,
    class?: string,
    options?: Record<string, string | number>[],
    placeholders?: string[]
}

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
        class: 'max-w-[64px]',
        placeholders: ['1', '5'],
    },
    {
        name: ['prize_from', 'prize_to'],
        title: 'Призовой фонд',
        component: DoubleInput,
        placeholders: ['100 000', '1 000 000'],
    },
]

const activateFilters = () => {
    props.store.activateFilters()
}

const resetFilters = () => {
    props.store.resetFilters()
}

const isLoading = computed(() => {
    return props.store.isListLoading
})

const disabledApply = computed(() => {
    return Object.keys(selectedFilters.value).length === 0 || Object.keys(selectedFilters.value).every((key) => !selectedFilters.value[key])
})
</script>

<style scoped lang="scss">
@import './styles';
</style>