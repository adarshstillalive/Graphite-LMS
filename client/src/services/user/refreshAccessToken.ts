import userAxiosInstance from '@/axios/userAxiosInstance';
import { setLogout } from '@/redux/slices/user/userSlice';
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

    if (response.data && response.data.data.accessToken) {
      const { accessToken } = response.data.data;
      return accessToken;
    }
  } catch (error) {
    console.log('Refreshing access token failed', error);
    store.dispatch(setLogout());
  }
};

export default refreshAccessToken;
