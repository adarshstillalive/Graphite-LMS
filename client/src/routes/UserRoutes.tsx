import Profile from '@/pages/user/Profile';
import Home from '@/pages/user/Home';

const userRoutes = [
  {
    path: '',
    element: <Home />,
  },
  {
    path: 'profile',
    element: <Profile />,
  },
];
export default userRoutes;
