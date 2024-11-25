import axios from 'axios';

const instructorAxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/instructor`,
  withCredentials: true,
});

instructorAxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default instructorAxiosInstance;
