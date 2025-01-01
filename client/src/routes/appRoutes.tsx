import { UserAuthLayout } from '@/layouts/UserLayout';
import userAuthRoutes from './userAuthRoutes';
import adminRoutes from './adminRoutes';
import instructorRoutes from './instructorRoutes';
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
    path: '/instructor',
    children: instructorRoutes,
  },
  {
    path: '/admin',
    children: adminRoutes,
  },
];

export default appRoutes;
