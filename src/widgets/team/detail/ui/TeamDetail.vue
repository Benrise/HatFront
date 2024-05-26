<template>
    <div class="team-detail">
        <div class="team-detail__main">
          <div class="team-detail__image">
            <Avatar :store="teamStore" :entity="team" size="xl" editable></Avatar>
            <Leave v-if="isMember" :team="team" :isCaptain="isCaptain">
              <Button variant="outline" class="w-full">Покинуть команду</Button>
            </Leave>
            <Join v-if="!isMember" :team="team">
              <Button  variant="outline" class="w-full">Вступить в команду</Button>
            </Join>
          </div>
          <div class="team-detail__info">
              <div class="team-detail__name">
                {{ team.name }}
              </div>
            <div class="team-detail__tags">
              <Badge variant="outline">
                <IconGroup class="mr-2"/>
                {{ team.user_count }}
              </Badge>
              <Badge variant="outline">
                {{ visabilityTitle }}
              </Badge>
            </div>
            <div class="team-detail__description">
              {{ team.description }}
            </div>
            <div class="team-detail__additionals">
              <div class="team-detail__tags">
                <Badge v-for="skill in team.skills" :key="skill.id" class="team-card__tag">{{ skill.name }}</Badge>
              </div>
              <div class="team-detail__roles">
                <Badge v-for="specialization in team.specializations" :key="specialization.id" class="team-detail__specialization">
                  {{ specialization.name }} {{ `(${specialization.current} / ${specialization.required})` }}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <div class="team-detail__section">
          <div class="team-detail__section-title">
            Активный хакатон
          </div>
          <HackathonCard :hackathon="hackathon" team/>
        </div>
        <div class="team-detail__section">
          <div class="team-detail__section-title">
            Состав команды
          </div>
          <TeammateCard class="w-fit" v-for="user in team.users" :key="user.id" :user="user" team/>
        </div>
    </div>
</template>

<script setup lang="ts">
import TeammateCard from '@/entities/teammate/ui/card/TeammateCard.vue'
import { HackathonCard } from '@/entities/hackathon';
import { computed, onBeforeMount, type ComputedRef } from 'vue';
import { useRoute } from 'vue-router';

import { TeamModel } from '@/entities/team';
import { UserModel } from '@/entities/user';

import { Avatar } from '@/features/avatar'

import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge';

import { Join } from '@/features/team/join';
import { Leave } from '@/features/team/leave';

import IconGroup from '~icons/heroicons/user-group';

import type { HackathonDto } from '@/entities/hackathon/model';

const route = useRoute()

const teamStore = TeamModel.useTeamStore();
const userStore = UserModel.useUserStore();

const teamId = computed(() => +route.params.id);

onBeforeMount(() => {
    teamStore.fetchTeam(teamId.value);
})

const team = computed(() => teamStore.getTeam);
const hackathon = computed(() => team.value.hackathon) as ComputedRef<HackathonDto>;

const visabilityTitle = computed(() => team.value.is_visible ? 'Открыта для набора' : 'Закрыта для набора');

const user = computed(() => userStore.getUser);

const isMember = computed(() => teamStore.isMember);
const isCaptain = computed(() => teamStore.isCaptain);
</script>

<style scoped lang="scss">
@import './styles';
</style>