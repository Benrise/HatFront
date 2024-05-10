import type { AxiosInstance } from 'axios';
import type { IUser } from '../model';
export class  UserRepository{
    constructor(protected endpoint: string, private axiosInstance: AxiosInstance) {}

    async me(){
        return this.axiosInstance.get<IUser>(`${this.endpoint}/me`);
    }
}
