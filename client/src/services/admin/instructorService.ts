import adminAxiosInstance from '../../axios/adminAxiosInstance';
import { ApiResponse } from '../../interfaces/Response';

type SortType = {
  [key: string]: number;
};

export const fetchRequests = async (): Promise<ApiResponse> => {
  const response = await adminAxiosInstance.get('/api/instructor/requests');

  return response.data;
};

export const approveRequest = async (
  id: string,
  userId: string
): Promise<ApiResponse> => {
  const response = await adminAxiosInstance.patch(
    `/api/instructor/request/${id}/${userId}`
  );
  return response.data;
};

export const getInstructors = async (
  currentPage: number,
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

  const response = await adminAxiosInstance.get(
    `/api/instructors?${queryString}`
  );
  return response.data;
};

export const handleBlock = async (
  instructorId: string
): Promise<ApiResponse> => {
  const response = await adminAxiosInstance.patch(
    `/api/instructors/${instructorId}`
  );
  return response.data;
};
