import {
  setCurrentUser,
  setIsInstructor,
  setToken,
} from '@/redux/slices/user/userSlice';
import store from '@/redux/store';
import refreshAccessToken from '@/services/user/refreshAccessToken';
import isTokenExpired from '@/utils/authUtils/isTokenExpired';
import axios from 'axios';

// Create Axios instance
const userAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  withCredentials: true,
});

// Token refresh state
let isRefreshing = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let refreshSubscribers: any[] = [];

const addSubscriber = (callback: (value: unknown) => void) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (newToken: string) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

userAxiosInstance.interceptors.request.use(async (config) => {
  let token = store.getState().user.token;

  if (token && isTokenExpired(token)) {
    if (!isRefreshing) {
      isRefreshing = true;
      token = await refreshAccessToken();
      if (token) {
        store.dispatch(setToken(token));
        onRefreshed(token);
      }
      isRefreshing = false;
    }

    await new Promise((resolve) => addSubscriber(resolve));
  }

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

// Uncomment and use this simple interceptor if advanced refresh logic is unnecessary
/*
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
*/

userAxiosInstance.interceptors.response.use((res) => {
  if (res.data && res.data.user) {
    const { user } = res.data;
    const currentUser = store.getState().user.currentUser;
    if (JSON.stringify(currentUser) !== JSON.stringify(user)) {
      store.dispatch(setCurrentUser(user));
      store.dispatch(setIsInstructor(user.isInstructor));
    }
  }
  return res;
});

export default userAxiosInstance;
