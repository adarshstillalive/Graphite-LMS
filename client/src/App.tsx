import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import HeaderAuth from './components/common/HeaderAuth';
import Login from './pages/Login';
import Footer from './components/common/Footer';
import Signup from './pages/Signup';
import './app.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './pages/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';

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
    element: <Home />,
  },
  {
    path: '/auth',
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
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <RouterProvider router={appRoute} />;
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
