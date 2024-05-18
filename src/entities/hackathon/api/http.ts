import axiosInstance from '@/api/axios'
import { HackathonRepository } from './repository';

const hackathonUrl = 'hackathon';

export const http = {
    hackathon: new HackathonRepository(hackathonUrl, axiosInstance),
}