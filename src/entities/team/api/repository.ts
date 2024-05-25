import { CrudRepository } from '@/shared/api/crud';
import type { AxiosInstance } from 'axios';
import type { TeamDto } from '../model';
import type { CursorListDto } from '@/shared/api/types';

const fileRequestConfig: AxiosRequestConfig = {
  config: {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  },
};


  export class TeamRepository extends CrudRepository<TeamDto> {
    constructor(protected endpoint: string, protected axiosInstance: AxiosInstance) {
        super(endpoint, axiosInstance);
    }

    async uploadPhoto(id: number, payload: File | null) {
      const fromData = new FormData();
      if (payload) fromData.append('photo', payload);
      return this.axiosInstance.put(`${this.endpoint}/${id}/photo`, fromData, fileRequestConfig.config);
    }

    async listMe() {
      return this.axiosInstance.get<CursorListDto<TeamDto>>(`${this.endpoint}/me`);
    }

    async createRequest(user_id: number, payload: TeamDto) {
      return this.axiosInstance.post(`${this.endpoint}/${user_id}/request`, payload);
    }
}
