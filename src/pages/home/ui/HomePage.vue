<template>
    <div class="home">
        <div class="home__container">
            <ContentSection :title="title" :tabs="tabs"/>
        </div>
    </div>  
</template>

<script setup lang="ts">
import { ContentSection } from '@/shared/ui/content-section';

import type { ITabsConfig } from "@/shared/ui/tabs";
import { HackathonsList } from '@/widgets/hackathon/list';
import { TeamsList } from '@/widgets/team/list';
import { TeammatesList } from '@/widgets/teammate/list';

import { onUnmounted } from 'vue';
import { UserModel } from '@/entities/user';
import { HackathonModel } from '@/entities/hackathon';
import { TeamModel } from '@/entities/team';

const title = "Поиск";

const tabs: ITabsConfig[] = [
  {
    value: "hackathons",
    title: "Хакатоны",
    content: HackathonsList,
  },
  {
    value: "teams",
    title: "Команды",
    content: TeamsList,
  },
  {
    value: "teammates",
    title: "Напарники",
    content: TeammatesList,
  }
];

const userStore = UserModel.useUserStore();
const hackathonStore = HackathonModel.useHackathonStore();
const teamStore = TeamModel.useTeamStore();

onUnmounted(async () => {
  await hackathonStore.resetList();
  await teamStore.resetList();
  await userStore.resetList();
})
</script>

<style scoped lang="scss">
@import './styles';
</style>