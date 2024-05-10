<template>
    <AppLayout>
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
    </AppLayout>
    <Toaster />
</template>

<script setup lang="ts">
import AppLayout from "@/app/layouts/AppLayout.vue";
import Toaster from "@/shared/ui/toast/Toaster.vue";
import { provide } from "vue";
import { EAppProviders, AppPages } from "@/router/types";
import { AppRoutes } from "@/router/AppRoutes/AppRoutes";

provide(EAppProviders.AppRoutes, AppRoutes);
provide(EAppProviders.AppPages, AppPages);
</script>