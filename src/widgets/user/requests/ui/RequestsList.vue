<template>
    <div class="requests">
        <div class="requests__group">
            <div class="requests__title">
                Приглашения в команду
            </div>
            <div class="requests__list">
                <TeamCard :team="request" v-for="(request, index) in requests" :key="index" class="requests__item" request/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import TeamCard from '@/entities/team/ui/card/TeamCard.vue'

import { UserModel } from '@/entities/user';
import { computed } from 'vue';

const userStore = UserModel.useUserStore();

const fetch = async () => {
  await userStore.fetchRequests();
}

const requests = computed(() => userStore.getRequests);

fetch();

</script>

<style scoped lang="scss">
.requests {
    display: flex;
    flex-direction: column;
    gap: 16px;

    &__title {
        @include subtitle();
        display: flex;
        flex-direction: row;
        width: 100%;
        align-items: center;
        gap: 8px;
    }

    &__group {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    &__item {
        width: fit-content;
    }
}
</style>