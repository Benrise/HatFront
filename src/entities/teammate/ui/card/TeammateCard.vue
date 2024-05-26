<template>
    <div class="teammate-card" :class="team ? '!min-w-[242px] !max-w-[242px]' : ''">
        <div class="teammate-card__main">
            <div class="teammate-card__info">
                <UserBadge :team="team" :user="user" @click="toggleOpen">
                    <template #subtext>
                        <span class="text-sm text-muted-foreground">{{ user.is_capitan ? 'Капитан' : '' }}</span>
                    </template>
                </UserBadge>
                <div v-if="!team" class="teammate-card__description">
                    {{ user.about }}
                </div>
            </div>
            <div v-if="!team" class="teammate-card__skills">
                <Badge v-for="(skill, index) in user?.skills" :key="index" class="team-card__tag">
                    {{ skill.name }}
                </Badge>
                <Badge variant="secondary" v-if="!user?.skills?.length">Технологии не назначены</Badge>
            </div>
            <form class="teammate-card__roles" @submit="onSubmit">
                    <template v-if="!openSpecializations">
                        <Badge v-for="specialization in user.specializations" :key="specialization.id" class="teammate-card__role">
                            <div class="!max-w-[192px] !overflow-hidden text-ellipsis"> {{ specialization.name }}</div>
                        </Badge>
                        <Badge v-if="user?.specializations?.length === 0" class="teammate-card__role">
                            Специализации не указаны
                            <TooltipProvider v-if="!specializations.length && team" >
                                <Tooltip>
                                  <TooltipTrigger>
                                    <IconAttention class="text-orange-500 ml-2" />
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom">
                                    <p>У команды отсутствуют специализации</p>
                                  </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Badge>
                    </template>
                    <FormField v-if="openSpecializations && team"  class="teammate-card__role" name="specialization_ids" v-slot="{ componentField, values }">
                        <FormItem>
                            <FormControl>
                                <TagsInputCombobox 
                                    v-model="componentField.modelValue"
                                    @update:modelValue="componentField['onUpdate:modelValue']" 
                                    :objects="specializations"/>
                            </FormControl>
                        </FormItem>
                    </FormField>
                      <transition v-if="team" name="fade" mode="out-in">
                        <Button :disabled="!specializations.length" type="button" variant="secondary" v-if="!openSpecializations" class="w-full" @click="toggleOpenSpecializations">
                            Назначить
                        </Button>
                        <Button type="submit" v-else class="w-full" :loading="isLoading" >
                            Сохранить
                        </Button>
                    </transition>
            </form>
        </div>
        <div class="teammate-card__actions">
            <Invitation v-if="!team" :user="user">
                <Button class="w-full">Пригласить</Button>
            </Invitation>
            <UserPreview v-model:open="open" :user="user" team/>
            <Button variant="outline" class="w-full" @click="toggleOpen">Подробнее</Button>
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
} from '@/shared/ui/tooltip'

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
    }
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
    user_id: props.user.id,
    specialization_ids: []
  }
})

const closeSpecializationsCombobox = () => {
    openSpecializations.value = false
}

const teamStore = TeamModel.useTeamStore();
const isLoading = computed(() => teamStore.isLoading)

const onSubmit = handleSubmit( async (updatedValues: any) => {
    await teamStore.updateTeammateSpecializations(updatedValues, closeSpecializationsCombobox)
})
</script>

<style scoped lang="scss">
@import './styles';
</style>