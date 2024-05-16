export interface IBase  {
    id: number;
    name: string;
}

export interface IBaseCursorList {
    cursor: number;
    objects: IBase[]
}