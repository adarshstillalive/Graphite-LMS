import Footer from '../components/user/common/Footer';
import Header from '../components/user/common/Header';
import Home from '../pages/user/Home';
import AdminRoutes from './AdminRoutes';
import InstructorRoutes from './InstructorRoutes';
import UserRoutes from './UserRoutes';

const appRoutes = [
  {
    path: '/',
    element: (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    ),
  },
  UserRoutes,
  AdminRoutes,
  InstructorRoutes,
];

export default appRoutes;
