import { UserAuthLayout } from '../layouts/UserLayout';
import Login from '../pages/user/Login';
import Signup from '../pages/user/Signup';
import ForgotPassword from '@/pages/user/ForgotPassword';

const UserRoutes = {
  path: '/auth',
  element: <UserAuthLayout />,
  children: [
    {
      path: '/auth/login',
      element: <Login />,
    },
    {
      path: '/auth/signup',
      element: <Signup />,
    },
    {
      path: '/auth/forgotPassword',
      element: <ForgotPassword />,
    },
  ],
};

export default UserRoutes;
