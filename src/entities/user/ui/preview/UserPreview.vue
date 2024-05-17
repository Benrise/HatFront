
<template>
    <Dialog class="dialog">
        <DialogTrigger as-child>
            <slot/>
        </DialogTrigger>
        <DialogContent class="sm:max-w-fit">
            <div class="dialog__content">
                <div class="user-preview">
                    <div class="user-preview__header">
                        <UserAvatar :size="width < 500 ? 'base' : 'xl'" />
                        <div class="user-preview__group">
                            <div class="user-preview__name">
                                {{ fullName }}
                            </div>
                            <div class="user-preview__subgroup">
                                <div class="user-preview__item">Возраст: <div>{{ user?.age || 'Не указано' }}</div></div>
                                <div class="user-preview__item">Город: <div>{{ user?.city || 'Не указано' }}</div></div>
                                <div class="user-preview__item">Университет: <div>{{ user?.education?.[0]?.study_place || 'Не указано' }}</div></div>
                                <div class="user-preview__item">Направление: <div>{{ user?.education?.[0]?.education_program || 'Не указано' }}</div></div>
                            </div>
                        </div>
                    </div>
                    <div class="user-preview__group">
                        <div class="user-preview__item !flex-col">Специализации:
                            <div v-if="!user?.specializations?.length">Не указано</div>
                            <Badge v-else class="user-preview__spec">
                                <div v-for="(spec, index) in user?.specializations" :key="index">
                                    {{ spec.name + (index !== user?.specializations?.length - 1 ? ',' : '') + '&#8200;'}}
                                </div>
                            </Badge>
                        </div>
                        <div class="user-preview__item !flex-col">Технологии:
                            <div v-if="!user?.skills?.length">Не указано</div>
                            <div class="user-preview__skills" v-else>
                                <Badge class="user-preview__skill" v-for="(skill, index) in user?.skills" :key="index">
                                    {{ skill.name }}
                                </Badge>
                            </div>
                        </div>
                    </div>
                    <div class="user-preview__group">
                        <div class="user-preview__contact">
                            <img src="/images/svg/vk-mono.svg" alt="Vk">
                            <div class="user-preview__item">
                                {{user?.contacts?.vk_url || 'Не указано' }}
                            </div>
                        </div>
                        <div class="user-preview__contact">
                            <img src="/images/svg/telegram-mono.svg" alt="Telegram">
                            <div class="user-preview__item">
                                {{user?.contacts?.telegram || 'Не указано' }}
                            </div>
                        </div>
                        <div class="user-preview__contact">
                            <img src="/images/svg/email-mono.svg" alt="Email"> 
                            <div class="user-preview__item">
                                {{user?.contacts?.email || 'Не указано' }}
                            </div>
                        </div>
                        <div class="user-preview__contact">
                            <img src="/images/svg/github-mono.svg" alt="Github">
                            <div class="user-preview__item">
                                {{user?.contacts?.github_url || 'Не указано'}}
                            </div>
                        </div>
                    </div>
                    <div class="user-preview__item !flex-col">
                        О себе:
                        <div class="user-preview__about">
                            {{user?.about || 'Не указано' }}
                        </div>
                    </div>
                </div>
                <DialogFooter class="flex gap-2">
                    <Button type="button" class="w-full" disabled>
                        Пригласить в команду
                    </Button>
                    <Button type="button" variant="outline" class="w-full">
                    Поделиться профилем
                    </Button>
                </DialogFooter>
            </div>
        </DialogContent>
    </Dialog>
    </template>

<script setup lang="ts">
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/shared/ui/dialog'

import { UserAvatar } from '@/entities/user/ui/avatar';
import { computed } from 'vue';
import type { UserDto } from '../../model';
import { UserModel } from '../..';
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const userStore = UserModel.useUserStore();
const user = computed<UserDto>(() => userStore.getUser);
const fullName = computed(() => user.value.first_name + ' ' + user.value.second_name + ' ' + (user.value.patronymic ? user.value.patronymic : ''));

</script>
<style scoped lang="scss">
.user-preview {

    display: flex;
    flex-direction: column;
    @include adaptiveValue('gap', 48, 24);

    @media screen and (max-width: 379px) {
        overflow-y: auto;
        max-height: 400px;
    }

    &__header {
        display: flex;
        flex-direction: row;
        @include adaptiveValue('gap', 36, 8);

        @media screen and (max-width: 500px) {
            flex-direction: column;
            align-items: center;
        }
    }

    &__name {
        @include title();

        @media screen and (max-width: 500px) {
            text-align: center;
        }
    }

    &__group {
        display: flex;
        flex-direction: column;
        @include adaptiveValue('gap', 16, 12);
        
    }

    &__subgroup {
        display: flex;
        flex-direction: column;
        @include adaptiveValue('gap', 12, 4);

        @media screen and (max-width: 500px) {
            align-items: center;
        }
    }

    &__about {
        text-wrap: wrap;
        word-wrap: break-word;
        word-break: break-all;
    }

    &__contact {
        display: flex;
        gap: 8px;
        align-items: center;
        width: 100%;
    }

    &__item {
        @include body();
        width: fit-content;
        white-space: nowrap;
        display: flex;
        flex-direction: row;
        gap: 4px;

        @media screen and (max-width: 500px) {
            white-space: wrap;
        }
    }

    &__spec {
        background: none;
        color: hsl(var(--foreground));
        border-left: 1px solid hsl(var(--accent));
        border-radius: 0;
    }

    &__skills {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 8px;
    }
}

.dialog {
    &__content {
        display: flex;
        flex-direction: column;
        @include adaptiveValue('gap', 48, 12);
    }
}
</style>