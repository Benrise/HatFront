import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { EProvider, type EducationDto, type UserDto } from './types'
import { type BaseDto } from "@/shared/api/types";
import { http } from '../api/http'

import { useToast } from '@/shared/ui/toast/use-toast';

import { StatusCodes } from 'http-status-codes';

export const useUserStore = defineStore("user", () => {
    const { toast } = useToast();

    const user = ref<UserDto>({} as UserDto)
    const isLoading = ref(false)
    const isAuthorized = ref(false)

    const deleteEducation = async (education_id: number, callback: () => void) => {
        try {
            isLoading.value = true;
            const { status } = await http.user.deleteEduction(education_id);
            if (status === StatusCodes.OK) {
                callback();
                toast({
                    variant: 'warning',
                    title: 'Внимание',
                    description: `Образование успешно удалено`,
                });
            }
        }
        catch (e) {
            console.error('Error on deleting education:', e);
        }
        finally {
            fetchUser();
            isLoading.value = false;
        }
    }

    const setUser = (payload: UserDto) => {
        user.value = payload;
    }

    const clearUser = () => {
        user.value = {} as UserDto;
        isAuthorized.value = false;
    }

    const sendEducations = async (educations: EducationDto[] | undefined): Promise<StatusCodes> => {    
        if (!educations) return StatusCodes.OK;

        try {
            for (const education of educations) {
                if (education.education_id && education.education_level) {
                    education.education_level_id = education.education_level.id;
                    delete education.education_level;
                    await http.user.updateEducation(education);
                } 
                else if (education.education_level) {
                    education.education_level_id = education.education_level.id;
                    delete education.education_level;
                    await http.user.createEducation(education);
                }
            }
        } catch (e: any) {
            console.error('Error on sending educations:', e);
            return e.code;
        }
        return StatusCodes.OK;
    }

    const updateAvatar = async (file: File) => {
        try {
            isLoading.value = true;
            const { status } = await http.user.uploadPhoto(file);

            if (status === StatusCodes.OK) {
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

    const deleteAvatar = async () => {
        try {
            isLoading.value = true;
            const { status } = await http.user.uploadPhoto(null);
            if (status === StatusCodes.OK) {
                toast({
                    variant: 'warning',
                    title: 'Внимание',
                    description: `Аватар успешно удален`,
                  });
            }
        }
        catch (e) {
            console.error('Error on deleting avatar:', e);
        }
        finally {
            isLoading.value = false;
            fetchUser();
        }
    }

    const updateUser = async (payload: UserDto) => {
        try {
            isLoading.value = true;
            const mainResponse = await http.user.updateMain(payload);
            const skillsResponse = await http.user.updateSkills(payload.skills.map((skill) => skill.id));
            const specializationResponse = await http.user.updateSpecializations(payload.specializations.map((skill) => skill.id));
            const educationResponse = await sendEducations(payload.education);
            
            if (
                mainResponse.status === StatusCodes.OK 
                && educationResponse === StatusCodes.OK
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
        }    
    }

    const fetchUser = async () => {
        try {
            isLoading.value = true;
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

    const getUser = computed<UserDto>(() => user.value);
    const getProvider = computed<Record<string, string> | undefined>(() => {
        const providerName = user.value.providers?.[0]?.name;
        if (providerName) {
            const imgUrl = EProvider[providerName as keyof typeof EProvider];
            return { name: providerName, imgUrl };
        }
        return undefined;
    });
    const getEducation = computed<EducationDto[] | undefined >(() => user.value.education);

    return { 
        logout, 
        isAuthorized, 
        isLoading, 
        fetchUser, 
        getUser, 
        updateAvatar, 
        updateUser, 
        getProvider, 
        getEducation,
        deleteEducation,
        setUser,
        deleteAvatar
    }
})

export const useEducationLevelsStore = defineStore("educationLevels", () => {
    const isLoading = ref(false)
    const educationLevels = ref<BaseDto[]>([])

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
    const skills = ref<BaseDto[]>([])
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
    const specializations = ref<BaseDto[]>([])
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