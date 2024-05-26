import axiosInstance from '@/api/axios'
import { EducationLevelsRepository, RequestsRepository, SkillsRepository, SpecializationsRepository, UserRepository } from './repository';

const userUrl = 'user';
const educationLevelsUrl = 'education_levels';
const skills = 'skill';
const specializations = 'specialization';
const requests = 'request';

export const http = {
    user: new UserRepository(userUrl, axiosInstance),
    educationLevels: new EducationLevelsRepository(educationLevelsUrl, axiosInstance),
    skills: new SkillsRepository(skills, axiosInstance),
    specializations: new SpecializationsRepository(specializations, axiosInstance),
    request: new RequestsRepository(requests, axiosInstance),
}