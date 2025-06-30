import axios from 'axios';
import { useCookies } from 'next-client-cookies';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const useApiClient = () => {
  const cookies = useCookies();

  axiosClient.interceptors.request.use(config => {
    const token = cookies.get('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return axiosClient;
};
