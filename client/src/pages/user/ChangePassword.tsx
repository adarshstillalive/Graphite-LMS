import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  checkConfirmPassword,
  checkPassword,
} from '@/utils/authUtils/validator';
import { changePasswordApi } from '@/services/user/profileService';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

const ChangePassword = () => {
  const { toast } = useToast();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    currentPassword: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState({
    currentPasswordError: '',
    passwordError: '',
    confirmPasswordError: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await changePasswordApi(credentials);
      if (response.success)
        toast({
          variant: 'default',
          description: 'Password changed',
        });
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
      setCredentials({
        currentPassword: '',
        password: '',
        confirmPassword: '',
      });
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    const updatedCredentials = { ...credentials, [field]: value };
    setCredentials(updatedCredentials);

    const updatedError = { ...error };
    switch (field) {
      case 'password':
        updatedError.passwordError = checkPassword(value.trim());
        break;
      case 'confirmPassword':
        updatedError.confirmPasswordError = checkConfirmPassword(
          credentials.password,
          value.trim()
        );
        break;
      default:
        break;
    }
    setError(updatedError);

    const allFieldsFilled = Object.values(updatedCredentials).every(Boolean);
    const noErrors = Object.values(updatedError).every((err) => !err);
    setDisableSubmit(!(allFieldsFilled && noErrors));
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 items-center flex flex-col justify-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 text-center">
        Change Password
      </h1>

      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        {/* Current Password */}
        <div className="mb-4 relative tooltip">
          <label
            htmlFor="currentPassword"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Current Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="currentPassword"
              value={credentials.currentPassword}
              onChange={(e) => handleChange('currentPassword', e.target.value)}
              placeholder="Enter your current password"
              className="w-full p-3 pr-10 border border-gray-500 focus:ring-black focus:outline-none focus:ring-2"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4 relative tooltip">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            New Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Password"
              className={`w-full p-3 pr-10 border ${
                error.passwordError
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-500 focus:ring-black'
              } focus:outline-none focus:ring-2`}
            />
            {error.passwordError && (
              <>
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
                  ⚠️
                </span>
                <span className="error-tooltip">{error.passwordError}</span>
              </>
            )}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-4 relative tooltip">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="confirmPassword"
              value={credentials.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              placeholder="Confirm Password"
              className={`w-full p-3 pr-10 border ${
                error.confirmPasswordError
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-500 focus:ring-black'
              } focus:outline-none focus:ring-2`}
            />
            {error.confirmPasswordError && (
              <>
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
                  ⚠️
                </span>
                <span className="error-tooltip">
                  {error.confirmPasswordError}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={disableSubmit || isLoading}
          className={`w-full font-bold text-white py-3 flex items-center justify-center ${
            disableSubmit || isLoading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-black cursor-pointer hover:bg-gray-900 transition duration-100'
          }`}
        >
          {isLoading ? (
            <Loader2 className="animate-spin w-6 h-6" />
          ) : (
            'Change Password'
          )}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
