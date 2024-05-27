import type { AxiosInstance } from 'axios';
import type { EducationDto, UserRequestDto, UserDto } from '../model';
import type { CursorListDto, BaseDto } from '@/shared/api/types';
import { CrudRepository, type IListParameters } from '@/shared/api/crud';
import type { TeamDto } from '@/entities/team/model';

const fileRequestConfig: AxiosRequestConfig = {
    config: {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  };
  export interface IRequestListParameters extends IListParameters {
    is_to_team?: boolean
}

export class UserRepository extends CrudRepository<UserDto>{
    constructor(protected endpoint: string, protected axiosInstance: AxiosInstance) {
        super(endpoint, axiosInstance);
    }

    async me(){
        return this.axiosInstance.get<UserDto>(`${this.endpoint}/me`);
    }

    async uploadPhoto(payload: File | null) {
        const fromData = new FormData();
        if (payload) fromData.append('photo', payload);
        return this.axiosInstance.put(`${this.endpoint}/photo`, fromData, fileRequestConfig.config);
    }

    async updateMain(payload: UserDto) {
        return this.axiosInstance.put(`${this.endpoint}/main`, payload);
    }

    async updateEducation(payload: EducationDto) {
        return this.axiosInstance.put(`${this.endpoint}/education`, payload);
    }

    async createEducation(payload: EducationDto) {
        return this.axiosInstance.post(`${this.endpoint}/education`, payload);
    }

    async deleteEduction(id: number) {
        return this.axiosInstance.delete(`${this.endpoint}/education/${id}`); 
    }

    async updateSkills(payload: number[]) {
        return this.axiosInstance.put(`${this.endpoint}/skills`, payload);
    }
    
    async updateSpecializations(payload: number[]) {
        return this.axiosInstance.put(`${this.endpoint}/specializations`, payload);
    }

    async createRequest(user_id: number, payload: TeamDto) {
        return this.axiosInstance.post(`${this.endpoint}/${user_id}/request`, payload);
    }

    async listRequests(params?: IRequestListParameters) {
        return this.axiosInstance.get<CursorListDto<UserRequestDto>>(`${this.endpoint}/request`, { params: params });
    }
}

export class EducationLevelsRepository {

    constructor(protected endpoint: string, private axiosInstance: AxiosInstance) {}

    async get() {
        return this.axiosInstance.get<BaseDto[]>(`${this.endpoint}`);
    }
}

export class SkillsRepository {
    constructor(protected endpoint: string, private axiosInstance: AxiosInstance) {}

    async get() {
        return this.axiosInstance.get<CursorListDto<BaseDto>>(`${this.endpoint}`);
    }
}
export class SpecializationsRepository {
    constructor(protected endpoint: string, private axiosInstance: AxiosInstance) {}

    async get() {
        return this.axiosInstance.get<CursorListDto<BaseDto>>(`${this.endpoint}`);
    }
}

export class RequestsRepository extends CrudRepository<UserRequestDto> {
    constructor(protected endpoint: string, protected axiosInstance: AxiosInstance) {
        super(endpoint, axiosInstance);
    }
}