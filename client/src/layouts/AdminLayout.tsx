import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';

const AdminLayout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default AdminLayout;
