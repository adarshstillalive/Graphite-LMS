import Profile from '@/pages/user/Profile';
import UserProtectedRoute from './protectedRoutes/UserProtectedRoute';
import { UserLayout, UserProfileLayout } from '@/layouts/UserLayout';
import Home from '@/pages/user/Home';
import CourseDetail from '@/pages/user/CourseDetail';
import Courses from '@/pages/user/Courses';
import ChangePassword from '@/pages/user/ChangePassword';

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
        element: <UserProfileLayout />,
        children: [
          {
            path: '',
            element: <Profile />,
          },
          {
            path: 'changePassword',
            element: <ChangePassword />,
          },
        ],
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
