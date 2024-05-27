import axiosInstance from '@/api/axios'
import { RequestsRepository, TeamRepository } from './repository';

const teamUrl = 'team';
const request = 'request';

export const http = {
    team: new TeamRepository(teamUrl, axiosInstance),
    request: new RequestsRepository(request, axiosInstance),
}