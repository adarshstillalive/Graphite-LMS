import userAxiosInstance from '@/axios/userAxiosInstance';
import { ApiResponse } from '@/interfaces/Response';

export const fetchCoursesForHomePage = async (
  currentPage: number = 0
): Promise<ApiResponse> => {
  const queryParams = new URLSearchParams();
  if (currentPage > 0) {
    queryParams.append('page', currentPage.toString());
  }

  const queryString = queryParams.toString();
  const response = await userAxiosInstance.get(`/api/courses?${queryString}`);
  return response.data;
};

export const fetchCategoriesFromApi = async (): Promise<ApiResponse> => {
  const response = await userAxiosInstance.get('/api/categories');
  return response.data;
};

export const fetchCommonCourse = async (
  courseId: string
): Promise<ApiResponse> => {
  const response = await userAxiosInstance.get(`/api/course/${courseId}`);
  return response.data;
};
