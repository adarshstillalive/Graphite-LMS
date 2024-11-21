import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import HeaderAuth from './components/common/HeaderAuth';
import Login from './pages/Login';
import Footer from './components/common/Footer';

const AuthLayout = () => {
  return (
    <>
      <HeaderAuth />
      <Outlet />
      <Footer />
    </>
  );
};

const appRoute = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/login',
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRoute} />;
}

export default App;
