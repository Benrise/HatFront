export class BaseDto  {
    id: number = 0;
    name?: string;
}

export abstract class CursorListDto<T> {
    cursor: number = 0;
    objects: T[] = [];
}