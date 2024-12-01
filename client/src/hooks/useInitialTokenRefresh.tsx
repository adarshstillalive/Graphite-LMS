import { setToken } from '@/redux/slices/user/userSlice';
import store from '@/redux/store';
import refreshAccessToken from '@/services/user/refreshAccessToken';
import isTokenExpired from '@/utils/authUtils/isTokenExpired';
import { useEffect } from 'react';

export const useInitialTokenRefresh = () => {
  useEffect(() => {
    const checkTokenOnLoad = async () => {
      let accessToken = store.getState().user.token;
      if (!accessToken || isTokenExpired(accessToken)) {
        accessToken = await refreshAccessToken();
        if (accessToken) {
          store.dispatch(setToken(accessToken));
        }
      }
    };
    checkTokenOnLoad();
  }, []);
};
