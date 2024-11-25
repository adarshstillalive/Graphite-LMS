import { Outlet } from 'react-router-dom';
import Header from '../components/user/common/Header';
import Footer from '../components/user/common/Footer';

export const InstructorLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
