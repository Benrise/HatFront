<template>
    <div class="teammates-list">
        <TransitionGroup name="list" appear>
            <TeammateCard :user="undefinedUser" v-for="(_, index) in 10" :key="index"/>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { TeammateCard } from '@/entities/teammate/ui/card';
import type { UserDto } from '@/entities/user/model';

const undefinedUser: UserDto = {} as UserDto
</script>

<style scoped lang="scss">
@import './styles';
</style>