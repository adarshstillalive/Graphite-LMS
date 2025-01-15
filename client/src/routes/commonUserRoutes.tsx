import CoursePage from '@/pages/user/CoursePage';
import Courses from '@/pages/user/Courses';
import Home from '@/pages/user/Home';
import InstructorProfile from '@/pages/user/InstructorProfile';

const commonUserRoutes = [
  {
    path: '',
    element: <Home />,
  },
  {
    path: 'courses',
    element: <Courses />,
  },
  {
    path: 'courses/courseDetail/:id/:isCreated',
    element: <CoursePage />,
  },
  {
    path: 'courses/courseDetail/instructorProfile/:instructorId',
    element: <InstructorProfile />,
  },
];

export default commonUserRoutes;
