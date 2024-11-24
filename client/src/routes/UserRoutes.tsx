import { UserAuthLayout } from '../layouts/UserLayout';
import Login from '../pages/user/Login';
import Signup from '../pages/user/Signup';

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
  ],
};

export default UserRoutes;
