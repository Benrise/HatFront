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
                    v-model:model-value1="filter[filter.name[0] as keyof FilterConfig]"
                    v-model:model-value2="filter[filter.name[1] as keyof FilterConfig]"
                    @update:modelValue1="(ev: string) =>setFilter(filter.name[0], ev)"
                    @update:modelValue2="(ev: string) =>setFilter(filter.name[1], ev)"
                />
            </div>
        </div>
        <div class="filters__actions">
            <Button class="filters__action" variant="secondary">Сброс</Button>
            <Button class="filters__action">Применить</Button>
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
        name: ['people_from', 'people_to'],
        title: 'Призовой фонд',
        component: DoubleInput,
        placeholders: ['100 000', '1 000 000'],
    },
]

const setFilter = (name: string, value: string) => {
    props.store.setFilterValue(name, value);
}
</script>

<style scoped lang="scss">
@import './styles';
</style>