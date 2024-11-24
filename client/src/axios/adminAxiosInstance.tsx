import axios from 'axios';

const adminAxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/admin`,
  withCredentials: true,
});

adminAxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default adminAxiosInstance;
