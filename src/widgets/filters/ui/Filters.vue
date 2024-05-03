<template>
    <div class="filters">
        <div v-for="(filter, index) in filters" :key="index" class="filters__item item">
            <div class="item__title">
                {{ filter.title }}
            </div>
            <component :is="filter.component" :options="filter.options" :class="filter.class"/>
        </div>
        <Button variant="secondary" class="w-fit">Сброс</Button>
    </div>
</template>

<script setup lang="ts">
import { type Component } from 'vue'

import { DoubleInput } from '@/shared/ui/double-input';
import { RangeDatepicker } from '@/shared/ui/range-datepicker';
import { type ITagsInputComboboxOption, TagsInputCombobox } from '@/shared/ui/tags-input-combobox';
import { Button } from '@/shared/ui/button';

enum FilterType {
    Date = 'date',
    Input = 'input',
    Tags = 'tags'
}

interface FilterConfig {
    title: string,
    component: Component,
    type: FilterType,
    class?: string,
    options?: ITagsInputComboboxOption[]
    placeholder?: string
}

const options: ITagsInputComboboxOption[] = [
  { value: 'ml', label: 'ML' },
  { value: 'web3', label: 'Web3' },
  { value: 'nft', label: 'NFT' },
  { value: 'saas', label: 'SaaS' },
]

const filters: FilterConfig[] = [
    {
        title: 'Участники',
        component: DoubleInput,
        type: FilterType.Input,
        class: 'max-w-[64px]'
    },
    {
        title: 'Дата проведения',
        component: RangeDatepicker,
        type: FilterType.Input,
    },
    {
        title: 'Призовой фонд',
        component: DoubleInput,
        type: FilterType.Input,
    },
    {
        title: 'Теги',
        component: TagsInputCombobox,
        type: FilterType.Tags,
        options: options
    }
]


</script>

<style scoped lang="scss">

.filters {
    display: flex;
    flex-direction: column;
    gap: 36px;
    width: 100%;
    max-width: 276px;
}

.item {
    display: flex;
    flex-direction: column;
    gap: 8px;

    &__title {
        @include body();
    }
}

</style>