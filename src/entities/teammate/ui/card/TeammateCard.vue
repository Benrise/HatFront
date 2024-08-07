<template>
    <div class="teammate-card" :class="team ? '!min-w-[242px] !max-w-[242px]' : ''">
        <div class="teammate-card__main">
            <div class="teammate-card__info">
                <UserBadge :team="team" :user="user" @click="toggleOpen">
                    <template #subtext>
                        <span class="text-sm text-muted-foreground">{{ user.is_capitan ? 'Капитан' : '' }}</span>
                    </template>
                </UserBadge>
                <div v-if="!team && user.about" class="teammate-card__description">
                    {{ user.about }}
                </div>
            </div>
            <div v-if="!team" class="teammate-card__tags">
                <Badge v-for="(skill, index) in user?.skills" :key="index">
                    {{ skill.name }}
                </Badge>
                <Badge variant="secondary" v-if="!user?.skills?.length">Технологии не назначены</Badge>
            </div>
            <form class="flex flex-col gap-3" @submit="onSubmit">
                    <template v-if="!openSpecializations">
                        <div v-if="desired_specializations.length" class="teammate-card__tags">
                            <Badge variant="ghost" v-for="specialization in desired_specializations" :key="specialization.id">
                                 {{ specialization.name }}
                            </Badge>
                        </div>
                        <div v-else class="teammate-card__tags">
                            <Badge variant="ghost" v-for="specialization in user.specializations" :key="specialization.id">
                                {{ specialization.name }}
                            </Badge>
                        </div>
                        <div v-if="user?.specializations?.length === 0 && !request" class="teammate-card__tags">
                            <Badge variant="ghost">
                                Специализации не указаны
                                <TooltipProvider v-if="!specializations.length && team" >
                                    <Tooltip>
                                    <TooltipTrigger @click="(e) => e.preventDefault()" as-child>
                                        <IconAttention class="text-orange-500 ml-2" />
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        <p>У команды отсутствуют специализации</p>
                                    </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </Badge>
                        </div>
                    </template>
                    <FormField v-if="openSpecializations && team && isCaptain"  name="specializations" v-slot="{ componentField }">
                        <FormItem>
                            <FormControl>
                                <TagsInputCombobox 
                                    v-model="componentField.modelValue"
                                    @update:modelValue="componentField['onUpdate:modelValue']" 
                                    :objects="specializations"
                                />
                            </FormControl>
                        </FormItem>
                    </FormField>
                      <div class="teammate-card__actions" v-if="team && isCaptain">
                        <Button :disabled="!specializations.length" type="button" variant="secondary" v-if="!openSpecializations" class="w-full" @click="toggleOpenSpecializations">
                            Назначить
                        </Button>
                        <Button type="submit" v-else class="w-full" :loading="isLoading" >
                            Сохранить
                        </Button>
                        <Button type="button" variant="secondary" v-if="openSpecializations" class="w-fit" @click="toggleOpenSpecializations">
                            <IconXmark/>
                        </Button>
                    </div>
            </form>
        </div>
        <div v-if="!request" class="teammate-card__actions">
            <Invitation v-if="!team" :user="user">
                <Button class="w-full">Пригласить</Button>
            </Invitation>
            <UserPreview v-model:open="open" :user="user" team/>
            <Button variant="outline" class="w-full" @click="toggleOpen">Подробнее</Button>
        </div>
        <div v-else class="teammate-card__actions">
            <slot name="request-actions"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Invitation } from '@/features/team/invitation';
import { UserBadge } from '@/entities/user';
import { UserDto } from '@/entities/user/model';

import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';

import { UserPreview } from '@/entities/user/ui/preview';
import { computed, ref, type PropType } from 'vue';
import type { BaseDto } from '@/shared/api/types';

import {
  FormControl,
  FormField,
  FormItem,
} from '@/shared/ui/form';
import IconAttention from '~icons/heroicons/exclamation-circle-20-solid';
import { TagsInputCombobox } from '@/shared/ui/tags-input-combobox';
import { useForm } from 'vee-validate';
import { formSchema } from '../model';
import { TeamModel } from '@/entities/team';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/tooltip';

import IconXmark from '~icons/heroicons/x-mark-20-solid';

const props = defineProps({
    user: {
        type: UserDto,
        required: true
    },
    team: {
        type: Boolean,
        default: false
    },
    specializations: {
        type: Array as PropType<BaseDto[]>,
        default: () => []
    },
    request: {
        type: Boolean,
        default: false
    },
    desired_specializations: {
        type: Array as PropType<BaseDto[]>,
        default: () => []
    },
})

const open = ref(false)
const openSpecializations = ref(false)

const toggleOpen = () => {
    open.value = !open.value
}

const toggleOpenSpecializations = () => {
    openSpecializations.value = !openSpecializations.value
}

const { handleSubmit } = useForm({
  validationSchema: computed(() => formSchema),
  initialValues: {
    specializations: props.user.specializations
  }
})

const closeSpecializationsCombobox = () => {
    openSpecializations.value = false;
}

const teamStore = TeamModel.useTeamStore();
const isCaptain = computed(() => teamStore.isCaptain)
const isLoading = computed(() => teamStore.isLoading)

const onSubmit = handleSubmit( async (updatedValues: any) => {
    await teamStore.updateTeammateSpecializations(props.user.id, updatedValues, closeSpecializationsCombobox)
})
</script>

<style scoped lang="scss">
@import './styles';
</style>