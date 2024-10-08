import { defineStore } from 'pinia'
import { useToast } from '@/shared/ui/toast/use-toast';
import { http } from '../api';
import { StatusCodes } from 'http-status-codes';
import { computed, ref } from 'vue';
import { HackathonDto } from './types';
import type { CaseDto } from '@/entities/case/model';
import type { SortProperty } from '@/shared/store';

export const useHackathonStore = defineStore("hackathon", () => {
    const { toast } = useToast();

    const hackathon = ref<HackathonDto>({} as HackathonDto)
    const hackathons = ref<HackathonDto[]>([])
    const hackathonsCursor = ref()
    const cases = ref<CaseDto[]>([])
    const isLoading = ref(false)
    const isListLoading= ref(false)

    const searchQuery = ref<string>('');

    const sort = ref<Record<string, boolean>>({
        'date_is_ascending': true
    })

    const selectedFilters = ref<Record<string, string | undefined>>({});
    const activeFilters = ref<Record<string, string | undefined>>({});

    const updateSort = async (newSort: SortProperty) => {
        sort.value = {
            [newSort.name]: newSort.value
        }
        await fetchList();
    }

    const updateSearchQuery = async (query?: string) => {
        hackathons.value = [];
        hackathonsCursor.value = undefined;
        searchQuery.value = query || '';
        await fetchList();
    };

    const fetchList = async () => {
        try {
            isListLoading.value = true;
            const { data, status} = await http.hackathon.list({
                cursor: hackathonsCursor.value,
                search: searchQuery.value,
                ...sort.value,
                ...activeFilters.value
            });
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

    const activateFilters = () => {
        Object.keys(selectedFilters.value).forEach((key) => {            
            const nameArray = key.split(',');
            const valueArray = selectedFilters.value[key]?.split(',');

            nameArray.forEach((name, index) => {
                activeFilters.value[name] = valueArray?.[index]
            })
        });

        fetchList();
    }

    const resetFilters = () => {
        Object.keys(activeFilters.value).forEach((key) => {
            activeFilters.value[key] = undefined
        });
        Object.keys(selectedFilters.value).forEach((key) => {
            selectedFilters.value[key] = undefined
        });
        fetchList();
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
        searchQuery,
        selectedFilters,
        activeFilters,
        activateFilters,
        resetFilters,
        updateSort,
        sort
    }
})