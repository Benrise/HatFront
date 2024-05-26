<template>
    <div class="teams-list">
        <TransitionGroup name="list" appear>
            <TeamCard v-for="team in teams" :key="team.id" :team="team"/>
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
    if (teams.value.length > 0) return
    await teamStore.fetchList();
}

const observer = ref<HTMLElement | null>(null)
const teams = computed(() => teamStore.getList);

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