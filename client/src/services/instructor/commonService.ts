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
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchInstructor = async () => {
  try {
    const response =
      await instructorAxiosInstance.get<ApiResponse>(`/api/profile`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchRequest = async () => {
  try {
    const response =
      await instructorAxiosInstance.get<ApiResponse>(`/api/request`);
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
