import Profile from '@/pages/instructor/Profile';
import PreInstructorProtectedRoute from './protectedRoutes/PreInstructorProtectedRoute';
import {
  InstructorLayout,
  InstructorRequestLayout,
} from '@/layouts/InstructorLayout';
import InstructorProtectedRoute from './protectedRoutes/InstructorProtectedRoute';

import Request from '@/pages/instructor/Request';
import Home from '@/pages/instructor/home/Home';
import Courses from '@/pages/instructor/courses/Courses';
import CreateCourse from '@/pages/instructor/courses/CreateCourse';
import CourseDetail from '@/pages/instructor/courses/CourseDetail';
import EditCourse from '@/pages/instructor/courses/EditCourse';
import Chat from '@/pages/instructor/Chat';

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
      { path: 'courses', element: <Courses /> },
      { path: 'courses/edit/:id', element: <EditCourse /> },
      { path: 'courses/courseDetail/:id', element: <CourseDetail /> },
      { path: 'createCourse', element: <CreateCourse /> },
      { path: 'chat', element: <Chat /> },
    ],
  },
];
export default instructorRoutes;
