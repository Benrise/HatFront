<template>
    <div class="home">
        <div class="home__container">
            <Filters class="home__filters home__filters_desktop"/>
            <ContentSection :title="title" :tabs="tabs">
                <div class="home__search">
                    <SearchBar/>
                    <div class="home__sorting home__sorting_desktop">
                      <Sorting/>
                    </div>
                </div>
                <div class="home__controls home__controls_mobile">
                    <Sheet class="home__sheet sheet">
                      <SheetTrigger as-child>
                        <Button variant="outline" class="sheet__button">Фильтры</Button>
                      </SheetTrigger>
                      <SheetContent side="left">
                        <div class="sheet__content">
                          <SheetHeader class="sheet__header">Фильтры</SheetHeader>
                            <Filters class="sheet__filters"/>
                        </div>
                      </SheetContent>
                    </Sheet>
                    <div class="home_sorting home__sorting_mobile">
                      <Sorting/>
                    </div>
                </div>
                <HackathonsList/>
            </ContentSection>
        </div>
    </div>  
</template>

<script setup lang="ts">
import { ContentSection } from '@/shared/ui/content-section'
import { Button } from '@/shared/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/shared/ui/sheet'

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
        width: 100%;
    }

    &__container {
        display: flex;
        flex-direction: row;
        gap: 48px;
        @include adaptiveValue('padding-top', 64, 24);
    }
    &__controls {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        @include adaptiveValue('gap', 12, 6);
        width: 100%;
    }

    &__filters_desktop {
      padding-top: 104px;
    }

    @media screen and (max-width: 1199.98px) {
      &__filters_desktop,
      &__sorting_desktop {
        display: none;
      }
    }

    @media screen and (min-width: 1200px) {
      &__sorting_mobile {
        display: none;
      }
    }

    @media screen and (max-width: 379.98px) {
      &__controls {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
      }
    }
}

.sheet {
    &__header {
      @include title();
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 24px;
        width: 100%;
    }

    @media screen and (min-width: 1200px) {
      &__button {
        display: none;
      }
    }
}

</style>