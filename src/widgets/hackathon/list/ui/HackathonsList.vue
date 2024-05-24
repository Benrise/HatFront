<template>
    <div class="hackathons-list">
        <TransitionGroup name="list" appear>
            <HackathonCard v-for="hackathon in hackathons" :key="hackathon.id" :hackathon="hackathon"/>
        </TransitionGroup>
    </div>
    <div ref="observer"></div>
</template>

<script setup lang="ts">
import { HackathonModel } from '@/entities/hackathon';
import { HackathonCard } from '@/entities/hackathon/ui';
import { computed, ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core'

const hackathonStore = HackathonModel.useHackathonStore();

const fetch = async () => {
    await hackathonStore.fetchHackathons();
}

const observer = ref<HTMLElement | null>(null)
const hackathons = computed(() => hackathonStore.getHackathons);

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