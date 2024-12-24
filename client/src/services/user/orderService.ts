import userAxiosInstance from '@/axios/userAxiosInstance';
import { ApiResponse } from '@/interfaces/Response';

export const paypalOrder = async (): Promise<ApiResponse> => {
  const response = await userAxiosInstance.post('/api/order/paypal');
  return response.data;
};

export const capturePayment = async (orderId: string): Promise<ApiResponse> => {
  const response = await userAxiosInstance.get(
    `/api/capturePayment/${orderId}`
  );
  return response.data;
};
