import { defineStore } from 'pinia'
import { useResizeObserver } from '@vueuse/core'
import { StoreNamespacesEnum } from '@/store/store.types'


export const useAppStore = defineStore(StoreNamespacesEnum.APP, () => {
    useResizeObserver(document.body, (entries) => {
        const entry = entries[0]
        const { width, height } = entry.contentRect
        console.log('Device dimensions:', width, height)
    })
})