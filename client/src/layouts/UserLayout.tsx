import { Outlet } from 'react-router-dom';
import Footer from '../components/user/common/Footer';
import Header from '../components/user/common/Header';
import HeaderAuth from '../components/common/HeaderAuth';

export const UserLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export const UserAuthLayout = () => {
  return (
    <>
      <HeaderAuth />
      <Outlet />
      <Footer />
    </>
  );
};
