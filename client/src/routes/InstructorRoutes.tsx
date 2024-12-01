import Profile from '@/pages/instructor/Profile';
import PreInstructorProtectedRoute from './protectedRoutes/PreInstructorProtectedRoute';
import {
  InstructorLayout,
  InstructorRequestLayout,
} from '@/layouts/InstructorLayout';
import InstructorProtectedRoute from './protectedRoutes/InstructorProtectedRoute';
import Home from '@/pages/instructor/Home';
import Request from '@/pages/instructor/Request';

const instructorRoutes = [
  {
    path: 'request',
    element: (
      <PreInstructorProtectedRoute>
        <InstructorRequestLayout />
      </PreInstructorProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <Request />,
      },
    ],
  },
  {
    path: '',
    element: (
      <InstructorProtectedRoute>
        <InstructorLayout />
      </InstructorProtectedRoute>
    ),
    children: [
      { path: '', element: <Home /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
];
export default instructorRoutes;
