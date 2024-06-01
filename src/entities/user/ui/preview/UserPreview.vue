
<template>
    <Dialog class="dialog">
        <DialogTrigger as-child>
            <slot/>
        </DialogTrigger>
        <DialogContent class="sm:max-w-fit">
            <div class="dialog__content">
                <div class="user-preview">
                    <div class="user-preview__header">
                        <Avatar :store="userStore" :entity="user" :size="width < 500 ? 'base' : 'xl'" />
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
                <DialogFooter class="flex gap-2" v-if="!me">
                    <Button type="button" class="w-full" :disabled="team">
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

import { computed, type PropType } from 'vue';
import type { UserDto } from '../../model';
import { useWindowSize } from '@vueuse/core'

import { UserModel } from '@/entities/user'

import { Avatar } from '@/features/avatar'


const props = defineProps({
    user: {
        type: Object as PropType<UserDto>,
        required: true
    },
    me: {
        type: Boolean,
        default: false
    },
    team: {
        type: Boolean,
        default: false
    }
})

const { width } = useWindowSize();

const fullName = computed(
    () =>
        props.user?.first_name +
        ' ' +
        props.user?.second_name +
        ' ' +
        (props.user?.patronymic ? props.user?.patronymic : ''),
);

const userStore = UserModel.useUserStore();
</script>

<style scoped lang="scss">
@import './styles';
</style>