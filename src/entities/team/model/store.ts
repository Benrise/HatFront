import { defineStore } from 'pinia'
import { useToast } from '@/shared/ui/toast/use-toast';
import { http } from '../api';
import { StatusCodes } from 'http-status-codes';
import { computed, ref } from 'vue';
import { TeamDto } from './types';

import { UserModel } from '@/entities/user';

export const useTeamStore = defineStore("team", () => {
    const { toast } = useToast();

    const userStore = UserModel.useUserStore();

    const team = ref<TeamDto>({} as TeamDto)
    const teams = ref<TeamDto[]>([])
    const teams_cursor = ref()
    const isLoading = ref(false)
    const isCaptain = ref(false)

    const fetchTeams = async () => {
        const { data, status} = await http.team.list({cursor: teams_cursor.value});
        if (status !== StatusCodes.OK) {
            toast({
                variant: 'destructive',
                title: 'Ошибка',
                description: `Не удалось загрузить список хакатонов`,
            });
            return
        }
        addTeams(data.objects);
        setCursor(data.cursor);
    }

    const fetchTeam = async (id: number) => {
        const { data, status} = await http.team.get(id);
        if (status !== StatusCodes.OK) {
            toast({
                variant: 'destructive',
                title: 'Ошибка',
                description: `Не удалось загрузить хакатон`,
            });
            return
        }
        setTeam(data);
    }
    
    const setTeam = (data: TeamDto) => {
        if (!data) return

        if (data.users?.length) {
            data.users.forEach((user) => {
                const userId = userStore.getUser?.id;
                setCaptain((userId === user.id) && user.is_capitan);
            })
        }
        team.value = data;
    }

    const setCaptain = (data: boolean) => {
        isCaptain.value = data;
    }

    const addTeams = (data: TeamDto[]) => {
        if (!data || data.length === 0) return
        const existingIds = teams.value.map((team) => team.id);
        const newTeams = data.filter((team) => !existingIds.includes(team.id));
        teams.value.push(...newTeams);
    }

    const setCursor = (cursor: number) => {
        teams_cursor.value = cursor;
    }

    const updateAvatar = async (file: File) => {
        try {
            isLoading.value = true;
            const { status } = await http.team.uploadPhoto(team.value.id, file);

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
            fetchTeam(team.value.id);
        }
    }

    const deleteAvatar = async () => {
        try {
            isLoading.value = true;
            const { status } = await http.team.uploadPhoto(team.value.id, null);
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
            fetchTeam(team.value.id);
        }
    }

    const getTeams = computed<TeamDto[]>(() => teams.value);
    const getTeam = computed<TeamDto>(() => team.value);
    const getTeamsCursor = computed(() => teams_cursor.value);
    const getCaptain = computed(() => isCaptain.value);

    return { 
        isLoading, 
        fetchTeams, 
        getTeams, 
        getTeamsCursor, 
        fetchTeam, 
        getTeam,
        updateAvatar,
        deleteAvatar,
        isCaptain,
        getCaptain
    }
})