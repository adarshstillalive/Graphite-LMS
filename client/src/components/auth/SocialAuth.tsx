import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

const SocialAuth = () => {
  return (
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
  );
};

export default SocialAuth;
