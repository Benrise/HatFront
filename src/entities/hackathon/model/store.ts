import { defineStore } from 'pinia'
import { useToast } from '@/shared/ui/toast/use-toast';
import { http } from '../api';
import { StatusCodes } from 'http-status-codes';
import { computed, ref } from 'vue';
import { HackathonDto } from './types';
import type { CaseDto } from '@/entities/case/model';

export const useHackathonStore = defineStore("hackathon", () => {
    const { toast } = useToast();

    const hackathon = ref<HackathonDto>({} as HackathonDto)
    const hackathons = ref<HackathonDto[]>([])
    const hackathonsCursor = ref()
    const cases = ref<CaseDto[]>([])
    const isLoading = ref(false)
    const isListLoading= ref(false)

    const searchQuery = ref<string>('');

    const updateSearchQuery = async (query?: string) => {
        hackathons.value = [];
        hackathonsCursor.value = undefined;
        searchQuery.value = query || '';
        await fetchList();
    };

    const fetchList = async () => {
        try {
            isListLoading.value = true;
            const { data, status} = await http.hackathon.list({cursor: hackathonsCursor.value, start_with: searchQuery.value});
            if (status !== StatusCodes.OK) {
                toast({
                    variant: 'destructive',
                    title: 'Ошибка',
                    description: `Не удалось загрузить список хакатонов`,
                });
                return
            }
            addHackathons(data.objects);
            setCursor(data.cursor);
        }
        catch (e) {
            console.error('Error on fetching hackathons:', e);
        }
        finally {
            isListLoading.value = false;
        }
    }

    const resetList = async () => {
        hackathons.value = [];
        hackathonsCursor.value = undefined;
    }

    const fetchHackathon = async (id: number) => {
        try {
            isLoading.value = true;
            const { data, status} = await http.hackathon.get(id);
            if (status === StatusCodes.OK) {
                setHackathon(data);
                setCases(data.cases);
            }
            else {
                toast({
                    variant: 'destructive',
                    title: 'Ошибка',
                    description: `Не удалось загрузить хакатон`,
                });
            }
        }
        catch (e) {
            console.error('Error on fetching hackathons:', e);
        }
        finally {
            isLoading.value = false;
        }
    }
    
    const setHackathon = (data: HackathonDto) => {
        hackathon.value = data;
    }

    const addHackathons = (data: HackathonDto[]) => {
        if (!data || data.length === 0 && !searchQuery.value) return
        const existingIds = hackathons.value.map((hackathon) => hackathon.id);
        const newHackathons = data.filter((hackathon) => !existingIds.includes(hackathon.id));
        hackathons.value.push(...newHackathons);
    }

    const setCursor = (cursor: number) => {
        hackathonsCursor.value = cursor;
    }

    const setCases = (data: CaseDto[]) => {
        cases.value = data;
    }

    const getList = computed<HackathonDto[]>(() => hackathons.value);
    const getHackathon = computed<HackathonDto>(() => hackathon.value);
    const getListCursor = computed(() => hackathonsCursor.value);
    const getCases = computed(() => hackathon.value.cases);

    return { 
        isLoading, 
        fetchList, 
        getList, 
        getListCursor, 
        fetchHackathon, 
        getHackathon,
        resetList,
        getCases,
        isListLoading,
        updateSearchQuery,
        searchQuery
    }
})