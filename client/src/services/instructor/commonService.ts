import { ApiResponse } from '@/interfaces/Response';
import instructorAxiosInstance from '../../axios/instructorAxiosInstance';

interface RequestData {
  expertise: string[];
  qualifications: string[];
  additionalInfo: string[];
}

export const sendRequest = async (data: RequestData) => {
  try {
    const response = await instructorAxiosInstance.post<ApiResponse>(
      '/api/request',
      data
    );
    console.log('req data', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchInstructor = async (userId: string) => {
  try {
    const response = await instructorAxiosInstance.get<ApiResponse>(
      `/api/profile/${userId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchRequest = async (userId: string) => {
  try {
    const response = await instructorAxiosInstance.get<ApiResponse>(
      `/api/request/${userId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
