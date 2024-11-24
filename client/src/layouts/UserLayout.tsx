import { Outlet } from 'react-router-dom';
import HeaderAuth from '../components/user/common/HeaderAuth';
import Footer from '../components/user/common/Footer';

const UserLayout = () => {
  return (
    <>
      <HeaderAuth />
      <Outlet />
      <Footer />
    </>
  );
};

export default UserLayout;
