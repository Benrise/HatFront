<template>
    <div class="home">
        <div class="home__container">
            <!-- <Filters class="home__filters home__filters_desktop"/> -->
            <ContentSection :title="title" :tabs="tabs">
                <div class="home__search">
                    <SearchBar/>
                    <!-- <div class="home__sorting home__sorting_desktop">
                      <Sorting/>
                    </div> -->
                </div>
                <!-- <div class="home__controls home__controls_mobile">
                  <div class="home__sheet sheet">
                    <Sheet>
                      <SheetTrigger as-child>
                        <Button variant="outline" class="sheet__button">
                          <IconAdjustments class="mr-2"></IconAdjustments>
                          Фильтры
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" >
                        <div class="sheet__content">
                          <SheetHeader class="sheet__header">Фильтры</SheetHeader>
                          <Filters class="sheet__filters"/>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                    <div class="home_sorting home__sorting_mobile">
                      <Sorting/>
                    </div>
                </div> -->
            </ContentSection>
        </div>
    </div>  
</template>

<script setup lang="ts">
import { ContentSection } from '@/shared/ui/content-section';
import { Button } from '@/shared/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/shared/ui/sheet';

import type { ITabsConfig } from "@/shared/ui/tabs";

import { SearchBar } from '@/features/search-bar';
import { Sorting } from '@/features/sorting';

import { Filters } from '@/widgets/filters';
import { HackathonsList } from '@/widgets/hackathon/list';
import { TeamsList } from '@/widgets/team/list';
import { TeammatesList } from '@/widgets/teammate/list';

import IconAdjustments from '~icons/heroicons/adjustments-horizontal';
import { onUnmounted } from 'vue';
import { UserModel } from '@/entities/user';
import { HackathonModel } from '@/entities/hackathon';
import { TeamModel } from '@/entities/team';

const title = "Поиск";

const tabs: ITabsConfig[] = [
  {
    value: "hackathons",
    title: "Хакатонов",
    content: HackathonsList,
  },
  {
    value: "teams",
    title: "Команд",
    content: TeamsList,
  },
  {
    value: "teammates",
    title: "Напарников",
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