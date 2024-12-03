import { UserAuthLayout, UserLayout } from '@/layouts/UserLayout';
import userAuthRoutes from './userAuthRoutes';
import adminRoutes from './adminRoutes';
import instructorRoutes from './instructorRoutes';
import commonUserRoutes from './commonUserRoutes';
import userRoutes from './userRoutes';
import UserAuthProtectedRoute from './protectedRoutes/UserAuthProtectedRoute';

const appRoutes = [
  {
    path: '/',
    children: userRoutes,
  },
  {
    path: '/auth',
    element: (
      <UserAuthProtectedRoute>
        <UserAuthLayout />
      </UserAuthProtectedRoute>
    ),
    children: userAuthRoutes,
  },
  {
    path: '/global',
    element: <UserLayout />,
    children: commonUserRoutes,
  },
  {
    path: '/instructor',
    children: instructorRoutes,
  },
  {
    path: '/admin',
    children: adminRoutes,
  },
];

export default appRoutes;
