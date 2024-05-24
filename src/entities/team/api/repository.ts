import { CrudRepository } from '@/shared/api/crud';
import type { AxiosInstance } from 'axios';
import type { TeamDto } from '../model';

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
}
