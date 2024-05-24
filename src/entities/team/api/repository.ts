import { CrudRepository } from '@/shared/api/crud';
import type { AxiosInstance } from 'axios';
import type { TeamDto } from '../model';

  export class TeamRepository extends CrudRepository<TeamDto> {
    constructor(protected endpoint: string, protected axiosInstance: AxiosInstance) {
        super(endpoint, axiosInstance);
    }
}
