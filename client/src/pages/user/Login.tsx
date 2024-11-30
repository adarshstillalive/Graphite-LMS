import LoginForm from '../../components/user/auth/LoginForm';
import { loginUser } from '../../services/user/loginService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setCurrentUser,
  setIsInstructor,
  setIsLoading,
  setToken,
} from '../../redux/slices/user/userSlice';
import axios from 'axios';
import HeaderAuth from '../../components/common/HeaderAuth';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { setRole } from '@/redux/slices/user/appSlice';

export interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (data: LoginData) => {
    try {
      const res = await loginUser(data);

      const { user, accessToken } = res.data;

      dispatch(setToken(accessToken));
      dispatch(setCurrentUser(user));
      dispatch(setIsInstructor(user.isInstructor));
      dispatch(setRole('user'));
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { message } = error.response.data;
        toast({
          variant: 'destructive',
          description: message || 'Login failed',
        });
        console.error(message);
      } else {
        console.error('An unexpected error occurred:', error);
        toast({
          variant: 'destructive',
          description: 'An unexpected error occurred.',
        });
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <>
      <HeaderAuth />
      <Toaster />
      <div className="min-h-full flex flex-col md:flex-row pt-16">
        <div className="hidden md:flex w-full md:w-1/2 items-center justify-center p-4 md:p-8 lg:p-16">
          <img
            alt="Login ad"
            src="/display/auth_login.png"
            className="md:max-h-96-full max-w-full object-contain"
          />
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center">
          <LoginForm onLogin={login} />
        </div>
      </div>
    </>
  );
};

export default Login;
