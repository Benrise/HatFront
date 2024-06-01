
<template>
    <Dialog class="dialog">
        <DialogTrigger as-child>
            <slot/>
        </DialogTrigger>
        <DialogContent class="sm:max-w-fit">
            <DialogHeader class="flex flex-col gap-2">
                <DialogTitle class="text-left">{{item.name}}</DialogTitle>
                <DialogDescription class="text-left">{{ item.owner }}</DialogDescription>
            </DialogHeader>
            <div class="dialog__content case-preview">
                <div class="case-preview">
                    <div class="case-preview__group">
                        <div class="case-preview__item !flex-col font-medium">
                            Описание
                            <div class="case-preview__description">
                                {{ item.task }}
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div class="case-preview__group">
                            <div class="case-preview__item !flex-col font-medium">
                                Входные данные
                                <div class="case-preview__description">
                                    {{ item.resources }}
                                </div>
                            </div>
                        </div>
                        <div class="case-preview__group">
                            <div class="case-preview__item !flex-col">
                                Предполагаемый результат
                                <div class="case-preview__description">
                                    {{ item.result }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter class="flex gap-2">
                    <Creating :caseId="item.id" :hackathonId="hackathonId" :callback="openCreatedTeam">
                        <Button type="button" class="w-full">
                            Зарегистрироваться на кейс
                        </Button>
                    </Creating>
                    <a v-if="item.url_website" class=w-full :href="item.url_website">
                        <Button variant="outline" type="button" class="w-full">
                            На страницу кейса
                        </Button>
                    </a>
                </DialogFooter>
            </div>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/ui/dialog'

import { type PropType } from 'vue';
import type { CaseDto } from "@/entities/case/model";

import { Creating } from '@/features/team/create';

import { router, useAppRoutes } from '@/router';

defineProps({
    item: {
        type: Object as PropType<CaseDto>,
        required: true
    },
    hackathonId: {
        type: Number,
        required: true
    }
})

const appRoutes = useAppRoutes()

const openCreatedTeam = async (team_id: number) => {
    router.push(appRoutes?.getTeam(team_id) || '#')
}
</script>

<style scoped lang="scss">
@import './styles';
</style>