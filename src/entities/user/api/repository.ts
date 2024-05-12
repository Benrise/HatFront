import type { AxiosInstance } from 'axios';
import type { IEducation, IUser } from '../model';
import type { IBaseCursorList, IBase } from '@/shared/api/types';
import type { ComputedRef } from 'vue';

const fileRequestConfig: AxiosRequestConfig = {
    config: {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  };

export class  UserRepository{
    constructor(protected endpoint: string, private axiosInstance: AxiosInstance) {}

    async me(){
        return this.axiosInstance.get<IUser>(`${this.endpoint}/me`);
    }

    async uploadPhoto(payload: File) {
        const fromData = new FormData();
        fromData.append('photo', payload);
        return this.axiosInstance.put(`${this.endpoint}/photo`, fromData, fileRequestConfig.config);
    }

    async updateMain(payload: IUser) {
        return this.axiosInstance.put(`${this.endpoint}/main`, payload);
    }

    async updateEducation(payload: IEducation[]) {
        return this.axiosInstance.put(`${this.endpoint}/education`, payload);
    }

    async updateSkills(payload: IBase[]) {
        return this.axiosInstance.put(`${this.endpoint}/skills`, payload);
    }

    async updateSpecializations(payload: IBase[]) {
        return this.axiosInstance.put(`${this.endpoint}/specializations`, payload);
    }

}

export class EducationLevelsRepository {

    constructor(protected endpoint: string, private axiosInstance: AxiosInstance) {}

    async get() {
        return this.axiosInstance.get<IBase[]>(`${this.endpoint}`);
    }
}

export class SkillsRepository {
    constructor(protected endpoint: string, private axiosInstance: AxiosInstance) {}

    async get() {
        return this.axiosInstance.get<IBaseCursorList>(`${this.endpoint}`);
    }
}
export class SpecializationsRepository {
    constructor(protected endpoint: string, private axiosInstance: AxiosInstance) {}

    async get() {
        return this.axiosInstance.get<IBaseCursorList>(`${this.endpoint}`);
    }
}