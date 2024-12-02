import express from 'express';
import authController from '../controllers/admin/authController.js';
import instructorController from '../controllers/admin/instructorController.js';
import paginationController from '../controllers/common/paginationController.js';

const adminRoute = express.Router();

adminRoute.post('/api/auth/requestOtp', authController.requestOtp);
adminRoute.post('/api/auth/login', authController.login);

// instructor
adminRoute.get(
  '/api/instructor/requests',
  instructorController.getInstructorRequests,
);

adminRoute.patch(
  '/api/instructor/request/:id/:userId',
  instructorController.approveInstructorRequest,
);

adminRoute.get('/api/users', paginationController.paginationApi);

export default adminRoute;
