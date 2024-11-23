import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import HeaderAuth from './components/common/HeaderAuth';
import Login from './pages/Login';
import Footer from './components/common/Footer';
import Signup from './pages/Signup';
import './app.css';
import { Provider } from 'react-redux';
import store from './redux/store';

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
      {
        path: '/auth/signup',
        element: <Signup />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRoute} />;
    </Provider>
  );
}

export default App;
