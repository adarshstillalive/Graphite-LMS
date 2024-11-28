import { UserAuthLayout, UserLayout } from '@/layouts/UserLayout';
import { InstructorLayout } from '@/layouts/InstructorLayout';
import userAuthRoutes from './userAuthRoutes';
import adminRoutes from './adminRoutes';
import instructorRoutes from './instructorRoutes';
import commonUserRoutes from './commonUserRoutes';
import userRoutes from './userRoutes';
import UserProtectedRoute from './protectedRoutes/UserProtectedRoute';
import InstructorProtectedRoute from './protectedRoutes/InstructorProtectedRoute';

const appRoutes = [
  {
    path: '/',
    element: <UserLayout />,
    children: commonUserRoutes,
  },
  {
    path: '/auth',
    element: <UserAuthLayout />,
    children: userAuthRoutes,
  },
  {
    path: '/user',
    element: (
      <UserProtectedRoute>
        <UserLayout />
      </UserProtectedRoute>
    ),
    children: userRoutes,
  },
  {
    path: '/instructor',
    element: (
      <InstructorProtectedRoute>
        <InstructorLayout />
      </InstructorProtectedRoute>
    ),
    children: instructorRoutes,
  },
  {
    path: '/admin',
    children: adminRoutes,
  },
];

export default appRoutes;
