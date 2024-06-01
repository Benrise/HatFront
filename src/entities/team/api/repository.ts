import { CrudRepository, type IListParameters } from '@/shared/api/crud';
import type { AxiosInstance } from 'axios';
import type { TeamDto, TeamRequestDto, TeamSpecializationDto } from '../model';
import type { CursorListDto } from '@/shared/api/types';

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

    async createRequest(team_id: number, payload: TeamDto) {
      return this.axiosInstance.post(`${this.endpoint}/${team_id}/request`, payload);
    }
    async leave(team_id: number) {
      return this.axiosInstance.put(`${this.endpoint}/${team_id}/leave`);
    }

    async updateMain(team_id: number, payload: TeamDto) {
      return this.axiosInstance.put(`${this.endpoint}/${team_id}/main`, payload);
    }

    async updateSpecializations(team_id: number, payload: TeamSpecializationDto[]) {
      return this.axiosInstance.put(`${this.endpoint}/${team_id}/specializations`, payload);
    }

    async updateSkills(team_id: number, payload: number[]) {
        return this.axiosInstance.put(`${this.endpoint}/${team_id}/skills`, payload);
    }

  async updateTeammateSpecializations(user_id: number, team_id: number, payload: any) {
      return this.axiosInstance.put(`${this.endpoint}/${team_id}/specializations/${user_id}`, payload);
  }

  async listRequests(team_id: number, params?: IRequestListParameters) {
      return this.axiosInstance.get<CursorListDto<TeamRequestDto>>(`${this.endpoint}/${team_id}/request`, { params: params });
  }

  async updateCaptain(team_id: number, user_id: number) {
      return this.axiosInstance.put(`${this.endpoint}/${team_id}/${user_id}`);
  }
}

export class RequestsRepository extends CrudRepository<TeamRequestDto> {
  constructor(protected endpoint: string, protected axiosInstance: AxiosInstance) {
      super(endpoint, axiosInstance);
  }
}
