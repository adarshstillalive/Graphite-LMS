import Login from '../pages/user/Login';
import Signup from '../pages/user/Signup';
import ForgotPassword from '@/pages/user/ForgotPassword';

const userAuthRoutes = [
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <Signup />,
  },
  {
    path: 'forgotPassword',
    element: <ForgotPassword />,
  },
];

export default userAuthRoutes;
