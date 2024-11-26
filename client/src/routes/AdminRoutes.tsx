import { Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Login from '../pages/admin/Login';
import Home from '../pages/admin/Home';
import Instructor from '../pages/admin/Instructor';
import AdminProtectedRoute from '../components/admin/AdminProtectedRoute';

const AdminRoutes = {
  path: '/admin',
  children: [
    {
      path: 'login',
      element: <Login />, // No AdminLayout wrapper
    },
    {
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
          element: <Home />,
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
  ],
};

export default AdminRoutes;
