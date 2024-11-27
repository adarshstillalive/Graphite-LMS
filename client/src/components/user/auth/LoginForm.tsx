import { Link } from 'react-router-dom';
import SocialAuth from './SocialAuth';
import { useState } from 'react';
import { checkEmail, checkPassword } from '../../../utils/authUtils/validator';

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC<{ onLogin: (data: FormData) => void }> = ({
  onLogin,
}) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({
    emailError: '',
    passwordError: '',
  });

  const [disableSignup, setDisableSignup] = useState(true);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onLogin(credentials);
    setCredentials({
      email: '',
      password: '',
    });
  };

  const handleChange = (field: string, value: string) => {
    const updatedCredentials = { ...credentials, [field]: value };
    setCredentials(updatedCredentials);

    const updatedError = { ...error };
    switch (field) {
      case 'email':
        updatedError.emailError = checkEmail(value.trim());
        break;
      case 'password':
        updatedError.passwordError = checkPassword(value.trim());
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
        Login
      </h1>
      <p className="text-gray-600 mb-8 text-center text-sm md:text-base">
        Welcome back! Please enter your credentials to access your account.
      </p>

      <form onSubmit={(e) => handleSubmit(e)} className="w-full max-w-sm">
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
            <Link
              to="/auth/forgotPassword"
              className="text-blue-500 text-sm hover:underline"
            >
              Forgot password?
            </Link>
          </p>
        </div>

        {disableSignup ? (
          <button
            type="submit"
            disabled
            className="w-full bg-gray-500 font-bold text-white py-3"
          >
            Login
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-black font-bold text-white py-3 cursor-pointer hover:bg-gray-900 transition duration-100"
          >
            Login
          </button>
        )}
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
