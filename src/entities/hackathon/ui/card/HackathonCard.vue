<template>
    <div class="hackathon-card">
        <div class="hackathon-card__image image">
            <img src="/images/png/hackathon-cover.png" class="image__bg"  alt="Задний фон постера хакатона">
            <img src="/images/png/hackathon-cover.png" class="image__main" alt="Постер хакатона">
        </div>
        <div class="hackathon-card__main">
            <div class="hackathon-card__info">
                <div class="hackathon-card__text">
                    <div class="hackathon-card__title">
                        Phystech Radar Tech Challenge
                    </div>
                    <div class="hackathon-card__description">
                            Хочешь поступить в магистратуру и найти работу по специальности? С хакатоном Phystech Radar Tech Challenge – легко!
                    </div>
                </div>
                <div class="hackathon-card__tags">
                    <Badge>go</Badge>
                    <Badge>backend</Badge>
                    <Badge>ml</Badge>
                    <Badge>go</Badge>
                    <Badge>backend</Badge>
                    <Badge>ml</Badge>
                </div>
                <div class="hackathon-card__additionals">
                    <Badge variant="outline">
                        <IconCalendar class="mr-2"/>
                        27.04 - 30.04
                    </Badge>
                    <Badge variant="outline">
                        <IconRuble class="mr-2"/>
                        300 000 руб.
                    </Badge>
                    <Badge variant="outline">
                        <IconGroup class="mr-2"/>
                        1-5 чел.
                    </Badge>
                    <Badge variant="outline">
                        <IconClipboardCheck class="mr-2"/>
                        Регистрация открыта до 26.04.2024 15:59
                    </Badge>
                </div>
            </div>
            <div class="hackathon-card__actions">
                <Button class="w-full">Найти команду</Button>
                <Button class="w-full" variant="outline">Создать команду</Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';

import IconCalendar from '~icons/heroicons/calendar-days-20-solid';
import IconRuble from '~icons/solar/ruble-linear';
import IconGroup from '~icons/heroicons/user-group';
import IconClipboardCheck from '~icons/heroicons/clipboard-document-check';

</script>

<style scoped lang="scss">
@import './styles.scss';
</style>