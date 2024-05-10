export interface IUser {
    id?: number;
    university?: string;
    education?: string;
    contacts?: IContacts;
    name?: string;
    age?: number;
    about?: string;
    city?: string;
    photo_url?: string;
    skills?: string[];
    specializations?: string[];
}
interface IContacts {
    github_url: string | null;
    vk_url: string | null;
    telegram: string | null;
}
