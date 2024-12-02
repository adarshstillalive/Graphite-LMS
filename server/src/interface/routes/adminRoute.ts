import express from 'express';
import authController from '../controllers/admin/authController.js';
import instructorController from '../controllers/admin/instructorController.js';
import userAuthMiddleware from '../../infrastructure/middleware/userAuthMiddleware.js';
import tokenControllerAdmin from '../controllers/token/tokenControllerAdmin.js';
import userController from '../controllers/admin/userController.js';

const adminRoute = express.Router();

adminRoute.post('/api/auth/refreshToken', tokenControllerAdmin.refreshTokenApi);

adminRoute.post('/api/auth/requestOtp', authController.requestOtp);
adminRoute.post('/api/auth/login', authController.login);

// instructor
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

adminRoute.get(
  '/api/users',
  userAuthMiddleware.authorization,
  userController.paginatedUsersList,
);

adminRoute.get(
  '/api/instructors',
  userAuthMiddleware.authorization,
  instructorController.paginatedInstructorsList,
);

export default adminRoute;
