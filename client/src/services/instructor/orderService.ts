import instructorAxiosInstance from '@/axios/instructorAxiosInstance';
import { ApiResponse } from '@/interfaces/Response';

export const fetchInstructorOrders = async (): Promise<ApiResponse> => {
  const response = await instructorAxiosInstance.get('/api/orders');
  return response.data;
};
