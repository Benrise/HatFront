import { type IBase } from "@/shared/api/types";

export interface IUser {
    id?: number;
    photo_url?: string;
    providers?: IBase[]
    education?: IEducation[]
    skills?: IBase[];
    specializations?: IBase[];
    about?: string;
    age?: number | string;
    city?: string;
    contacts?: IContacts;
    first_name?: string;
    second_name?: string;
    patronymic?: string;
}

export interface IContacts {
    github_url?: string;
    vk_url?: string;
    telegram?: string;
    email?: string;
}

export interface IEducation {
    education_id?: number;
    education_level_id?: number; //TODO: remove
    education_level?: IBase;
    education_program?: string;
    study_place?: string;
    class?: number;
    course?: number;
}

export interface IProvider {
    name: string;
    imgUrl: string;
}

export enum EProvider {
    VK = "/images/svg/vk-color.svg",
    MIREA = "/images/png/mirea.png"
}
