export class BaseDto  {
    id?: number;
    name?: string;
}

export abstract class BaseDtoCursorList<T> {
    cursor: number = 0;
    objects: T[] = [];
}