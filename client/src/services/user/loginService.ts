import userAxiosInstance from '../../axios/userAxiosInstance';
import { ApiResponse } from '../../interfaces/Response';
import { LoginData } from '@/pages/user/Login';

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  otp: string;
}

interface ForgotPasswordData {
  email: string;
  password: string;
  otp: string;
}

export const sendOtp = async (email: string): Promise<ApiResponse> => {
  const response = await userAxiosInstance.post<ApiResponse>(
    '/api/auth/requestOtp',
    { email }
  );
  return response.data;
};

export const forgotPasswordSendOtp = async (
  email: string
): Promise<ApiResponse> => {
  const response = await userAxiosInstance.post<ApiResponse>(
    '/api/auth/forgotPassword/requestOtp',
    { email }
  );
  return response.data;
};

export const createUser = async (data: SignupData): Promise<ApiResponse> => {
  const response = await userAxiosInstance.post<ApiResponse>(
    '/api/auth/signup',
    { data }
  );
  return response.data;
};

export const loginUser = async (data: LoginData): Promise<ApiResponse> => {
  const response = await userAxiosInstance.post<ApiResponse>(
    '/api/auth/login',
    data
  );
  return response.data;
};

export const forgotPassword = async (
  data: ForgotPasswordData
): Promise<ApiResponse> => {
  const response = await userAxiosInstance.patch<ApiResponse>(
    '/api/auth/forgotPassword',
    data
  );
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const googleAuth = async (data: any): Promise<ApiResponse> => {
  const response = await userAxiosInstance.post<ApiResponse>('/auth/google', {
    credential: data,
  });
  return response.data;
};
