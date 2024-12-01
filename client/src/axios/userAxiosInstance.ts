import {
  setCurrentUser,
  setIsInstructor,
  setToken,
} from '@/redux/slices/user/userSlice';
import store from '@/redux/store';
import refreshAccessToken from '@/services/user/refreshAccessToken';
import isTokenExpired from '@/utils/authUtils/isTokenExpired';
import axios from 'axios';

const userAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  withCredentials: true,
});

userAxiosInstance.interceptors.request.use(async (config) => {
  let token = store.getState().user.token;

  if (token) {
    if (isTokenExpired(token)) {
      token = await refreshAccessToken();
      if (token) {
        store.dispatch(setToken(token));
      }
    }
    config.headers.Authorization = token;
  }
  return config;
});

userAxiosInstance.interceptors.response.use(
  (res) => {
    if (res.data && res.data.data && res.data.data.user) {
      const { user } = res.data.data;

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
