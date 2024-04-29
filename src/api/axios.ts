import axios from 'axios';
import { type InternalAxiosRequestConfig, type AxiosResponse, AxiosError } from "axios";
import { useToast } from '@/shared/ui/toast/use-toast';

const { toast } = useToast();

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 3000,
})

axiosInstance.interceptors.request.use(
    (config): InternalAxiosRequestConfig => {
        return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
  
    /**
     * 
     *  Success response
     * 
     */
    async (response): Promise<AxiosResponse> => {  
      return Promise.resolve(response);
    },
  
     /**
     * 
     *  Error response
     * 
     */
    async (error: AxiosError) => {
      console.error(error)

      toast({
        variant: 'destructive',
        title: 'Непредвиденная ошибка сервера',
        description: error.message,
      })

      Promise.reject(error);
    },
  );

  export default axiosInstance