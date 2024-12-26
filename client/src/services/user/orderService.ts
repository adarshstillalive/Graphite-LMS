import userAxiosInstance from '@/axios/userAxiosInstance';
import { ApiResponse } from '@/interfaces/Response';

type SortType = {
  [key: string]: number;
};

export interface IRequestData {
  orderId: string;
  userId: string;
  itemId: string;
  price: string;
  reason: string;
}

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

export const fetchOrdersApi = async (
  sort: SortType,
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

  const queryString = queryParams.toString();
  const response = await userAxiosInstance.get(`/api/orders?${queryString}`);
  return response.data;
};

export const fetchOrderDetailsApi = async (
  orderId: string
): Promise<ApiResponse> => {
  const response = await userAxiosInstance.get(`/api/order/${orderId}`);
  return response.data;
};

export const returnCourseApi = async (
  formData: IRequestData
): Promise<ApiResponse> => {
  const response = await userAxiosInstance.post(`/api/order/return`, {
    formData,
  });
  return response.data;
};
