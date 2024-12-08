import instructorAxiosInstance from '@/axios/instructorAxiosInstance';
import { ApiResponse } from '@/interfaces/Response';

export const fetchCategoriesFromApi = async (): Promise<ApiResponse> => {
  const response = await instructorAxiosInstance.get('/api/categories');
  return response.data;
};

export const cloudinarySignedVideoUploadUrl =
  async (): Promise<ApiResponse> => {
    const response = await instructorAxiosInstance.get(
      '/api/course/upload/videoSign'
    );
    return response.data;
  };
