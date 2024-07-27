<template>
    <div class="flex flex-col gap-3">
        <SearchBar :store="userStore"/>
        <div v-if="!userStore.isListLoading && users.length" class="teammates-list">
            <TransitionGroup name="list" appear>
                <TeammateCard v-for="user in users" :key="user.id" :user="user"/>
            </TransitionGroup>
        </div>
        <div v-else-if="userStore.isListLoading" class="h-[50vh] w-full flex items-center justify-center">
            <IconLoading class="h-16 w-16 mr-2 animate-spin text-primary" />
        </div>
        <div v-else class="h-[50vh] w-full flex items-center justify-center">
            <p>Ничего не найдено</p>
        </div>
        <div ref="observer"></div>
    </div>
</template>

<script setup lang="ts">
import { UserModel } from '@/entities/user';
import { TeammateCard } from '@/entities/teammate/ui';
import { computed, ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core'

import { SearchBar } from '@/features/search-bar';

const userStore = UserModel.useUserStore();

import IconLoading from '~icons/mingcute/loading-line';

const fetch = async (intersect: boolean) => {
    if (users.value.length > 0 && !intersect) return
    await userStore.fetchList();
}

const observer = ref<HTMLElement | null>(null)
const users = computed(() => userStore.getUsers);
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