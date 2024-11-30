import refreshAccessToken from '@/services/user/refreshAccessToken';
import { useEffect } from 'react';

const useTokenRefresher = () => {
  useEffect(() => {
    const interval = setInterval(
      async () => {
        await refreshAccessToken();
      },
      14 * 60 * 1000
    );
    return () => clearInterval(interval);
  }, []);
};

export default useTokenRefresher;
