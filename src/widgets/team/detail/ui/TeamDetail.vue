<template>
    <div class="team-detail">
        <div class="team-detail__main">
            
        </div>
        <div class="team-detail__hackathon">

        </div>
        <div class="team-detail__composition">

        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

import { TeamModel } from '@/entities/team';

import { UpdateAvatar } from '@/features/update-avatar';

import { STATIC_URL } from '@/app/config';

const route = useRoute()

const teamStore = TeamModel.useTeamStore();
const teamId = computed(() => +route.params.id);

onBeforeMount(() => {
    teamStore.fetchTeam(teamId.value);
})

const team = computed(() => teamStore.getTeam);
const isLoading = computed(() => teamStore.isLoading);
const avatarSrc = computed(() => {
  return team.value.photo_url ? STATIC_URL + team.value.photo_url : '#';
})

const uploadFile = (file: File) => {
  if (file) {
    teamStore.updateAvatar(file);
  }
};

const removeAvatar = () => {
    teamStore.deleteAvatar();
}
</script>

<style scoped lang="scss">
@import './styles';

.team-detail {
    display: flex;
    flex-direction: column;
    gap: 16px;

    &__main {
        display: flex;
        flex-direction: row;
        gap: 24px;
    }
}


</style>