import userAxiosInstance from '@/axios/userAxiosInstance';
import { ApiResponse } from '@/interfaces/Response';

type SortType = {
  [key: string]: number;
};

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

export const fetchCoursesForProductsPage = async (
  queryString1: string | undefined,
  sort: SortType,
  filter: string,
  currentPage: number
): Promise<ApiResponse> => {
  const queryParams = new URLSearchParams();
  if (currentPage > 0) {
    queryParams.append('page', currentPage.toString());
  }

  if (sort) {
    for (const key in sort) {
      queryParams.append(`sort[${key}]`, sort[key].toString());
    }
  }

  if (filter) {
    const query = { title: { $regex: filter, $options: 'i' } };
    queryParams.append('filter', JSON.stringify(query));
  }

  const queryString2 = queryParams.toString();

  const response = await userAxiosInstance.get(
    `/api/courses/productpage${queryString1 ? `?${queryString1 + '&' + queryString2}` : `?${queryString2}`}`
  );
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
