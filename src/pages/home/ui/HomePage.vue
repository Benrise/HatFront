<template>
    <div class="home">
        <div class="home__container">
            <Filters/>
            <ContentSection :title="title" :tabs="tabs">
                <div class="home__search">
                    <SearchBar/>
                    <Sorting/>
                </div>
                <HackathonsList/>
            </ContentSection>
        </div>
    </div>  
</template>

<script setup lang="ts">
import { ContentSection } from '@/shared/ui/content-section'

import type { ITabsConfig } from "@/shared/ui/tabs";

import { SearchBar } from '@/features/search-bar';
import { Sorting } from '@/features/sorting';

import { Filters } from '@/widgets/filters';
import { HackathonsList } from '@/widgets/hackathon/list';

const title = "Поиск";

const tabs: ITabsConfig[] = [
  {
    value: "hackathons",
    title: "Хакатоны",
    content: {},
  },
  {
    value: "teams",
    title: " Команды",
    content: {},
  },
  {
    value: "teammates",
    title: "Тиммейты",
    content: {},
  }
];

</script>

<style scoped lang="scss">
.home {
    &__search {
        display: flex;
        flex-direction: row;
        gap: 12px;
    }

    &__container {
        display: flex;
        flex-direction: row;
        gap: 48px;
        @include adaptiveValue('padding-top', 64, 24);
    }
}

</style>