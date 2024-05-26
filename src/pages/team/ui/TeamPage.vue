<template>
    <div class="team">
        <div class="team__container">
            <TeamDetail />
        </div>
    </div>
</template>

<script setup lang="ts">
import { TeamModel } from '@/entities/team';
import { TeamDetail } from '@/widgets/team/detail';
import { onUnmounted } from 'vue';

const teamStore = TeamModel.useTeamStore();

onUnmounted(async () => {
  await teamStore.resetItem()
})
</script>