import axiosInstance from '@/api/axios'
import { UserRepository } from './repository';

const url = 'user';

export const http = {
    user: new UserRepository(url, axiosInstance),
}