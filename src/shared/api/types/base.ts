export interface IBase  {
    id: string;
    name: string;
}

export interface IBaseCursorList {
    cursor: number;
    objects: IBase[]
}