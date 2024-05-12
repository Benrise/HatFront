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
    education_level_id?: number;
    education_program?: string;
    study_place?: string;
    class?: number;
    course?: number;
}

