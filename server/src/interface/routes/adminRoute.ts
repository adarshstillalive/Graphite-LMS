import express from 'express';
import authController from '../controllers/admin/authController.js';
import instructorController from '../controllers/admin/instructorController.js';

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

export default adminRoute;
