<template>
    <div class="requests">
        <div class="requests__group">
            <div class="requests__title">
                Отправленные заявки в команду
            </div>
            <transition name="fade" mode="out-in">
                <Skeleton v-if="isLoading" class="h-[192px] w-[324px] rounded-xl" />
                <div v-else-if="!isLoading && incomingRequests.length" class="requests__list">
                    <TeamCard :team="request.team" v-for="request in incomingRequests" :key="request.id" class="requests__item" request>
                        <template #request-actions>
                            <Button @click="rejectRequest(request.id, 'incoming')" class="w-full" variant="outline">Отменить</Button>
                        </template>
                    </TeamCard>
                </div>
                <div v-else class="requests__empty opacity-50">
                    Заявки отсутствуют
                </div>
            </transition>
        </div>
        <div class="requests__group">
            <div class="requests__title">
               Приглашения в команду
            </div>
            <transition name="fade" mode="out-in">
                <Skeleton v-if="isLoading" class="h-[192px] w-[324px] rounded-xl" />
                <div v-else-if="!isLoading && outcomingRequests.length" class="requests__list">
                    <TeamCard :team="request.team" v-for="request in outcomingRequests" :key="request.id" class="requests__item" request>
                        <template #request-actions>
                            <Button @click="acceptRequest(request.id, 'outcoming')" class="w-full">Принять</Button>
                            <Button @click="rejectRequest(request.id, 'outcoming')" class="w-full" variant="outline">Отклонить</Button>
                        </template>
                    </TeamCard>
                </div>
                <div v-else class="requests__empty opacity-50">
                    Приглашения отсутствуют
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import TeamCard from '@/entities/team/ui/card/TeamCard.vue'

import { UserModel } from '@/entities/user';
import { computed } from 'vue';

import { Button } from '@/shared/ui/button';

import { Skeleton } from '@/shared/ui/skeleton'

const userStore = UserModel.useUserStore();

const incomingRequests = computed(() => userStore.getIncomingRequests);
const outcomingRequests = computed(() => userStore.getOutcomingRequests);

const fetch = async () => {
  if (incomingRequests.value.length > 0 || outcomingRequests.value.length > 0) return 
  await userStore.fetchIncomingRequests();
  await userStore.fetchOutcomingRequests();
}
fetch();

const isLoading = computed(() => userStore.isLoading);

const acceptRequest = async (id: number, type: 'outcoming' | 'incoming') => {
  await userStore.acceptRequest(id, type);
}

const rejectRequest = async (id: number, type: 'outcoming' | 'incoming') => {
  await userStore.rejectRequest(id, type);
}
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
        min-height: 223px;
    }

    &__item {
        width: fit-content;
        max-width: 324px;
    }

    &__list {
        display: flex;
        flex-direction: row;
        gap: 16px;
    }
}
</style>