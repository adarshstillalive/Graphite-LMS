import { Outlet } from 'react-router-dom';
import Footer from '../components/user/common/Footer';
import Header from '../components/user/common/Header';
import HeaderAuth from '../components/common/HeaderAuth';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from '@/components/user/profile/AppSidebar';

export const UserLayout = () => {
  return (
    <>
      <Header />
      <main className="py-16">
        <Outlet />
      </main>
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

export const UserProfileLayout = () => {
  return (
    <>
      <Header />
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1">
          <SidebarTrigger className="fixed opacity-40 hover:opacity-100" />
          <div className="py-24 px-8">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </>
  );
};
