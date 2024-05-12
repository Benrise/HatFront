import { defineStore } from 'pinia'
import { computed, ref, type ComputedRef } from 'vue'
import { type IUser } from './types'
import { type IBase } from "@/shared/api/types";
import { http } from '../api/http'

import { useToast } from '@/shared/ui/toast/use-toast';

import { StatusCodes } from 'http-status-codes';

export const useUserStore = defineStore("user", () => {
    const { toast } = useToast();

    const user = ref<IUser>({})
    const isLoading = ref(false)
    const isAuthorized = ref(false)

    const setUser = (payload: IUser) => {
        user.value = payload;
    }

    const clearUser = () => {
        user.value = {};
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

    const updateUser = async (payload: IUser) => {
        try {
            isLoading.value = true;
            const mainResponse = await http.user.updateMain(payload);
            const educationResponse = await http.user.updateEducation(payload.education[0]);
            const skillsResponse = await http.user.updateSkills(payload.skills);
            const specializationResponse = await http.user.updateSpecializations(payload.specializations);

            if (
                mainResponse.status === StatusCodes.OK 
                && educationResponse.status === StatusCodes.OK 
                && skillsResponse.status === StatusCodes.OK 
                && specializationResponse.status === StatusCodes.OK
            ) {
                toast({
                    variant: 'success',
                    title: 'Успех',
                    description: `Данные успешно обновлены!`,
                });
            }
        }
        catch (e) {
            console.error('Error on updating user:', e);
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

    return { logout, isAuthorized, isLoading, fetchUser, getUser, updateAvatar, updateUser }
})

export const useEducationLevelsStore = defineStore("educationLevels", () => {
    const isLoading = ref(false)
    const educationLevels = ref<IBase[]>([])

    const fetchEducationLevels = async () => {
        try {
            isLoading.value = true;
            const { data, status } = await http.educationLevels.get();

            if (status === StatusCodes.OK) {
                educationLevels.value = data;
            }
        }
        catch (e) {
            console.error('Error on fetching education levels:', e);
        }
        finally {
            isLoading.value = false;
        }
    }

    const getEducationLevels = computed(() => educationLevels.value);

    return { fetchEducationLevels, getEducationLevels, isLoading }
})

export const useSkillsStore = defineStore("skills", () => {
    const isLoading = ref(false)
    const skills = ref<IBase[]>([])
    const cursor = ref(0)

    const fetchSkills = async () => {
        try {
            isLoading.value = true;
            const { data, status } = await http.skills.get();

            if (status === StatusCodes.OK) {
                skills.value = data.objects;
                cursor.value = data.cursor;
            }
        }

        catch (e) {
            console.error('Error on fetching skills:', e);
        }
        finally {
            isLoading.value = false;
        }
    }

    const getSkills = computed(() => skills.value);

    return { fetchSkills, getSkills, isLoading, cursor }
})

export const useSpecializationsStore = defineStore("specializations", () => {
    const isLoading = ref(false)
    const specializations = ref<IBase[]>([])
    const cursor = ref(0)

    const fetchSpecializations = async () => {
        try {
            isLoading.value = true;
            const { data, status } = await http.specializations.get();

            if (status === StatusCodes.OK) {
                specializations.value = data.objects;
                cursor.value = data.cursor;
            }
        }

        catch (e) {
            console.error('Error on fetching specializations:', e);
        }
        finally {
            isLoading.value = false;
        }
    }

    const getSpecializations = computed(() => specializations.value);

    return { fetchSpecializations, getSpecializations, isLoading, cursor }
})