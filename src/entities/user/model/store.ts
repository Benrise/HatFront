import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { EProvider, UserRequestDto, type EducationDto, type UserDto } from './types'
import { type BaseDto } from "@/shared/api/types";
import { http } from '../api/http'

import { useToast } from '@/shared/ui/toast/use-toast';

import { StatusCodes } from 'http-status-codes';

export const useUserStore = defineStore("user", () => {
    const { toast } = useToast();

    const user = ref<UserDto>({} as UserDto)
    const users = ref<UserDto[]>([] as UserDto[])
    const usersCursor = ref()
    const incomingRequests = ref<UserRequestDto[]>([] as UserRequestDto[])
    const outcomingRequests = ref<UserRequestDto[]>([] as UserRequestDto[])
    const incomingRequestsCursor = ref()
    const outcomingRequestsCursor = ref()
    const isLoading = ref(false)
    const isListLoading = ref(false)
    const isRequestsLoading = ref(false)
    const isAuthorized = ref(false)

    const resetList = async () => {
        users.value = [];
        usersCursor.value = 0;
    }

    const deleteEducation = async (id: number, callback: () => void) => {
        try {
            isLoading.value = true;
            const { status } = await http.user.deleteEduction(id);
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
                if (education.id && education.education_level) {
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
            fetchUser();
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

    const fetchList = async () => {
        try {
            isListLoading.value = true;
            const { data, status} = await http.user.list({cursor: usersCursor.value});
            if (status !== StatusCodes.OK) {
                return
            }
            addUsers(data.objects);
            setCursor(data.cursor);
        }
        catch (e) {
            console.error('Error on fetching users:', e);
            toast({
                variant: 'destructive',
                title: 'Ошибка',
                description: `Не удалось загрузить список пользователей.`,
            });
        }
        finally {
            isListLoading.value = false;
        }
    }

    const addUsers = (data: UserDto[]) => {
        if (!data || data.length === 0) return
        const currentUser = user.value;
        const existingIds = users.value.map((user) => user.id);
        const newUsers = data.filter((user) => !existingIds.includes(user.id) && user.id !== currentUser.id);
        users.value.push(...newUsers);
    }

    const invite = async (user_id: number, payload: any, callback?: () => void) => {
        try {
            isLoading.value = true;
            const { status } = await http.user.createRequest(user_id, payload);
            if (status === StatusCodes.CREATED) {
                toast({
                    variant: 'success',
                    title: 'Успех',
                    description: `Приглашение отправлено`,
                  });
                  if (callback) callback();
            }
        }
        catch (e) {
            console.error('Error on creating request:', e);
            toast({
                variant: 'destructive',
                title: `Ошибка`,
                description: `Ошибка при отправке приглашения. Попробуйте позже.`,
            });
        }
        finally {
            isLoading.value = false;
        }
    }

    const fetchIncomingRequests = async () => {
        try {
            isRequestsLoading.value = true;
            const { data, status} = await http.user.listRequests({cursor: usersCursor.value, is_to_team: true});
            if (status !== StatusCodes.OK) {
                toast({
                    variant: 'destructive',
                    title: 'Ошибка',
                    description: `Не удалось загрузить список заявок.`,
                });
                return
            }
            addIncomingRequests(data.objects);
            setIncomingRequestsCursor(data.cursor);
        }
        catch (e) {
            console.error('Error on fetching requests:', e);
        }
        finally {
            isRequestsLoading.value = false;
        }
    }

    const fetchOutcomingRequests = async () => {
        try {
            isRequestsLoading.value = true;
            const { data, status} = await http.user.listRequests({cursor: usersCursor.value, is_to_team: false});
            if (status !== StatusCodes.OK) {
                toast({
                    variant: 'destructive',
                    title: 'Ошибка',
                    description: `Не удалось загрузить список заявок.`,
                });
                return
            }
            addOutcomingRequests(data.objects);
            setOutcomingRequestsCursor(data.cursor);
        }
        catch (e) {
            console.error('Error on fetching requests:', e);
        }
        finally {
            isRequestsLoading.value = false;
        }
    }

    const setIncomingRequestsCursor = (cursor: number) => {
        incomingRequestsCursor.value = cursor;
    }

    const addIncomingRequests = (data: UserRequestDto[]) => {
        if (!data || data.length === 0) return
        const existingIds = incomingRequests.value.map((request) => request.id);
        const newRequests = data.filter((request) => !existingIds.includes(request.id));
        incomingRequests.value.push(...newRequests);
    }

    const setOutcomingRequestsCursor = (cursor: number) => {
        outcomingRequestsCursor.value = cursor;
    }

    const addOutcomingRequests = (data: UserRequestDto[]) => {
        if (!data || data.length === 0) return
        const existingIds = outcomingRequests.value.map((request) => request.id);
        const newRequests = data.filter((request) => !existingIds.includes(request.id));
        outcomingRequests.value.push(...newRequests);
    }

    const acceptRequest = async (request_id: number, type: 'outcoming' | 'incoming') => {
        try {
            isRequestsLoading.value = true;
            const { status } = await http.request.put(request_id);
            if (status === StatusCodes.OK) {
                toast({
                    variant: 'success',
                    title: 'Успех',
                    description: `Заявка принята`,
                  });
                  if (type === 'outcoming') {
                    await resetOutcomingRequests();
                    await fetchOutcomingRequests();
                  }
                  if (type === 'incoming') {
                    await resetIncomingRequests();
                    await fetchIncomingRequests();
                  }
            }
        }
        catch (e) {
            console.error('Error on deleting avatar:', e);
            toast({
                variant: 'destructive',
                title: `Ошибка`,
                description: `Не удалось принять заявку. Попробуйте позже.`,
            });
        }
        finally {
            isRequestsLoading.value = false;
        }
    }

    const rejectRequest = async (request_id: number, type: 'outcoming' | 'incoming') => {
        try {
            isRequestsLoading.value = true;
            const { status } = await http.request.delete(request_id);
            if (status === StatusCodes.OK) {
                toast({
                    variant: 'warning',
                    title: 'Внимание',
                    description: type === 'outcoming' ? `Заявка отменена` : `Заявка отклонена`,
                  });
                  if (type === 'outcoming') {
                    resetOutcomingRequests();
                    await fetchOutcomingRequests();
                  }
                  if (type === 'incoming') {
                    resetIncomingRequests();
                    await fetchIncomingRequests();
                  }
            }
        }
        catch (e) {
            console.error('Error on deleting avatar:', e);
            toast({
                variant: 'destructive',
                title: `Ошибка`,
                description: `Не удалось отклонить заявку. Попробуйте позже.`,
            });
        }
        finally {
            isRequestsLoading.value = false;
        }
    }

    const resetIncomingRequests = async () => {
        incomingRequests.value = [];
    }

    const resetOutcomingRequests = async () => {
        outcomingRequests.value = [];
    }

    const setCursor = (cursor: number) => {
        usersCursor.value = cursor;
    }

    const logout = () => {
        clearUser();
    }

    const getUser = computed<UserDto>(() => user.value);
    const getUsers = computed<UserDto[]>(() => users.value);
    const getProvider = computed<Record<string, string> | undefined>(() => {
        const providerName = user.value.providers?.[0]?.name;
        if (providerName) {
            const imgUrl = EProvider[providerName as keyof typeof EProvider];
            return { name: providerName, imgUrl };
        }
        return undefined;
    });
    const getEducation = computed<EducationDto[] | undefined >(() => user.value.education);
    const getIncomingRequests = computed<UserRequestDto[]>(() => incomingRequests.value);
    const getOutcomingRequests = computed<UserRequestDto[]>(() => outcomingRequests.value);

    return { 
        logout, 
        isAuthorized, 
        isLoading,
        isRequestsLoading,
        fetchUser, 
        getUser, 
        updateAvatar, 
        updateUser, 
        getProvider, 
        getEducation,
        deleteEducation,
        setUser,
        deleteAvatar,
        user,
        fetchList,
        getUsers,
        invite,
        getIncomingRequests,
        getOutcomingRequests,
        fetchIncomingRequests,
        fetchOutcomingRequests,
        acceptRequest,
        rejectRequest,
        resetIncomingRequests,
        resetOutcomingRequests,
        resetList,
        isListLoading
    }
})

export const useEducationLevelsStore = defineStore("educationLevels", () => {
    const isLoading = ref(false)
    const educationLevels = ref<BaseDto[]>([])

    const fetchList = async () => {
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

    return { fetchList, getEducationLevels, isLoading }
})

export const useSkillsStore = defineStore("skills", () => {
    const isLoading = ref(false)
    const skills = ref<BaseDto[]>([])

    const fetchList = async () => {
        try {
            isLoading.value = true;
            const { data, status } = await http.skills.get();

            if (status === StatusCodes.OK) {
                skills.value = data;
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

    return { fetchList, getSkills, isLoading }
})

export const useSpecializationsStore = defineStore("specializations", () => {
    const isLoading = ref(false)
    const specializations = ref<BaseDto[]>([])

    const fetchList = async () => {
        try {
            isLoading.value = true;
            const { data, status } = await http.specializations.get();

            if (status === StatusCodes.OK) {
                specializations.value = data;
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

    return { fetchList, getSpecializations, isLoading }
})