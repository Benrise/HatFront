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
        addHackathons(data.objects);
        setCursor(data.cursor);
    }

    const fetchHackathon = async (id: number) => {
        const { data, status} = await http.hackathon.get(id);
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
        if (!data || data.length === 0) return
        const existingIds = hackathons.value.map((hackathon) => hackathon.id);
        const newHackathons = data.filter((hackathon) => !existingIds.includes(hackathon.id));
        hackathons.value.push(...newHackathons);
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