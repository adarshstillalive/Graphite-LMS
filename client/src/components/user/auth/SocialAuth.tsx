import { GoogleLogin } from '@react-oauth/google';
import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { googleAuth } from '../../../services/user/loginService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setCurrentUser,
  setIsInstructor,
  setToken,
} from '../../../redux/slices/user/userSlice';
import { setRole } from '@/redux/slices/user/appSlice';

const SocialAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleGoogleSuccess = async (response: any) => {
    const res = await googleAuth(response.credential);
    const { user, accessToken } = res.data;
    dispatch(setToken(accessToken));
    dispatch(setCurrentUser(user));
    dispatch(setIsInstructor(user.isInstructor));
    dispatch(setRole('user'));
    navigate('/');
    console.log('Google sign-in success:', res);
  };

  const handleGoogleError = () => {
    console.error('Google sign-in error');
  };
  return (
    <div className="mt-8 w-full max-w-sm text-center">
      <p className="text-gray-600 mb-4">Or login with</p>
      <div className="flex justify-center gap-4">
        <div className="relative">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap={false}
            theme="outline"
            shape="square"
            type="icon"
            // disabled={isLoading}
          />
          {/* {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
              <div className="w-5 h-5 border-t-2 border-blue-500 rounded-full animate-spin" />
            </div>
          )} */}
        </div>
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
