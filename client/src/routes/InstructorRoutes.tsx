import { InstructorLayout } from '../layouts/InstructorLayout';
import Home from '../pages/instructor/Home';

const InstructorRoutes = {
  path: '/instructor',
  children: [
    {
      path: '',
      element: <InstructorLayout />,
      children: [
        {
          path: '',
          element: <Home />,
        },
      ],
    },
  ],
};

export default InstructorRoutes;
