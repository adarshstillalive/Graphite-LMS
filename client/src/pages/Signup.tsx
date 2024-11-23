import { useState } from 'react';
import OtpModal from '../components/auth/OtpModal';
import SignUpForm from '../components/auth/SignupForm';
import { createUser, sendOtp } from '../services/user/loginService';

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [otpModalStatus, setOtpModalStatus] = useState(false);
  const [credentials, setCredentials] = useState<SignupData>();
  const [error, setError] = useState<string | null>(null);

  const signup = async (data: SignupData) => {
    setError(null);
    const { firstName, lastName, email, password } = data;
    setCredentials({ firstName, lastName, email, password });

    try {
      const res = await sendOtp(email);
      if (!res.success) {
        setError(res.message || 'Failed to send OTP. Please try again.');
        return;
      }
      setOtpModalStatus(true);
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
      console.error(err);
    }
  };

  const verifyOtp = async (otp: string) => {
    if (!credentials) {
      setError('Missing signup data. Please try signing up again.');
      setOtpModalStatus(false);
      return;
    }

    try {
      const res = await createUser({ ...credentials, otp });
      // if (!res.success) {
      //   setError(res.message || 'Invalid OTP. Please try again.');
      //   return;
      // }
      console.log('User created successfully!', res);
      setOtpModalStatus(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const { message } = err.response.data;
      setError(message);
      console.error(err);
    }
  };

  const resendOtp = async () => {
    if (!credentials?.email) {
      setError('Missing email for resending OTP. Please try signing up again.');
      return;
    }

    try {
      const res = await sendOtp(credentials.email);
      if (!res.success) {
        setError(res.message || 'Failed to resend OTP. Please try again.');
        return;
      }
      console.log('OTP resent successfully!');
    } catch (err) {
      setError('An unexpected error occurred while resending OTP.');
      console.error(err);
    }
  };

  const cancelOtp = () => {
    setOtpModalStatus(false);
    setCredentials(undefined);
    setError(null);
  };

  return (
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
      {error && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md shadow-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default Signup;
