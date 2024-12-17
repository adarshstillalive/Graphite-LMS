import Profile from '@/pages/user/Profile';
import UserProtectedRoute from './protectedRoutes/UserProtectedRoute';
import { UserLayout } from '@/layouts/UserLayout';
import Home from '@/pages/user/Home';
import CourseDetail from '@/pages/user/CourseDetail';
import Courses from '@/pages/user/Courses';

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
      {
        path: 'courses',
        element: <Courses />,
      },
      {
        path: 'courses/courseDetail/:id',
        element: <CourseDetail />,
      },
    ],
  },
];
export default userRoutes;
