import { type Component } from 'vue'

export interface FilterConfig {
    name: string[],
    title: string,
    component: Component,
    class?: string,
    options?: Record<string, string | number>[],
    placeholders?: string[]
    type?: string;
}