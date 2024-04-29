import type { RouteLocationNormalized } from "vue-router";
import { AppLayoutsEnum, AppLayoutComponentMap } from "@/app/layouts/layouts.types";

export async function layoutMiddleware(route: RouteLocationNormalized): Promise<void> {
  const { layout } = route.meta;
  const normalizedLayoutName = layout || AppLayoutsEnum.default;
  const fileName = AppLayoutComponentMap[normalizedLayoutName];
  const fileNameWithoutExtension = fileName.split(".vue")[0];

  const component = await import(`../../app/layouts/${fileNameWithoutExtension}.vue`);
  route.meta.layoutComponent = component.default;
}

