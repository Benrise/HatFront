import { defineStore } from 'pinia'
import { useToast } from '@/shared/ui/toast/use-toast';
import { http } from '../api';
import { StatusCodes } from 'http-status-codes';
import { computed, ref } from 'vue';
import { TeamDto } from './types';

export const useTeamStore = defineStore("team", () => {
    const { toast } = useToast();

    const team = ref<TeamDto>({} as TeamDto)
    const teams = ref<TeamDto[]>([])
    const teams_cursor = ref()
    const isLoading = ref(false)

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
        team.value = data;
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

    const getTeams = computed<TeamDto[]>(() => teams.value);
    const getTeam = computed<TeamDto>(() => team.value);
    const getTeamsCursor = computed(() => teams_cursor.value);

    return { 
        isLoading, 
        fetchTeams, 
        getTeams, 
        getTeamsCursor, 
        fetchTeam, 
        getTeam }
})