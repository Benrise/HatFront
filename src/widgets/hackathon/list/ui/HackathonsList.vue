<template>
        <div class="hackathons-list">
            <TransitionGroup name="list" appear>
                <HackathonCard v-for="hackathon in hackathons" :key="hackathon.id" :hackathon="hackathon"/>
            </TransitionGroup>
        </div>
</template>

<script setup lang="ts">
import { HackathonModel } from '@/entities/hackathon';
import { HackathonCard } from '@/entities/hackathon/ui/card';
import { computed } from 'vue';

const hackathonStore = HackathonModel.useHackathonStore();

const fetch = async () => {
    await hackathonStore.fetchHackathons();
}
fetch();

const hackathons = computed(() => hackathonStore.getHackathons);
console.log(hackathons);
</script>

<style scoped lang="scss">
@import './styles';
</style>