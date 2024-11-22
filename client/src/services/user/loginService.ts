import userAxiosInstance from '../../axios/userAxiosInstance';

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  otp: string;
}

interface OtpResponse {
  success: boolean;
  message: string;
}

export const sendOtp = async (email: string): Promise<OtpResponse> => {
  const response = await userAxiosInstance.post<OtpResponse>(
    '/api/auth/requestOtp',
    { email }
  );
  console.log('otpresponse:', response.data);
  return response.data;
};

export const createUser = async (data: SignupData) => {
  const response = await userAxiosInstance.post('/api/auth/signup', { data });
  console.log(response);
};
