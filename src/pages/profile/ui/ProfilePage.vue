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
import { UserModel } from '@/entities/user'

import { Avatar } from '@/features/avatar'

import { computed } from 'vue';

const userStore = UserModel.useUserStore();

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
    content: {},
  },
  {
    value: "history",
    title: "История",
    content: {},
  }
];
</script>

<style scoped lang="scss">
@import './styles';

.profile {
  &__container {
    display: flex;
    flex-direction: row;
    gap: 48px;
  }

  &__image {
    display: flex;
    flex-direction: column;
    gap: 24px;
    height: fit-content;

    @media screen and (min-width: 1200px) {
      padding: 24px;
      border: 1px solid hsl(var(--border));
      border-radius: 16px;
    }

    @media screen and (max-width: 779.98px) {
      display: none;
    }
  }
}
</style>