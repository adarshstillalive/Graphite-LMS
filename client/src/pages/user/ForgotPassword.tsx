import { useState } from 'react';
import OtpModal from '../../components/user/auth/OtpModal';
import {
  forgotPassword,
  forgotPasswordSendOtp,
} from '../../services/user/loginService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderAuth from '../../components/common/HeaderAuth';
import ForgotPasswordForm from '@/components/user/auth/ForgotPasswordForm';

export interface ForgotPasswordData {
  email: string;
  password: string;
}

const ForgotPassword = () => {
  const [otpModalStatus, setOtpModalStatus] = useState(false);
  const [credentials, setCredentials] = useState<ForgotPasswordData>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const changePassword = async (data: ForgotPasswordData) => {
    setError(null);
    const { email, password } = data;
    setCredentials({ email, password });

    try {
      await forgotPasswordSendOtp(email);
      setOtpModalStatus(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { message } = error.response.data;
        setError(message);
        console.error(message);
      } else {
        console.error('An unexpected error occurred:', error);
        setError('An unexpected error occurred.');
      }
    }
  };

  const verifyOtp = async (otp: string) => {
    if (!credentials) {
      setError('Missing credentials data. Please again.');
      setOtpModalStatus(false);
      return;
    }

    try {
      const res = await forgotPassword({ ...credentials, otp });
      if (!res.success) {
        throw new Error('failed');
      }
      navigate('/auth/login');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { message } = error.response.data;
        setError(message);
        console.error(message);
      } else {
        console.error('An unexpected error occurred:', error);
        setError('An unexpected error occurred.');
      }
    }
  };

  const resendOtp = async () => {
    if (!credentials?.email) {
      setError('Missing email for resending OTP. Please try signing up again.');
      return;
    }

    try {
      await forgotPasswordSendOtp(credentials.email);
      console.log('OTP resent successfully!');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { message } = error.response.data;
        setError(message);
        console.error(message);
      } else {
        console.error('An unexpected error occurred:', error);
        setError('An unexpected error occurred.');
      }
    }
  };

  const cancelOtp = () => {
    setOtpModalStatus(false);
    setCredentials(undefined);
    setError(null);
  };

  return (
    <>
      <HeaderAuth />
      <div className="min-h-full flex justify-center align-middle pt-16">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <ForgotPasswordForm onSubmit={changePassword} />
        </div>

        {otpModalStatus && (
          <OtpModal
            onVerify={verifyOtp}
            onResendOtp={resendOtp}
            onCancel={cancelOtp}
          />
        )}
        {error && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md shadow-md">
            {error}
          </div>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
