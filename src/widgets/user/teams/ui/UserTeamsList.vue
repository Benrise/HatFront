<template>
    <div class="teams-list">
        <transition v-if="isLoading" name="fade" mode="out-in">
            <Skeleton class="h-[192px] w-[324px] rounded-xl" />
        </transition>
        <TransitionGroup v-else name="list" appear>
            <div v-if="teamsMe.length" class="requests__list">
                <TeamCard v-for="team in teamsMe" :key="team.id" :team="team" me/>
            </div>
            <div v-else class="teams__empty opacity-50">
                Команды отсутствуют
            </div>
        </TransitionGroup>
    </div> 
    <div ref="observer"></div>
</template>

<script setup lang="ts">
import { TeamCard } from '@/entities/team/ui/card';
import { TeamModel } from '@/entities/team';
import { computed, ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';

import { Skeleton } from '@/shared/ui/skeleton'

const teamStore = TeamModel.useTeamStore();

const fetch = async (intersect: boolean) => {
    if (teamsMe.value.length > 0 && !intersect) return
    await teamStore.fetchListMe();
}

const observer = ref<HTMLElement | null>(null)
const teamsMe = computed(() => teamStore.getListMe);
const isLoading = computed(() => teamStore.isListLoading);
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