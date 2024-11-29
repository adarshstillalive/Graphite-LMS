import Profile from '@/pages/user/Profile';
import UserProtectedRoute from './protectedRoutes/UserProtectedRoute';
import { UserLayout } from '@/layouts/UserLayout';
import Home from '@/pages/user/Home';

const userRoutes = [
  {
    path: '',
    element: (
      <UserProtectedRoute>
        <UserLayout />
      </UserProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
];
export default userRoutes;
