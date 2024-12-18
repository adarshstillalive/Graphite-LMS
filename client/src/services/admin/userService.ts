import adminAxiosInstance from '@/axios/adminAxiosInstance';
import { ApiResponse } from '@/interfaces/Response';

type SortType = {
  [key: string]: number;
};

export const getUsers = async (
  currentPage: number = 0,
  sort: SortType,
  filter: string
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
    const query = { firstName: { $regex: filter, $options: 'i' } };
    queryParams.append('filter', JSON.stringify(query));
  }

  const queryString = queryParams.toString();
  const response = await adminAxiosInstance.get(`/api/users?${queryString}`);
  return response.data;
};

export const handleBlock = async (userId: string): Promise<ApiResponse> => {
  const response = await adminAxiosInstance.patch(`/api/users/${userId}`);
  return response.data;
};
