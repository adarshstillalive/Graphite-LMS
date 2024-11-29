import { useState } from 'react';
import OtpModal from '../../components/user/auth/OtpModal';
import SignUpForm from '../../components/user/auth/SignupForm';
import { createUser, sendOtp } from '../../services/user/loginService';
import { useDispatch } from 'react-redux';
import {
  setCurrentUser,
  setIsLoading,
  setToken,
} from '../../redux/slices/user/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderAuth from '../../components/common/HeaderAuth';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { setRole } from '@/redux/slices/user/appSlice';

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [otpModalStatus, setOtpModalStatus] = useState(false);
  const [credentials, setCredentials] = useState<SignupData>();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = async (data: SignupData) => {
    const { firstName, lastName, email, password } = data;
    setCredentials({ firstName, lastName, email, password });

    try {
      await sendOtp(email);
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
        description: 'Missing signup data. Please try signing up again.',
      });
      setOtpModalStatus(false);
      return;
    }

    try {
      const res = await createUser({ ...credentials, otp });
      const { user, accessToken } = res.data;
      dispatch(setToken(accessToken));
      dispatch(setCurrentUser(user));
      dispatch(setRole('user'));
      setOtpModalStatus(false);
      navigate('/');
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
        description:
          'Missing email for resending OTP. Please try signing up again.',
      });
      return;
    }

    try {
      await sendOtp(credentials.email);
      console.log('OTP resent successfully!');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { message } = error.response.data;
        toast({
          variant: 'destructive',
          description: message || 'Sending otp failed, Try again',
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
    dispatch(setIsLoading(false));
    setOtpModalStatus(false);
    setCredentials(undefined);
  };

  return (
    <>
      <HeaderAuth />
      <Toaster />
      <div className="min-h-full flex flex-col md:flex-row pt-16">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <SignUpForm onSignup={signup} />
        </div>
        <div className="hidden md:flex w-full md:w-1/2 items-center justify-center p-4 md:p-8 lg:p-16">
          <img
            alt="Signup ad"
            src="/display/auth_signup.png"
            className="md:max-h-96-full max-w-full object-contain"
          />
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

export default Signup;
