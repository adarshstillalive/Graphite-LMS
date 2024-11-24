import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginForm from '../../components/admin/LoginForm';
import { setCurrentAdmin, setToken } from '../../redux/slices/admin/adminSlice';
import { loginUser } from '../../services/admin/loginService';
import HeaderAuth from '../../components/common/HeaderAuth';

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
      dispatch(setCurrentAdmin(user));
      navigate('/admin');
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
    <>
      <HeaderAuth />
      <div className="min-h-full flex justify-center md:flex-row pt-16">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <LoginForm onLogin={login} />
        </div>
        {error && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md shadow-md">
            {error}
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
