<template>
    <div class="hackathon-list">
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
.hackathon-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>