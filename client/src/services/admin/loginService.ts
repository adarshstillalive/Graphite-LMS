import adminAxiosInstance from '../../axios/adminAxiosInstance';
import { ApiResponse } from '../../interfaces/Response';

interface LoginData {
  email: string;
  password: string;
}

export const sendOtp = async (email: string): Promise<ApiResponse> => {
  const response = await adminAxiosInstance.post<ApiResponse>(
    '/api/auth/requestOtp',
    { email }
  );
  console.log('otpresponse:', response.data);
  return response.data;
};

export const loginUser = async (data: LoginData): Promise<ApiResponse> => {
  const response = await adminAxiosInstance.post<ApiResponse>(
    '/api/auth/login',
    data
  );
  return response.data;
};
