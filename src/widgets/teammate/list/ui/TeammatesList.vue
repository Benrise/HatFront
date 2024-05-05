<template>
    <div class="teammates-list">
        <TransitionGroup name="list" appear>
            <TeammateCard v-for="(_, index) in 10" :key="index"/>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { TeammateCard } from '@/entities/teammate/ui/card';
</script>

<style scoped lang="scss">
@import './styles';
</style>