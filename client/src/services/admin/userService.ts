import adminAxiosInstance from '@/axios/adminAxiosInstance';
import { ApiResponse } from '@/interfaces/Response';

type SortType = {
  [key: string]: number;
};

export const getUsers = async (
  currentPage: number = 0,
  sort: SortType
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

  const queryString = queryParams.toString();
  const response = await adminAxiosInstance.get(`/api/users?${queryString}`);
  return response.data;
};
