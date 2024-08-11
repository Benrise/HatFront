import type { BaseDto } from '@/shared/api/types';

export type LoadingKeys = 'list' | 'item' | 'create' | 'update' | 'delete' | 'listMe' | 'itemMe';

export interface LoadingState {
  list: boolean;
  item: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
  listMe: boolean;
  itemMe: boolean;
}

export interface SortProperty {
  name: string;
  value: boolean;
  title: string;
}

export interface CrudStore<T extends BaseDto> {
  items: T[];
  itemsMe?: T[];
  item: T | null;
  itemMe?: T | null;
  cursor: any | null;
  loading: LoadingState;
  fetchList(cursorValue?: any): Promise<void>;
  fetchListMe(cursorValue?: any): Promise<void>;
  fetchItem(id: number): Promise<void>;
  fetchItemMe?(id: number): Promise<void>;
  createItem(payload: any): Promise<void>;
  updateItem(id: number, payload: any): Promise<void>;
  deleteItem(id: number): Promise<void>;
  resetList(): void;
  resetListMe(): void;
  resetItem(): void;
  resetItemMe(): void;
}