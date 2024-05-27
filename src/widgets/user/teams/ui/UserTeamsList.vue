<template>
    <div class="teams-list">
        <TransitionGroup name="list" appear>
            <TeamCard v-for="team in teamsMe" :key="team.id" :team="team" me/>
        </TransitionGroup>
    </div> 
    <div ref="observer"></div>
</template>

<script setup lang="ts">
import { TeamCard } from '@/entities/team/ui/card';
import { TeamModel } from '@/entities/team';
import { computed, ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core'

const teamStore = TeamModel.useTeamStore();

const fetch = async () => {
    if (teamsMe.value.length > 0) return
    await teamStore.fetchListMe();
}

const observer = ref<HTMLElement | null>(null)
const teamsMe = computed(() => teamStore.getListMe);

useIntersectionObserver(
    observer,
    ([{ isIntersecting }]) => {
        if (isIntersecting) {
            fetch();
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