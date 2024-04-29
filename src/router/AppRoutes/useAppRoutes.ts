import { inject } from 'vue'
import { EAppProviders } from '@/router/router.types'

export function useAppRoutes() {
  const appRoutes = inject(EAppProviders.AppRoutes)

  if (!appRoutes) {
    console.error('AppRoutes')
  }

  return appRoutes
}