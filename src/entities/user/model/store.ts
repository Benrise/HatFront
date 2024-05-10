import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { IUser } from './types'
import { http } from '../api/http'

import { StatusCodes } from 'http-status-codes';

export const useUserStore = defineStore("user", () => {
    const user = ref<IUser>()
    const isFetching = ref(false)
    const isAuthorized = ref(false)

    const setUser = (payload: IUser) => {
        user.value = payload;
    }

    const clearUser = () => {
        user.value = undefined;
        isAuthorized.value = false;
    }

    const fetchUser = async () => {
        isFetching.value = true;
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
            isFetching.value = false;
        }
    }

    const logout = () => {
        clearUser();
    }

    const getUser = computed(() => user.value);

    return { logout, isAuthorized, isFetching, fetchUser, getUser }
})