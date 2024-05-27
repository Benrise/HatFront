<template>
    <div class="profile">
      <div class="profile__container">
        <div class="profile__image">
          <Avatar :store="userStore" :entity="user" size="xl" editable />
          <UserPreview :user="user" me>
            <Button variant="outline">Публичный просмотр</Button>
          </UserPreview>
        </div>
        <ContentSection :title="title" :tabs="tabs"/>
      </div>
    </div>
</template>
  
<script setup lang="ts">
import { ContentSection } from '@/shared/ui/content-section';
import type { ITabsConfig } from '@/shared/ui/tabs';
import { Button } from '@/shared/ui/button';

import { UserPreview } from '@/entities/user/ui/preview';

import { UserDetail } from '@/widgets/user/detail';
import { RequestsList } from '@/widgets/user/requests';
import { UserTeamsList } from '@/widgets/user/teams';


import { UserModel } from '@/entities/user'

import { Avatar } from '@/features/avatar'

import { computed, onMounted } from 'vue';
import { TeamModel } from '@/entities/team';

const userStore = UserModel.useUserStore();
const teamStore = TeamModel.useTeamStore();

const user = computed(() => userStore.getUser);

const title = "Профиль";

const tabs: ITabsConfig[] = [
  {
    value: "about",
    title: "О себе",
    content: UserDetail,
  },
  {
    value: "requests",
    title: "Заявки",
    content: RequestsList,
  },
  {
    value: "teams",
    title: "Команды",
    content: UserTeamsList,
  },
];

onMounted(async () => {
  await userStore.resetIncomingRequests();
  await userStore.resetOutcomingRequests();
  await teamStore.resetListMe();
})
</script>

<style scoped lang="scss">
@import './styles';
</style>