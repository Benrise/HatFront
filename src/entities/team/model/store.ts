import { defineStore } from 'pinia'
import { useToast } from '@/shared/ui/toast/use-toast';
import { http } from '../api';
import { StatusCodes } from 'http-status-codes';
import { computed, ref } from 'vue';
import { CreateTeamDto, TeamDto, TeamRequestDto } from './types';

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
    const isListLoading = ref(false)
    const isRequestsLoading = ref(false)
    const isCaptain = ref(false)
    const isMember = ref(false)
    const hasOwnTeams = ref(false)
    const incomingRequests = ref<TeamRequestDto[]>([] as TeamRequestDto[])
    const outcomingRequests = ref<TeamRequestDto[]>([] as TeamRequestDto[])
    const incomingRequestsCursor = ref()
    const outcomingRequestsCursor = ref()

    const fetchList = async () => {
        try {
            isListLoading.value = true;
            const { data, status} = await http.team.list({cursor: teamsCursor.value});
            if (status !== StatusCodes.OK) {
                toast({
                    variant: 'destructive',
                    title: 'Ошибка',
                    description: `Не удалось загрузить список команд`,
                });
                return
            }
            addTeams(data.objects);
            setCursor(data.cursor);
        }
        catch (e) {
            console.error('Error on fetching hackathons:', e);
        }
        finally {
            isListLoading.value = false;
        }
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
            await setTeam(data);
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
            isListLoading.value = true;
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
            isListLoading.value = false;
        }
    }

    const setHasTeams = (data: boolean) => {
        hasOwnTeams.value = data;
    }
    
    const setTeam = async (data: TeamDto) => {
        if (!data) return

        if (data.users?.length) {
            data.users.forEach( async (user) => {
                const userId = userStore.getUser?.id;
                if (userId === user.id) {
                    await setCaptain(user.is_capitan);
                    await setMember(true);
                }
            })
        }
        team.value = data;
    }

    const setCaptain = async (data: boolean) => {
        isCaptain.value = data;
    }

    const setMember = async (data: boolean) => {
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
            isRequestsLoading.value = true;
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
            isRequestsLoading.value = false;
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
                    description: `Команда расформирована`,
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

    const updateCaptain = async (user_id: number, callback?: () => void) => {
        try {
            isLoading.value = true;
            const { status } = await http.team.updateCaptain(team.value.id, user_id);
            if (status === StatusCodes.OK) {
                toast({
                    variant: 'warning',
                    title: 'Внимание',
                    description: `Вы покинули успешно покинули команду`,
                });
                if (callback) callback();
                await fetchTeam(team.value.id);
            }
        }
        catch (e) {
            console.error('Error on updating captain:', e);
            toast({
                variant: 'destructive',
                title: `Ошибка`,
                description: `Не удалось изменить капитана команды. Попробуйте позже.`,
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
            const skillsResponse = await http.team.updateSkills(id, payload.skills.map((skill) => skill.id));
            const specializationResponse = await http.team.updateSpecializations(id, payload.specializations || []);
            
            if (
                mainResponse.status === StatusCodes.OK &&
                skillsResponse.status === StatusCodes.OK &&
                specializationResponse.status === StatusCodes.OK
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

    const updateTeammateSpecializations = async (user_id: number, payload: any, callback?: () => void) => {
        try {
            isLoading.value = true;
            const { status } = await http.team.updateTeammateSpecializations(user_id, team.value.id, payload.specializations.map((specialization: any) => specialization.id));
            if (status === StatusCodes.OK) {
                toast({
                    variant: 'success',
                    title: 'Успех',
                    description: `Специализации обновлены`,
                });
                if (callback) callback();
            }
        }
        catch (e) {
            console.error('Error on updating user:', e);
            toast({
                variant: 'destructive',
                title: `Ошибка`,
                description: `Не удалось обновить специализации у пользователя. Попробуйте позже.`,
            });
        }
        finally {
            await fetchTeam(team.value.id);
            isLoading.value = false;
        }
    }

    const fetchIncomingRequests = async () => {
        try {
            isRequestsLoading.value = true;
            const { data, status} = await http.team.listRequests(team.value.id, {cursor: teamsCursor.value, is_to_team: true});
            if (status !== StatusCodes.OK) {
                toast({
                    variant: 'destructive',
                    title: 'Ошибка',
                    description: `Не удалось загрузить список исходящих заявок.`,
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
            const { data, status} = await http.team.listRequests(team.value.id, {cursor: teamsCursor.value, is_to_team: false});
            if (status !== StatusCodes.OK) {
                toast({
                    variant: 'destructive',
                    title: 'Ошибка',
                    description: `Не удалось загрузить список входящих заявок.`,
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

    const addIncomingRequests = (data: TeamRequestDto[]) => {
        if (!data || data.length === 0) return
        const existingIds = incomingRequests.value.map((request) => request.id);
        const newRequests = data.filter((request) => !existingIds.includes(request.id));
        incomingRequests.value.push(...newRequests);
    }

    const setOutcomingRequestsCursor = (cursor: number) => {
        outcomingRequestsCursor.value = cursor;
    }

    const addOutcomingRequests = (data: TeamRequestDto[]) => {
        if (!data || data.length === 0) return
        const existingIds = outcomingRequests.value.map((request) => request.id);
        const newRequests = data.filter((request) => !existingIds.includes(request.id));
        outcomingRequests.value.push(...newRequests);
    }

    const acceptRequest = async (request_id: number, type: 'outcoming' | 'incoming', callback?: () => void) => {
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
                    resetOutcomingRequests();
                    await fetchOutcomingRequests();
                  }
                  if (type === 'incoming') {
                    resetIncomingRequests();
                    await fetchIncomingRequests();
                  }
                  if (callback) callback();
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

    const rejectRequest = async (request_id: number, type: 'outcoming' | 'incoming', callback?: () => void) => {
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
                  if (callback) callback();
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

    const resetIncomingRequests = () => {
        incomingRequests.value = [];
    }

    const resetOutcomingRequests = () => {
        outcomingRequests.value = [];
    }

    const getList = computed<TeamDto[]>(() => teams.value);
    const getTeam = computed<TeamDto>(() => team.value);
    const getListCursor = computed(() => teamsCursor.value);
    const getListMe = computed<TeamDto[]>(() => myTeams.value);
    const getListMeCursor = computed(() => teamsCursor.value);
    const getIncomingRequests = computed<TeamRequestDto[]>(() => incomingRequests.value);
    const getOutcomingRequests = computed<TeamRequestDto[]>(() => outcomingRequests.value);

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
        updateTeam,
        updateTeammateSpecializations,
        acceptRequest,
        rejectRequest,
        fetchIncomingRequests,
        fetchOutcomingRequests,
        getIncomingRequests,
        getOutcomingRequests,
        isRequestsLoading,
        isListLoading,
        updateCaptain
    }
})