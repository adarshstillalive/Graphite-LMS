import adminAxiosInstance from '@/axios/adminAxiosInstance';

export const getUsers = async () => {
  const response = await adminAxiosInstance.get('/api/users');
  return response.data;
};
