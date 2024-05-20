import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { STATIC_URL } from '@/app/config'
import { computed } from 'vue';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isObjectsDeepEqual<T>(obj1: T, obj2: T): boolean{
  return JSON.stringify(obj1)===JSON.stringify(obj2);
}

export const isEmptyObject = (obj: any) => {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
};