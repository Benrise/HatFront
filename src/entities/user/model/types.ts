import { type BaseDto } from "@/shared/api/types";

export class UserDto {
    constructor() {
        this.education = [];
        this.providers = [];
        this.skills = [];
        this.specializations = [];
    }
    id: number = 0;
    photo_url?: string;
    providers?: BaseDto[];
    education: EducationDto[];
    skills: BaseDto[];
    specializations: BaseDto[];
    about?: string;
    age?: number | string;
    city?: string;
    contacts?: ContactsDto;
    first_name?: string;
    second_name?: string;
    patronymic?: string;
}

export class ContactsDto {
    github_url?: string | "";
    vk_url?: string | "";
    telegram?: string | "";
    email?: string | "";
}

export class EducationDto {
    education_id?: number;
    education_level_id?: number;
    education_level?: BaseDto;
    education_program?: string;
    study_place?: string;
    class?: number = 1;
    course?: number = 1;
}

export enum EProvider {
    VK = "/images/svg/vk-color.svg",
    MIREA = "/images/png/mirea.png"
}
