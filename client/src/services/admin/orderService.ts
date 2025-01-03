import adminAxiosInstance from '@/axios/adminAxiosInstance';
import { ApiResponse } from '@/interfaces/Response';

type SortType = {
  [key: string]: number;
};

export const fetchReturnRequests = async (
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
  const response = await adminAxiosInstance.get(
    `/api/order/return?${queryString}`
  );
  return response.data;
};

export const fetchOrders = async (
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
  const response = await adminAxiosInstance.get(`/api/orders?${queryString}`);
  return response.data;
};

export const hangleReturnRequest = async (
  requestId: string,
  orderId: string,
  userId: string,
  status: string
): Promise<ApiResponse> => {
  const response = await adminAxiosInstance.patch(
    `/api/order/return/${requestId}/${orderId}/${userId}/${status}`
  );
  return response.data;
};

export const fetchListingCounts = async (): Promise<ApiResponse> => {
  const response = await adminAxiosInstance.get('/api/listingCounts');
  return response.data;
};

export const fetchOrdersForChartLine = async (
  filter: string
): Promise<ApiResponse> => {
  const response = await adminAxiosInstance.get(
    `/api/orders/chartLine?filter=${filter}`
  );
  return response.data;
};
