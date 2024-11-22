import { Link } from 'react-router-dom';
import SocialAuth from './SocialAuth';
import { useState } from 'react';
import { checkEmail, checkPassword } from '../../utils/authUtils/validator';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({
    emailError: '',
    passwordError: '',
  });

  const handleChange = (field: string, value: string) => {
    setCredentials({ ...credentials, [field]: value });
    switch (field) {
      case 'email':
        setError({ ...error, emailError: checkEmail(value) });
        break;
      case 'password':
        setError({ ...error, passwordError: checkPassword(value) });
        break;

      default:
        break;
    }
  };
  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 items-center flex flex-col justify-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 text-center">
        Login
      </h1>
      <p className="text-gray-600 mb-8 text-center text-sm md:text-base">
        Welcome back! Please enter your credentials to access your account.
      </p>

      <form className="w-full max-w-sm">
        <div className="mb-4 relative tooltip">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Email
          </label>
          <div className="relative">
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

        <div className="mb-6 relative tooltip">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Enter your password"
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
          <p className="mt-2">
            <a href="#" className="text-blue-500 text-sm hover:underline">
              Forgot password?
            </a>
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-black font-bold text-white py-3 hover:bg-gray-900 transition duration-100"
        >
          Login
        </button>
      </form>

      <SocialAuth />

      <div className="mt-6 text-sm text-gray-600">
        <p>
          Don't have an account?{' '}
          <Link to="/auth/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
