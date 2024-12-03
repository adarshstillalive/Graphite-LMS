import express from 'express';
import authController from '../controllers/admin/authController.js';
import instructorController from '../controllers/admin/instructorController.js';
import userAuthMiddleware from '../../infrastructure/middleware/userAuthMiddleware.js';
import tokenControllerAdmin from '../controllers/token/tokenControllerAdmin.js';
import userController from '../controllers/admin/userController.js';
import courseController from '../controllers/admin/courseController.js';

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

// Course
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

export default adminRoute;
