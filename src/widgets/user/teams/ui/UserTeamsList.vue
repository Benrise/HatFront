<template>
    <div class="teams-list">
        <TransitionGroup name="list" appear>
            <div v-if="teamsMe.length" class="teams-list__list">
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

const teamStore = TeamModel.useTeamStore();

const fetch = async (intersect: boolean) => {
    if (teamsMe.value.length > 0 && !intersect) return
    await teamStore.fetchListMe();
}

const observer = ref<HTMLElement | null>(null)
const teamsMe = computed(() => teamStore.getListMe);
const intersect = ref(false);

useIntersectionObserver(
    observer,
    ([{ isIntersecting }]) => {
        if (isIntersecting && !teamStore.isListLoading) {
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