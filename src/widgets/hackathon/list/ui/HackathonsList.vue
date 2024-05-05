<template>
        <div class="hackathons-list">
            <TransitionGroup name="list" appear>
                <HackathonCard v-for="(_, index) in 10" :key="index"/>
            </TransitionGroup>
        </div>
</template>

<script setup lang="ts">
import { HackathonCard } from '@/entities/hackathon/ui/card';
</script>

<style scoped lang="scss">
@import './styles';
</style>