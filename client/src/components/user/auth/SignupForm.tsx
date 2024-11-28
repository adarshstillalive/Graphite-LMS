import { Link } from 'react-router-dom';
import SocialAuth from './SocialAuth';
import React, { useState } from 'react';
import {
  checkConfirmPassword,
  checkEmail,
  checkFirstName,
  checkLastName,
  checkPassword,
} from '../../../utils/authUtils/validator';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setIsLoading } from '@/redux/slices/user/userSlice';
import { Loader2 } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SignUpForm: React.FC<{ onSignup: (data: FormData) => void }> = ({
  onSignup,
}) => {
  const { isLoading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [disableSignup, setDisableSignup] = useState(true);
  const [credentials, setCredentials] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState({
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(setIsLoading(true));
    onSignup(credentials);
    setCredentials({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleChange = (field: string, value: string) => {
    const updatedCredentials = { ...credentials, [field]: value };
    setCredentials(updatedCredentials);

    const updatedError = { ...error };
    switch (field) {
      case 'firstName':
        updatedError.firstNameError = checkFirstName(value.trim());
        break;
      case 'lastName':
        updatedError.lastNameError = checkLastName(value.trim());
        break;
      case 'email':
        updatedError.emailError = checkEmail(value.trim());
        break;
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
    setDisableSignup(!(allFieldsFilled && noErrors));
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 items-center flex flex-col justify-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 text-center">
        Sign Up
      </h1>
      <p className="text-gray-600 mb-8 text-center text-sm md:text-base">
        Create an account to get started
      </p>

      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-4 flex gap-4">
          <div className="flex-1 relative ">
            <label
              htmlFor="firstName"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              First Name
            </label>
            <div className="relative tooltip">
              <input
                type="text"
                id="firstName"
                value={credentials.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                placeholder="First Name"
                className={`w-full p-3 pr-10 border ${
                  error.firstNameError
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-500 focus:ring-black'
                } focus:outline-none focus:ring-2`}
              />
              {error.firstNameError && (
                <>
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
                    ⚠️
                  </span>
                  <span className="error-tooltip">{error.firstNameError}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex-1 relative ">
            <label
              htmlFor="lastName"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Last Name
            </label>
            <div className="relative tooltip">
              <input
                type="text"
                id="lastName"
                value={credentials.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                placeholder="Last Name"
                className={`w-full p-3 pr-10 border ${
                  error.lastNameError
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-500 focus:ring-black'
                } focus:outline-none focus:ring-2`}
              />
              {error.lastNameError && (
                <>
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
                    ⚠️
                  </span>
                  <span className="error-tooltip">{error.lastNameError}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4 relative ">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Email
          </label>
          <div className="relative tooltip">
            <input
              type="email"
              id="email"
              value={credentials.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Enter your email"
              className={`w-full p-3 pr-10 border ${
                error.emailError
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-500 focus:ring-black'
              } focus:outline-none focus:ring-2`}
            />
            {error.emailError && (
              <>
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
                  ⚠️
                </span>
                <span className="error-tooltip">{error.emailError}</span>
              </>
            )}
          </div>
        </div>

        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative ">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Password
            </label>
            <div className="relative tooltip">
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

          <div className="flex-1 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Confirm Password
            </label>
            <div className="relative tooltip">
              <input
                type="password"
                id="confirmPassword"
                value={credentials.confirmPassword}
                onChange={(e) =>
                  handleChange('confirmPassword', e.target.value)
                }
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
        </div>
        <div></div>
        <button
          type="submit"
          disabled={disableSignup || isLoading}
          className={`w-full font-bold text-white py-3 flex items-center justify-center ${
            disableSignup || isLoading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-black cursor-pointer hover:bg-gray-900 transition duration-100'
          }`}
        >
          {isLoading ? <Loader2 className="animate-spin w-6 h-6" /> : 'Sign Up'}
        </button>
      </form>

      <SocialAuth />

      <div className="mt-6 text-sm text-gray-600">
        <p>
          Already have an account?{' '}
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
