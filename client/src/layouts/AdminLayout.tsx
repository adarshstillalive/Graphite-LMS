import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import HeaderAuth from '@/components/common/HeaderAuth';
import Footer from '@/components/user/common/Footer';

export const AdminLayout = () => {
  return (
    <>
      <Sidebar />
      <div className="flex">
        <div className="lg:ml-64 xl:ml-74 w-full py-6 px-16 transition-all duration-300 ease-in-out">
          <Outlet />
        </div>
      </div>
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
