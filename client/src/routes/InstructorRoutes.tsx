import Profile from '@/pages/instructor/Profile';
import Home from '../pages/instructor/Home';
import Request from '@/pages/instructor/Request';

const instructorRoutes = [
  {
    path: '',
    element: <Home />,
  },
  {
    path: 'request',
    element: <Request />,
  },
  {
    path: 'profile',
    element: <Profile />,
  },
];
export default instructorRoutes;
