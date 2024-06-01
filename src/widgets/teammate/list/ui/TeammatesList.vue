<template>
    <div class="teammates-list">
        <TransitionGroup name="list" appear>
            <TeammateCard v-for="user in users" :key="user.id" :user="user"/>
        </TransitionGroup>
    </div>
    <div ref="observer"></div>
</template>

<script setup lang="ts">
import { UserModel } from '@/entities/user';
import { TeammateCard } from '@/entities/teammate/ui';
import { computed, ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core'

const userStore = UserModel.useUserStore();

const fetch = async (intersect: boolean) => {
    if (users.value.length > 0 && !intersect) return
    await userStore.fetchList();
}

const observer = ref<HTMLElement | null>(null)
const users = computed(() => userStore.getUsers);
const intersect = ref(false);

useIntersectionObserver(
    observer,
    ([{ isIntersecting }]) => {
        if (isIntersecting) {
            fetch(intersect.value);
            intersect.value = true
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