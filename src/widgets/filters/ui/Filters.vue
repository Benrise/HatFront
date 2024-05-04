<template>
    <div class="filters">
        <div v-for="(filter, index) in filters" :key="index" class="filters__item item">
            <div class="item__title">
                {{ filter.title }}
            </div>
            <component :is="filter.component" :placeholders="filter.placeholders" :options="filter.options" :class="filter.class"/>
        </div>
        <div class="filters__actions">
            <Button class="filters__action" variant="secondary">Сброс</Button>
            <Button class="filters__action">Применить</Button>
        </div>
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
    placeholders?: string[]
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
        class: 'max-w-[64px]',
        placeholders: ['1', '5'],
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
        placeholders: ['100 000', '1 000 000'],
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
    gap: 24px;
    width: 100%;
    max-width: 276px;

    &__actions {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;
    }

    &__action {
        width: 100%;
    }

    &__title {
        @include title();
        align-items: flex-start;
    }

    @media screen and (max-width: 479.98px) {
        &__actions {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
        }
    }
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