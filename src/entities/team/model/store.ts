import { defineStore } from 'pinia'
import { useToast } from '@/shared/ui/toast/use-toast';
import { http } from '../api';
import { StatusCodes } from 'http-status-codes';
import { computed, ref } from 'vue';
import { CreateTeamDto, TeamDto } from './types';

import { UserModel } from '@/entities/user';

export const useTeamStore = defineStore("team", () => {
    const { toast } = useToast();

    const userStore = UserModel.useUserStore();

    const team = ref<TeamDto>({} as TeamDto)
    const teams = ref<TeamDto[]>([])
    const myTeams = ref<TeamDto[]>([])
    const myTeamsCursor = ref()
    const teamsCursor = ref()
    const isLoading = ref(false)
    const isCaptain = ref(false)
    const isMember = ref(false)
    const hasOwnTeams = ref(false)

    const fetchList = async () => {
        const { data, status} = await http.team.list({cursor: teamsCursor.value});
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
        try {
            isLoading.value = true;
            const { data, status} = await http.team.get(id);
            if (status !== StatusCodes.OK) {
                toast({
                    variant: 'destructive',
                    title: 'Ошибка',
                    description: `Не удалось загрузить данные команды`,
                });
                return
            }
            setTeam(data);
        }
        catch (e) {
            console.error('Error on fetching team:', e);
        }
        finally {
            isLoading.value = false;
        }
    }

    const fetchListMe = async () => {
        try {
            isLoading.value = true;
            const { data, status} = await http.team.listMe();
            if (status !== StatusCodes.OK) {
                toast({
                    variant: 'destructive',
                    title: 'Ошибка',
                    description: `Не удалось загрузить список команд`,
                });
                return
            }
            setHasTeams(data.objects.length > 0);
            addTeamsMe(data.objects);
            setCursorMe(data.cursor);
        }
        catch (e) {
            console.error('Error on fetching teams:', e);
        }
        finally {
            isLoading.value = false;
        }
    }

    const setHasTeams = (data: boolean) => {
        hasOwnTeams.value = data;
    }
    
    const setTeam = (data: TeamDto) => {
        if (!data) return

        if (data.users?.length) {
            data.users.forEach((user) => {
                const userId = userStore.getUser?.id;
                if (userId === user.id) {
                    setCaptain(user.is_capitan);
                    setMember(true);
                }
            })
        }
        team.value = data;
    }

    const setCaptain = (data: boolean) => {
        isCaptain.value = data;
    }

    const setMember = (data: boolean) => {
        isMember.value = data;
    }

    const addTeams = (data: TeamDto[]) => {
        if (!data || data.length === 0) return
        const existingIds = teams.value.map((team) => team.id);
        const newTeams = data.filter((team) => !existingIds.includes(team.id));
        teams.value.push(...newTeams);
    }

    const addTeamsMe = (data: TeamDto[]) => {
        if (!data || data.length === 0) return
        const existingIds = myTeams.value.map((team) => team.id);
        const newTeams = data.filter((team) => !existingIds.includes(team.id));
        myTeams.value.push(...newTeams);
    }

    const setCursor = (cursor: number) => {
        teamsCursor.value = cursor;
    }

    const setCursorMe = (cursor: number) => {
        myTeamsCursor.value = cursor;
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

    const resetList = async () => {
        teams.value = [];
        teamsCursor.value = undefined;
    }

    const resetListMe = async () => {
        myTeams.value = [];
        myTeamsCursor.value = undefined;
    }

    const resetItem = async () => {
        team.value = {} as TeamDto;
        isCaptain.value = false;
        isMember.value = false;
    }

    const createTeam = async (payload: CreateTeamDto, callback?: (payload: any) => void) => {
        try {
            isLoading.value = true;
            const { data, status } = await http.team.post(payload);
            if (status === StatusCodes.CREATED) {
                toast({
                    variant: 'success',
                    title: 'Успех',
                    description: `Команда успешно создана`,
                });
                if (callback) callback(data.id);
                await fetchListMe();
            }
        }
        catch (e) {
            console.error('Error on deleting avatar:', e);
            toast({
                variant: 'destructive',
                title: `Ошибка`,
                description: `Не удалось создать команду. Попробуйте позже.`,
            });
        }
        finally {
            isLoading.value = false;
        }
    }

    const join = async (team_id: number, payload: any, callback?: () => void) => {
        try {
            isLoading.value = true;
            const { status } = await http.team.createRequest(team_id, payload);
            if (status === StatusCodes.CREATED) {
                toast({
                    variant: 'success',
                    title: 'Успех',
                    description: `Заявка на вступление в команду отправлена`,
                  });
                  if (callback) callback();
            }
        }
        catch (e) {
            console.error('Error on creating request:', e);
            toast({
                variant: 'destructive',
                title: `Ошибка`,
                description: `Ошибка при отправке заявки. Попробуйте позже.`,
            });
        }
        finally {
            isLoading.value = false;
        }
    }

    const deleteTeam = async (team_id: number, callback?: () => void) => {
        try {
            isLoading.value = true;
            const { status } = await http.team.delete(team_id);
            if (status === StatusCodes.OK) {
                toast({
                    variant: 'warning',
                    title: 'Внимание',
                    description: `Команда удалена`,
                });
                await resetList()
                if (callback) callback();
                await fetchList();
            }
        }
        catch (e) {
            console.error('Error on deleting team:', e);
            toast({
                variant: 'destructive',
                title: `Ошибка`,
                description: `Не удалось удалить команду. Попробуйте позже.`,
            });
        }
        finally {
            isLoading.value = false;
        }
    }

    const leaveTeam = async (team_id: number, callback?: () => void) => {
        try {
            isLoading.value = true;
            const { status } = await http.team.leave(team_id);
            if (status === StatusCodes.OK) {
                toast({
                    variant: 'warning',
                    title: 'Внимание',
                    description: `Вы покинули команду`,
                });
                await resetItem()
                if (callback) callback();
                await fetchTeam(team_id);
            }
        }
        catch (e) {
            console.error('Error on leaving team:', e);
            toast({
                variant: 'destructive',
                title: `Ошибка`,
                description: `Не удалось покинуть команду. Попробуйте позже.`,
            });
        }
        finally {
            isLoading.value = false;
        }
    }

    const updateTeam = async (id:number, payload: TeamDto) => {
        try {
            isLoading.value = true;
            const mainResponse = await http.team.updateMain(id, payload);
            
            if (
                mainResponse.status === StatusCodes.OK
            ) {
                toast({
                    variant: 'success',
                    title: 'Успех',
                    description: `Данные команды успешно обновлены!`,
                });
            }
        }
        catch (e) {
            console.error('Error on updating user:', e);
        }
        finally {
            
            await fetchTeam(team.value.id);
            isLoading.value = false;
        }    
    }

    const getList = computed<TeamDto[]>(() => teams.value);
    const getTeam = computed<TeamDto>(() => team.value);
    const getListCursor = computed(() => teamsCursor.value);
    const getListMe = computed<TeamDto[]>(() => myTeams.value);
    const getListMeCursor = computed(() => teamsCursor.value);

    return { 
        isLoading, 
        fetchList, 
        getList, 
        getListCursor, 
        fetchTeam, 
        getTeam,
        updateAvatar,
        deleteAvatar,
        isCaptain,
        isMember,
        fetchListMe,
        resetListMe,
        getListMe,
        getListMeCursor,
        createTeam,
        resetList,
        hasOwnTeams,
        join,
        deleteTeam,
        leaveTeam,
        resetItem,
        updateTeam
    }
})