import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useToast } from '@/shared/ui/toast/use-toast';
import { StatusCodes } from 'http-status-codes';
import type { BaseDto } from '../api/types';
import type { LoadingKeys, LoadingState } from './types';

export function createCrudStore<T extends BaseDto>(storeId: string, httpService: any, withCursor: boolean = true) {
  return defineStore(storeId, () => {
    const { toast } = useToast();

    const items = ref<T[]>([]);
    const itemsMe = ref<T[]>([]);
    const item = ref<T>();
    const itemMe = ref<T>();
    const cursor = ref<any>(null);
    const cursorMe = ref<any>(null);
    const loading = ref<LoadingState>({
      list: false,
      listMe: false,
      item: false,
      itemMe: false,
      create: false,
      update: false,
      delete: false,
    });

    const setLoading = (key: LoadingKeys, value: boolean) => {
      loading.value[key] = value;
    };

    const fetchList = async (cursorValue: any = null) => {
      setLoading('list', true);
      try {
        const { data, status } = await httpService.list({ cursor: cursorValue });
        if (status !== StatusCodes.OK) {
          return;
        }
        if (withCursor) {
          items.value = [...items.value, ...data.objects];
          cursor.value = data.cursor;
        } else {
          items.value = data;
        }
      } catch (e) {
        console.error('Error on fetching list:', e);
        toast({
          variant: 'destructive',
          title: 'Ошибка',
          description: `Не удалось загрузить данные`,
        })
      } finally {
        setLoading('list', false);
      }
    };

    const fetchListMe = async (cursorValue: any = null) => {
      setLoading('listMe', true);
      try {
        const { data, status } = await httpService.listMe({ cursor: cursorValue });
        if (status !== StatusCodes.OK) {
          return;
        }
        if (withCursor) {
          itemsMe.value = [...itemsMe.value, ...data.objects];
          cursorMe.value = data.cursor;
        } else {
          itemsMe.value = data;
        }
      } catch (e) {
        console.error('Error on fetching listMe:', e);
        toast({
          variant: 'destructive',
          title: 'Ошибка',
          description: `Не удалось загрузить данные`,
        })
      } finally {
        setLoading('listMe', false);
      }
    };

    const fetchItem = async (id: number) => {
      setLoading('item', true);
      try {
        const { data, status } = await httpService.get(id);
        if (status !== StatusCodes.OK) {
          return;
        }
        item.value = data;
      } catch (e) {
        console.error('Error on fetching item:', e);
        toast({
          variant: 'destructive',
          title: 'Ошибка',
          description: `Не удалось загрузить данные`,
        })
      } finally {
        setLoading('item', false);
      }
    };

    const fetchItemMe = async (id: number) => {
      setLoading('itemMe', true);
      try {
        const { data, status } = await httpService.getMe(id);
        if (status !== StatusCodes.OK) {
          return;
        }
        itemMe.value = data;
      } catch (e) {
        console.error('Error on fetching itemMe:', e);
        toast({
          variant: 'destructive',
          title: 'Ошибка',
          description: `Не удалось загрузить данные`,
        })
      } finally {
        setLoading('itemMe', false);
      }
    };

    const createItem = async (payload: any) => {
      setLoading('create', true);
      try {
        const { data, status } = await httpService.post(payload);
        if (status === StatusCodes.CREATED) {
          items.value.push(data);
        }
      } catch (e) {
        console.error('Error on creating item:', e);
        toast({
          variant: 'destructive',
          title: 'Ошибка',
          description: `Не удалось выполнить операцию. Попробуйте позже.`,
        });
      } finally {
        setLoading('create', false);
      }
    };

    const updateItem = async (id: number, payload?: any) => {
      setLoading('update', true);
      try {
        const { status } = await httpService.put(id, payload);
        if (status !== StatusCodes.OK) {
          return;
        }
        fetchItem(id);
      } catch (e) {
        console.error('Error on updating item:', e);
        toast({
          variant: 'destructive',
          title: 'Ошибка',
          description: `Не удалось выполнить операцию. Попробуйте позже.`,
        });
      } finally {
        setLoading('update', false);
      }
    };

    const deleteItem = async (id: number) => {
      setLoading('delete', true);
      try {
        const { status } = await httpService.delete(id);
        if (status === StatusCodes.OK) {
          items.value = items.value.filter((item) => item.id !== id);
        }
      } catch (e) {
        console.error('Error on deleting item:', e);
        toast({
          variant: 'destructive',
          title: 'Ошибка',
          description: `Не удалось выполнить операцию. Попробуйте позже.`,
        });
      } finally {
        setLoading('delete', false);
      }
    };

    const resetList = async () => {
      items.value = [];
      cursor.value = null;
    };

    const resetListMe = async () => {
      itemsMe.value = [];
      cursor.value = null;
    };

    const resetItem = async () => {
      item.value = {} as T;
    };

    const resetItemMe = async () => {
      itemMe.value = {} as T;
    };

    return {
      items,
      itemsMe,
      item,
      itemMe,
      cursor,
      loading,
      fetchList,
      fetchListMe,
      fetchItem,
      fetchItemMe,
      createItem,
      updateItem,
      deleteItem,
      resetList,
      resetListMe,
      resetItem,
      resetItemMe,
    };
  });
}