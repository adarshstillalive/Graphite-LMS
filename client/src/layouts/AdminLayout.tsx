import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import HeaderAuth from '@/components/common/HeaderAuth';
import Footer from '@/components/user/common/Footer';

export const AdminLayout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export const AdminAuthLayout = () => {
  return (
    <>
      <HeaderAuth />
      <Outlet />
      <Footer />
    </>
  );
};
