<template>
    <AppLayout>
      <RouterView />
    </AppLayout>
    <Toaster />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { useAppStore } from "@/store/app";
import AppLayout from "@/app/layouts/AppLayout.vue";
import Toaster from "@/shared/ui/toast/Toaster.vue";
import { provide } from "vue";
import { EAppProviders, AppPages } from "@/router/router.types";
import { AppRoutes } from "@/router/AppRoutes/AppRoutes";

provide(EAppProviders.AppRoutes, AppRoutes);
provide(EAppProviders.AppPages, AppPages);

useAppStore();
</script>

<style>
@import "./styles/index.scss";
@import "./styles/animations.scss";
</style>