import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

const LoginForm = () => {
  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 items-center flex flex-col justify-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 text-center">
        Login
      </h1>
      <p className="text-gray-600 mb-8 text-center text-sm md:text-base">
        Welcome back! Please enter your credentials to access your account.
      </p>

      <form className="w-full max-w-sm ">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <p className="">
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

      <div className="mt-8 w-full max-w-sm text-center">
        <p className="text-gray-600 mb-4">Or login with</p>
        <div className="flex justify-center gap-4">
          <button
            className="flex items-center justify-center"
            aria-label="Login with Google"
          >
            <FcGoogle className="text-2xl transition-transform duration-200 hover:scale-125" />
          </button>
          <button
            className="flex items-center justify-center"
            aria-label="Login with Facebook"
          >
            <FaFacebook className="text-2xl text-blue-700 transition-transform duration-200 hover:scale-125" />
          </button>
          <button
            className="flex items-center justify-center"
            aria-label="Login with Twitter"
          >
            <FaXTwitter className="text-2xl transition-transform duration-200 hover:scale-125" />
          </button>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <p>
          Don't have an account?{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
