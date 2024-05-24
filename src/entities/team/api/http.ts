import axiosInstance from '@/api/axios'
import { TeamRepository } from './repository';

const teamUrl = 'team';

export const http = {
    team: new TeamRepository(teamUrl, axiosInstance),
}