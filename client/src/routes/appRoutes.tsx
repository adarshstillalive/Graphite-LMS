import Home from '../pages/user/Home';
import UserRoutes from './UserRoutes';

const appRoutes = [
  {
    path: '/',
    element: <Home />,
  },
  UserRoutes,
];

export default appRoutes;
