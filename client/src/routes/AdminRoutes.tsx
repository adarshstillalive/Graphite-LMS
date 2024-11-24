// src/routes/AdminRoutes.tsx
import { Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Login from '../pages/admin/Login';
import Home from '../pages/admin/Home';
import Instructor from '../pages/admin/Instructor';

const AdminRoutes = {
  path: '/admin',
  children: [
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: '',
      element: <AdminLayout />,
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
