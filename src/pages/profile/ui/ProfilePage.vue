<template>
    <div class="profile">
      <div class="profile__container">
        <div class="profile__image">
          <UserAvatar size="xl" :user="mockUser" editable/>
        </div>
        <ContentSection :title="title" :tabs="tabs">

        </ContentSection>
      </div>
    </div>
</template>
  
<script setup lang="ts">
import { ContentSection } from '@/shared/ui/content-section';
import type { ITabsConfig } from '@/shared/ui/tabs';

import { UserAvatar } from '@/entities/user/ui/avatar';
import { EGender, type IUser } from '@/entities/user/model';

const title = "Профиль";

const tabs: ITabsConfig[] = [
  {
    value: "about",
    title: "О себе",
    content: {},
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

const mockUser: IUser = {
    id: 1,
    name: 'John Doe',
    surname: 'Doe',
    patronymic: 'Doe',
    gender: EGender.male,
    birthday: new Date(),
    avatar: 'https://source.unsplash.com/random',
    city: 'Moscow',
    university: 'Moscow State University',
    specialization: 'Computer Science',
    roles: [],
    technologies: [],
    vk: '',
    telegram: '',
    email: '',
    github: '',
    about: ''
}
</script>

<style scoped lang="scss">
@import './styles';

.profile {
  &__container {
    display: flex;
    flex-direction: row;
    gap: 48px;
    @include adaptiveValue('padding-top', 64, 24);
  }

  &__image {
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media screen and (min-width: 1200px) {
      padding: 24px;
      border: 1px solid hsl(var(--border));
      border-radius: 16px;
    }
  }
}
</style>