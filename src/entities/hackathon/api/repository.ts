import { CrudRepository } from '@/shared/api/crud';
import type { AxiosInstance } from 'axios';
import type { HackathonDto } from '../model';

  export class HackathonRepository extends CrudRepository<HackathonDto> {
    constructor(protected endpoint: string, protected axiosInstance: AxiosInstance) {
        super(endpoint, axiosInstance);
    }
}
