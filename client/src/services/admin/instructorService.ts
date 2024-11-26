import adminAxiosInstance from '../../axios/adminAxiosInstance';
import { ApiResponse } from '../../interfaces/Response';

export const fetchRequests = async (): Promise<ApiResponse> => {
  const response = await adminAxiosInstance.get('/api/instructor/requests');
  console.log(response.data);

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
