import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { IUser } from './types'
import { http } from '../api/http'

import { useToast } from '@/shared/ui/toast/use-toast';

import { StatusCodes } from 'http-status-codes';

export const useUserStore = defineStore("user", () => {
    const { toast } = useToast();

    const user = ref<IUser>()
    const isLoading = ref(false)
    const isAuthorized = ref(false)

    const setUser = (payload: IUser) => {
        user.value = payload;
    }

    const clearUser = () => {
        user.value = undefined;
        isAuthorized.value = false;
    }

    const updateAvatar = async (file: File) => {
        try {
            isLoading.value = true;
            const response = await http.user.uploadPhoto(file);

            if (response.status === StatusCodes.OK) {
                toast({
                    variant: 'default',
                    title: 'Успех',
                    description: `Файл ${file.name} успешно загружен`,
                    class: 'bg-green-200 text-green-900',
                  });
            }
            
        }
        catch (e) {
            console.error('Error sending file:', e);
            toast({
                variant: 'destructive',
                title: `Ошибка при загрузке файла`,
                description: `Файл ${file.name} не загружен. Попробуйте позже.`,
            });
        }
        finally {
            isLoading.value = false;
            fetchUser();
        }
    }

    const fetchUser = async () => {
        isLoading.value = true;
        try {
            const { data, status } = await http.user.me();

            if (status === StatusCodes.OK) {
                setUser(data);
                isAuthorized.value = true;
            }
        }
        catch (e) {
            logout();
        }
        finally {
            isLoading.value = false;
        }
    }

    const logout = () => {
        clearUser();
    }

    const getUser = computed(() => user.value);

    return { logout, isAuthorized, isLoading, fetchUser, getUser, updateAvatar }
})