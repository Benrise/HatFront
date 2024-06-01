<template>
    <div class="flex flex-col gap-3">
        <SearchBar/>
        <div class="teams-list">
            <TransitionGroup name="list" appear>
                <TeamCard v-for="team in teams" :key="team.id" :team="team"/>
            </TransitionGroup>
        </div>
        <div ref="observer"></div>
    </div>  
</template>

<script setup lang="ts">
import { TeamCard } from '@/entities/team/ui/card';
import { TeamModel } from '@/entities/team';
import { computed, ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core'

import { SearchBar } from '@/features/search-bar';

const teamStore = TeamModel.useTeamStore();

const fetch = async (intersect: boolean) => {
    if (teams.value.length > 0 && !intersect) return
    await teamStore.fetchList();
}

const observer = ref<HTMLElement | null>(null)
const teams = computed(() => teamStore.getList);
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