import { inject } from 'vue'
import { EAppProviders } from '@/router/router.types'

function useAppPages() {
  const appPages = inject(EAppProviders.AppPages)

  if (!appPages) {
    console.error('Incorrect AppPages setup')
  }

  return appPages
}

export default useAppPages