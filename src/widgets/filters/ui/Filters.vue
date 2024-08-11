<template>
    <div v-if="type === 'desktop' || type === 'modal'" class="filters" :class="{'filters_desktop': type === 'desktop',  'filters_modal': type === 'modal'}" >
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
                    :type="filter.type"
                />
            </div>
        </div>
        <div class="filters__actions">
            <Button @click="resetFilters" class="filters__action" variant="secondary">Сброс</Button>
            <Button :disabled="disabledApply" @click="activateFilters" class="filters__action">Применить</Button>
        </div>
    </div>
    <Sheet v-else v-model:open="openFiltersModal">
        <SheetTrigger class="filters_mobile" as-child>
            <Button @click="openFiltersModal = true" variant="outline" class="border-border" >Фильтры</Button>
        </SheetTrigger>
        <SheetContent side="left">
            <SheetHeader>Фильтры</SheetHeader>
            <Filters :filters="filters" :applyCallback="() => openFiltersModal = false" :store="store" type="modal"/>
        </SheetContent>
    </Sheet>
</template>

<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import { Button } from '@/shared/ui/button';
import type { FilterConfig } from '../model';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/shared/ui/sheet'

const props = defineProps({
    store: {
        type: Object,
        required: true
    },
    filters: {
        type: Array as PropType<FilterConfig[]>,
        required: true
    },
    type: {
        type: String as PropType<'desktop' | 'mobile' | 'modal'>,
        default: 'desktop'
    },
    applyCallback: {
        type: Function
    },
})

const openFiltersModal = ref(false);

const selectedFilters = computed(() => props.store.selectedFilters)

const activateFilters = () => {
    props.store.activateFilters()
    if (props.type === 'modal') {
        props.applyCallback && props.applyCallback()
    }
}

const resetFilters = () => {
    props.store.resetFilters()
}

const disabledApply = computed(() => {
    return Object.keys(selectedFilters.value).length === 0 || Object.keys(selectedFilters.value).every((key) => !selectedFilters.value[key] || selectedFilters.value[key] === ',')
})
</script>

<style scoped lang="scss">
@import './styles';
</style>