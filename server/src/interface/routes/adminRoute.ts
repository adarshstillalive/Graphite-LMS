import express from 'express';
import authController from '../controllers/admin/authController.js';
import instructorController from '../controllers/admin/instructorController.js';
import userAuthMiddleware from '../../infrastructure/middleware/userAuthMiddleware.js';
import tokenControllerAdmin from '../controllers/token/tokenControllerAdmin.js';
import userController from '../controllers/admin/userController.js';
import courseController from '../controllers/admin/courseController.js';
import orderController from '../controllers/admin/orderController.js';

const adminRoute = express.Router();

adminRoute.post('/api/auth/refreshToken', tokenControllerAdmin.refreshTokenApi);

adminRoute.post('/api/auth/requestOtp', authController.requestOtp);
adminRoute.post('/api/auth/login', authController.login);

// instructor

adminRoute.get(
  '/api/instructors',
  userAuthMiddleware.authorization,
  instructorController.paginatedInstructorsList,
);

adminRoute.get(
  '/api/instructors/topInstructors',
  userAuthMiddleware.authorization,
  instructorController.fetchTopInstructors,
);

adminRoute.patch(
  '/api/instructors/:id',
  userAuthMiddleware.authorization,
  instructorController.instructorAction,
);
adminRoute.get(
  '/api/instructor/requests',
  userAuthMiddleware.authorization,
  instructorController.getInstructorRequests,
);

adminRoute.patch(
  '/api/instructor/request/:id/:userId',
  userAuthMiddleware.authorization,
  instructorController.approveInstructorRequest,
);

// User
adminRoute.get(
  '/api/users',
  userAuthMiddleware.authorization,
  userController.paginatedUsersList,
);

adminRoute.patch(
  '/api/users/:id',
  userAuthMiddleware.authorization,
  userController.userAction,
);

// Course

adminRoute.get(
  '/api/course/:id',
  userAuthMiddleware.authorization,
  courseController.fetchCourseById,
);

adminRoute.get(
  '/api/courses',
  userAuthMiddleware.authorization,
  courseController.paginatedAllCourses,
);

adminRoute.get(
  '/api/courses/topCourses',
  userAuthMiddleware.authorization,
  courseController.fetchTopCourses,
);

adminRoute.get(
  '/api/courses/category',
  userAuthMiddleware.authorization,
  courseController.paginatedCategoryList,
);

adminRoute.post(
  '/api/courses/category',
  userAuthMiddleware.authorization,
  courseController.addCategory,
);

adminRoute.put(
  '/api/courses/category/:id',
  userAuthMiddleware.authorization,
  courseController.editCategory,
);

adminRoute.get(
  '/api/courses/requests',
  userAuthMiddleware.authorization,
  courseController.paginatedCourseRequests,
);

adminRoute.get(
  '/api/courses/rejectedRequests',
  userAuthMiddleware.authorization,
  courseController.paginatedRejectedCourseRequests,
);

adminRoute.patch(
  '/api/courses/requests/approve/:id',
  userAuthMiddleware.authorization,
  courseController.approveCourseRequest,
);

adminRoute.patch(
  '/api/courses/requests/reject/:id',
  userAuthMiddleware.authorization,
  courseController.rejectCourseRequest,
);

// Order

adminRoute.get(
  '/api/order/return',
  userAuthMiddleware.authorization,
  orderController.fetchReturnRequests,
);

adminRoute.get(
  '/api/orders',
  userAuthMiddleware.authorization,
  orderController.fetchOrders,
);

adminRoute.patch(
  '/api/order/return/:requestId/:orderId/:userId/:status',
  userAuthMiddleware.authorization,
  orderController.handleReturnRequest,
);

adminRoute.get(
  '/api/listingCounts',
  userAuthMiddleware.authorization,
  orderController.fetchListingCounts,
);

adminRoute.get(
  '/api/orders/chartLine',
  userAuthMiddleware.authorization,
  orderController.fetchOrdersForChartLine,
);

export default adminRoute;
