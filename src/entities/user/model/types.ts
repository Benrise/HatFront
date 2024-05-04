export enum EGender {
    male = 'male',
    female = 'female'
  }

export interface IUser {
    id: number
    name: string,
    surname: string,
    patronymic: string,
    birthday: Date,
    gender: EGender,
    avatar: string,
    city: string,
    university: string,
    specialization: string,
    roles: string[],
    technologies: string[],
    vk: string,
    telegram: string,
    email: string,
    github: string,
    about: string
  }