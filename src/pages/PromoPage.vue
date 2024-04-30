<template>
    <div class="promo">
        <div class="promo__container">
            <div class="promo__greeting greeting">
                <div class="greeting__info">
                    <div class="greeting__header">
                            <h1>Найди команду <br> для участия в хакатонах</h1>
                            <h2>Объединяйтесь и побеждайте с помощью сервиса по поиску и подбору команд</h2>
                    </div>
                    <router-link to="/login">
                        <Button class="max-w-fit">Начать</Button> 
                    </router-link>
                </div>
                <div class="greeting__logo">
                    <img src="/images/svg/logo/logo-abb.svg" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '@/shared/ui/button'

</script>

<style scoped lang="scss">
@import '@/app/styles/variables.scss';
@import '@/app/styles/mixins.scss';

.promo {
    &__container {
        display: flex;
        flex-direction: column;
        gap: 192px;
    }
}

.greeting {
    &__info {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }

    &__header {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    &__logo {
        display: flex;
        justify-content: flex-end;
    }

    &__header {
        h1 {
            @include title();
        }

        h2 {
            @include body();
        }
    }
}

</style>