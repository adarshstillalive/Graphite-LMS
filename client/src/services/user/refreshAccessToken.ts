import userAxiosInstance from '@/axios/userAxiosInstance';
import { setLogout, setToken } from '@/redux/slices/user/userSlice';
import store from '@/redux/store';

const refreshAccessToken = async () => {
  try {
    const currentUser = store.getState().user.currentUser;
    if (!currentUser) {
      return;
    }

    const response = await userAxiosInstance.post('/api/auth/refreshToken', {
      email: currentUser.email,
    });
    if (response.data && response.data.accessToken) {
      const { accessToken } = response.data;
      store.dispatch(setToken(accessToken));
    }
  } catch (error) {
    console.log('Refreshing access token failed', error);
    store.dispatch(setLogout());
  }
  return null;
};

export default refreshAccessToken;
