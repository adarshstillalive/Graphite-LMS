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
import { useDispatch } from 'react-redux';
import { setIsLoading } from '@/redux/slices/user/userSlice';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

export interface ForgotPasswordData {
  email: string;
  password: string;
}

const ForgotPassword = () => {
  const [otpModalStatus, setOtpModalStatus] = useState(false);
  const [credentials, setCredentials] = useState<ForgotPasswordData>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changePassword = async (data: ForgotPasswordData) => {
    const { email, password } = data;
    setCredentials({ email, password });

    try {
      await forgotPasswordSendOtp(email);
      setOtpModalStatus(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { message } = error.response.data;
        toast({
          variant: 'destructive',
          description: message,
        });
        console.error(message);
      } else {
        console.error('An unexpected error occurred:', error);
        toast({
          variant: 'destructive',
          description: 'An unexpected error occurred',
        });
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const verifyOtp = async (otp: string) => {
    if (!credentials) {
      toast({
        variant: 'destructive',
        description: 'Missing credentials. Please try again.',
      });
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
        toast({
          variant: 'destructive',
          description: message,
        });
        console.error(message);
      } else {
        console.error('An unexpected error occurred:', error);
        toast({
          variant: 'destructive',
          description: 'An unexpected error occurred',
        });
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const resendOtp = async () => {
    if (!credentials?.email) {
      toast({
        variant: 'destructive',
        description: 'Missing email for resending OTP. Please try again.',
      });
      return;
    }

    try {
      await forgotPasswordSendOtp(credentials.email);
      console.log('OTP resent successfully!');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { message } = error.response.data;
        toast({
          variant: 'destructive',
          description: message,
        });
        console.error(message);
      } else {
        console.error('An unexpected error occurred:', error);
        toast({
          variant: 'destructive',
          description: 'An unexpected error occurred',
        });
      }
    }
  };

  const cancelOtp = () => {
    setOtpModalStatus(false);
    dispatch(setIsLoading(false));
    setCredentials(undefined);
  };

  return (
    <>
      <HeaderAuth />
      <Toaster />
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
      </div>
    </>
  );
};

export default ForgotPassword;
