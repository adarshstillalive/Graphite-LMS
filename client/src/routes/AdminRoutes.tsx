import { Navigate } from 'react-router-dom';
import Home from '../pages/admin/Home';
import AdminProtectedRoute from './protectedRoutes/AdminProtectedRoute';
import { AdminAuthLayout, AdminLayout } from '@/layouts/AdminLayout';
import adminAuthRoute from './adminAuthRoute';
import AdminAuthProtectedRoute from './protectedRoutes/AdminAuthProtectedRoute';
import Course from '@/pages/admin/course/Course';
import Users from '@/pages/admin/user/Users';
import Instructor from '@/pages/admin/instructor/Instructor';
import CourseDetail from '@/pages/admin/course/CourseDetail';
import Profile from '@/pages/admin/instructor/Profile';
import UserProfile from '@/pages/admin/user/UserProfile';

const adminRoutes = [
  {
    path: 'login',
    element: (
      <AdminAuthProtectedRoute>
        <AdminAuthLayout />
      </AdminAuthProtectedRoute>
    ),
    children: adminAuthRoute,
  },
  {
    path: '',
    element: (
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Home />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'users/profile',
        element: <UserProfile />,
      },
      {
        path: 'instructors',
        element: <Instructor />,
      },
      {
        path: 'instructors/profile',
        element: <Profile />,
      },
      {
        path: 'courses',
        element: <Course />,
      },
      {
        path: 'courses/courseDetail',
        element: <CourseDetail />,
      },
      {
        path: 'communication',
        element: <Home />,
      },
      {
        path: 'revenue',
        element: <Home />,
      },
      {
        path: 'settings',
        element: <Home />,
      },
    ],
  },
];

export default adminRoutes;
