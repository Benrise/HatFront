<template>
    <div class="teams-list">
        <TransitionGroup name="list" appear>
            <TeamCard v-for="(_, index) in 10" :key="index"/>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { TeamCard } from '@/entities/team/ui/card';
</script>

<style scoped lang="scss">
@import './styles';
</style>