import { Outlet } from 'react-router-dom';
import Header from '../components/user/common/Header';
import Footer from '../components/user/common/Footer';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from '@/components/instructor/common/AppSidebar';

export const InstructorRequestLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const InstructorLayout = () => {
  return (
    <>
      <Header />
      <SidebarProvider>
        <AppSidebar />
        <main className="py-16 flex-1">
          <SidebarTrigger className="fixed opacity-40 hover:opacity-100" />
          <div className="py-8 px-8">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </>
  );
};
