import { UserLayout } from '@/layouts/UserLayout';
import Home from '@/pages/user/Home';

const commonUserRoutes = [
  {
    path: '',
    element: <UserLayout />,
    children: [{ path: '', element: <Home /> }],
  },
];

export default commonUserRoutes;
