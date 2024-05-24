<template>
    <div class="team-detail">
        <div class="team-detail__main">
          <div class="team-detail__image">
            <Avatar :store="teamStore" :entity="team" size="xl" editable></Avatar>
            <Button variant="outline" class="w-full">Покинуть команду</Button>
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
import TeammateCard from './../../../../entities/teammate/ui/card/TeammateCard.vue'
import { HackathonCard } from '@/entities/hackathon';
import { computed, onBeforeMount, type ComputedRef } from 'vue';
import { useRoute } from 'vue-router';

import { TeamModel } from '@/entities/team';

import { Avatar } from '@/features/avatar'

import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge';

import IconGroup from '~icons/heroicons/user-group';
import type { HackathonDto } from '@/entities/hackathon/model';

const route = useRoute()

const teamStore = TeamModel.useTeamStore();
const teamId = computed(() => +route.params.id);

onBeforeMount(() => {
    teamStore.fetchTeam(teamId.value);
})

const team = computed(() => teamStore.getTeam);
const hackathon = computed(() => team.value.hackathon) as ComputedRef<HackathonDto>;

const visabilityTitle = computed(() => team.value.is_visible ? 'Открыта для набора' : 'Закрыта для набора');

</script>

<style scoped lang="scss">
@import './styles';

.team-detail {
    display: flex;
    flex-direction: column;
    @include adaptiveValue('gap', 128, 48);

    &__main {
        display: flex;
        flex-direction: row;
        gap: 24px;
    }

    &__roles,
    &__tags {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 8px;
        white-space: nowrap;
    }
    
    &__info {
      display: flex;
      flex-direction: column;
      gap: 24px;
      max-width: 624px;
      width: 100%;
    }

    &__image {
        display: flex;
        flex-direction: column;
        @include adaptiveValue('gap', 24, 12);
        height: fit-content;
        width: 100%;
        align-items: center;
        max-width: 274px;

        @media screen and (min-width: 1200px) {
          padding: 24px;
          border: 1px solid hsl(var(--border));
          border-radius: 16px;
      }
    }

    &__name {
        @include title();
    }

    &__description {
        @include body($line-height:32);
    }

    &__specialization {
        background: none;
        border-left: 1px solid hsl(var(--accent));
        border-radius: 0;
        color: hsl(var(--foreground));
    }

    &__additionals {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    &__section {
      display: flex;
      flex-direction: column;
      gap: 16px;

      &-title {
        @include subtitle();
      }
    }
    
    @media screen and (max-width: 768px) {
      &__main {
        flex-direction: column;
        align-items: center;
      }
    }
}


</style>