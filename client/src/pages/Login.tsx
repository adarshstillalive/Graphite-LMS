import { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import { loginUser } from '../services/user/loginService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentUser, setToken } from '../redux/slices/userSlice';
import axios from 'axios';

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (data: LoginData) => {
    try {
      const res = await loginUser(data);
      if (!res.success) {
        setError(res.message || 'Login failed');
        return;
      }

      const { user, accessToken } = res.data;
      dispatch(setToken(accessToken));
      dispatch(setCurrentUser(user));
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { message } = error.response.data;
        setError(message);
        console.error(message);
      } else {
        console.error('An unexpected error occurred:', error);
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
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
      {error && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md shadow-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default Login;
