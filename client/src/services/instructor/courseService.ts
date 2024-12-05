import instructorAxiosInstance from '@/axios/instructorAxiosInstance';
import { ApiResponse } from '@/interfaces/Response';

export const fetchCategoriesFromApi = async (): Promise<ApiResponse> => {
  const response = await instructorAxiosInstance.get('/api/categories');
  return response.data;
};
