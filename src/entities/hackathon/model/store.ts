import { defineStore } from 'pinia'
import { useToast } from '@/shared/ui/toast/use-toast';
import { http } from '../api';
import { StatusCodes } from 'http-status-codes';
import { computed, ref } from 'vue';
import { HackathonDto } from './types';

export const useHackathonStore = defineStore("hackathon", () => {
    const { toast } = useToast();

    const hackathon = ref<HackathonDto>({} as HackathonDto)
    const hackathons = ref<HackathonDto[]>([])
    const hackathons_cursor = ref()
    const isLoading = ref(false)

    const fetchHackathons = async () => {
        const { data, status} = await http.hackathon.list({cursor: hackathons_cursor.value});
        if (status !== StatusCodes.OK) {
            toast({
                variant: 'destructive',
                title: 'Ошибка',
                description: `Не удалось загрузить список хакатонов`,
            });
            return
        }
        addHackathons(data.hackathons);
        setCursor(data.cursor);
    }

    const fetchHackathon = async (hackathon_id: number) => {
        const { data, status} = await http.hackathon.get(hackathon_id);
        if (status !== StatusCodes.OK) {
            toast({
                variant: 'destructive',
                title: 'Ошибка',
                description: `Не удалось загрузить хакатон`,
            });
            return
        }
        setHackathon(data);
    }
    
    const setHackathon = (data: HackathonDto) => {
        hackathon.value = data;
    }

    const addHackathons = (data: HackathonDto[]) => {
        hackathons.value.push(...data);
    }

    const setCursor = (cursor: number) => {
        hackathons_cursor.value = cursor;
    }

    const getHackathons = computed<HackathonDto[]>(() => hackathons.value);
    const getHackathon = computed<HackathonDto>(() => hackathon.value);
    const getHackathonsCursor = computed(() => hackathons_cursor.value);

    return { 
        isLoading, 
        fetchHackathons, 
        getHackathons, 
        getHackathonsCursor, 
        fetchHackathon, 
        getHackathon }
})