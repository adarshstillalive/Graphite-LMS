import Profile from '@/pages/user/Profile';
import UserProtectedRoute from './protectedRoutes/UserProtectedRoute';
import { UserLayout, UserProfileLayout } from '@/layouts/UserLayout';
import Home from '@/pages/user/Home';
import Courses from '@/pages/user/Courses';
import ChangePassword from '@/pages/user/ChangePassword';
import Wishlist from '@/pages/user/Wishlist';
import Cart from '@/pages/user/Cart';
import Checkout from '@/pages/user/Checkout';
import Order from '@/pages/user/Order';
import InstructorProfile from '@/pages/user/InstructorProfile';
import OrderDetail from '@/pages/user/OrderDetail';
import CoursePage from '@/pages/user/CoursePage';
import PurchasedCourses from '@/pages/user/PurchasedCourses';

const userRoutes = [
  {
    path: '',
    element: (
      <UserProtectedRoute>
        <UserLayout />
      </UserProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'profile',
        element: <UserProfileLayout />,
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
        ],
      },
      {
        path: 'courses',
        element: <Courses />,
      },
      {
        path: 'courses/courseDetail/:id',
        element: <CoursePage />,
      },
      {
        path: 'courses/courseDetail/instructorProfile/:instructorId',
        element: <InstructorProfile />,
      },
    ],
  },
];
export default userRoutes;
