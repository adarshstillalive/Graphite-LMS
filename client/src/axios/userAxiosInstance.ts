import { setCurrentUser, setIsInstructor } from '@/redux/slices/user/userSlice';
import store from '@/redux/store';
import axios from 'axios';

const userAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  withCredentials: true,
});

userAxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken') || null;

  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

userAxiosInstance.interceptors.response.use(
  (res) => {
    if (res.data && res.data.data && res.data.data.user) {
      const { user } = res.data.data;
      console.log('axios interceptors', user);

      store.dispatch(setCurrentUser(user));
      store.dispatch(setIsInstructor(user.isInstructor));
    }
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default userAxiosInstance;
