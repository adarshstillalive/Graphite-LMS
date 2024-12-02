import baseAxiosInstanceAdmin from '@/axios/baseAxiosInstanceAdmin';
import { setLogout } from '@/redux/slices/user/userSlice';
import store from '@/redux/store';

const refreshAccessToken = async () => {
  try {
    const currentAdmin = store.getState().admin.currentAdmin;
    if (!currentAdmin) {
      return;
    }

    const response = await baseAxiosInstanceAdmin.post(
      '/api/auth/refreshToken',
      {
        email: currentAdmin.email,
      }
    );

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
