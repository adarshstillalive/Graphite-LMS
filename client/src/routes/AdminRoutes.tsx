import { Navigate } from 'react-router-dom';
import Home from '../pages/admin/Home';
import AdminProtectedRoute from './protectedRoutes/AdminProtectedRoute';
import { AdminAuthLayout, AdminLayout } from '@/layouts/AdminLayout';
import adminAuthRoute from './adminAuthRoute';
import Users from '@/pages/admin/Users';
import Instructor from '@/pages/admin/instructor/Instructor';

const adminRoutes = [
  {
    path: 'login',
    element: <AdminAuthLayout />,
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
        path: 'instructors',
        element: <Instructor />,
      },
      {
        path: 'courses',
        element: <Home />,
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
