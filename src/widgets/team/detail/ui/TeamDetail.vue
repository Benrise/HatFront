<template>
    <div class="team-detail">
        {{ team.id }}
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router'

import { TeamModel } from '@/entities/team';
const route = useRoute()

const teamStore = TeamModel.useTeamStore();
const teamId = computed(() => +route.params.id);

onBeforeMount(() => {
    teamStore.fetchTeam(teamId.value);
})

const team = computed(() => teamStore.getTeam);
</script>

<style scoped>

</style>