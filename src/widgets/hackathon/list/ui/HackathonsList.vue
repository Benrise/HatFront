<template>
    <div class="hackathons-list">
        <HackathonCard></HackathonCard>
        <HackathonCard></HackathonCard>
        <HackathonCard></HackathonCard>
        <HackathonCard></HackathonCard>
    </div>
</template>

<script setup lang="ts">
import { HackathonCard } from '@/entities/hackathon/ui/card';
</script>

<style scoped lang="scss">
@import './styles';
</style>