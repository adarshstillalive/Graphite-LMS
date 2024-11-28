import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginForm from '../../components/admin/LoginForm';
import { setCurrentAdmin, setToken } from '../../redux/slices/admin/adminSlice';
import { loginUser } from '../../services/admin/loginService';
import HeaderAuth from '../../components/common/HeaderAuth';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

interface LoginData {
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
      dispatch(setCurrentAdmin(user));
      navigate('/admin');
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
    }
  };

  return (
    <>
      <HeaderAuth />
      <Toaster />
      <div className="flex-col min-h-screen  flex justify-center md:flex-row pt-16">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <LoginForm onLogin={login} />
        </div>
      </div>
    </>
  );
};

export default Login;
