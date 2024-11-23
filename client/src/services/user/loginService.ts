import userAxiosInstance from '../../axios/userAxiosInstance';
import { ApiResponse } from '../../interfaces/Response';

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  otp: string;
}

export const sendOtp = async (email: string): Promise<ApiResponse> => {
  const response = await userAxiosInstance.post<ApiResponse>(
    '/api/auth/requestOtp',
    { email }
  );
  console.log('otpresponse:', response.data);
  return response.data;
};

export const createUser = async (data: SignupData): Promise<ApiResponse> => {
  const response = await userAxiosInstance.post<ApiResponse>(
    '/api/auth/signup',
    { data }
  );
  return response.data;
};
