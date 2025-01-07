import Profile from '@/pages/user/Profile';
import UserProtectedRoute from './protectedRoutes/UserProtectedRoute';
import { UserLayout, UserProfileLayout } from '@/layouts/UserLayout';
import ChangePassword from '@/pages/user/ChangePassword';
import Wishlist from '@/pages/user/Wishlist';
import Cart from '@/pages/user/Cart';
import Checkout from '@/pages/user/Checkout';
import Order from '@/pages/user/Order';
import OrderDetail from '@/pages/user/OrderDetail';
import PurchasedCourses from '@/pages/user/PurchasedCourses';
import Wallet from '@/pages/user/Wallet';
import commonUserRoutes from './commonUserRoutes';
import Chat from '@/pages/user/Chat';

const userRoutes = [
  {
    path: '',
    element: <UserLayout />,
    children: commonUserRoutes,
  },
  {
    path: 'profile',
    element: (
      <UserProtectedRoute>
        <UserProfileLayout />
      </UserProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <Profile />,
      },
      {
        path: 'wishlist',
        element: <Wishlist />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'cart/checkout',
        element: <Checkout />,
      },
      {
        path: 'changePassword',
        element: <ChangePassword />,
      },
      {
        path: 'orders',
        element: <Order />,
      },
      {
        path: 'orders/orderDetail/:orderId',
        element: <OrderDetail />,
      },
      {
        path: 'courses',
        element: <PurchasedCourses />,
      },
      {
        path: 'wallet',
        element: <Wallet />,
      },
      {
        path: 'chat',
        element: <Chat />,
      },
    ],
  },
];
export default userRoutes;
