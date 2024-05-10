import type { AxiosInstance } from 'axios';
import type { IUser } from '../model';

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
}
