import express from 'express';
import authController from '../controllers/user/authController.js';
import tokenController from '../controllers/token/tokenController.js';
import courseController from '../controllers/user/courseController.js';
import userAuthMiddleware from '../../infrastructure/middleware/userAuthMiddleware.js';
import profileController from '../controllers/user/profileController.js';

const userRoute = express.Router();

// Auth

userRoute.post('/api/auth/refreshToken', tokenController.refreshTokenApi);
userRoute.post('/api/auth/requestOtp', authController.requestOtp);
userRoute.post('/api/auth/signup', authController.verifyAndSignup);
userRoute.post('/api/auth/login', authController.login);
userRoute.post(
  '/api/auth/forgotPassword/requestOtp',
  authController.forgotPasswordRequestOtp,
);
userRoute.patch('/api/auth/forgotPassword', authController.updatePassword);

userRoute.post('/auth/google', authController.googleSignIn);

// Profile

userRoute.patch(
  '/api/profile',
  userAuthMiddleware.authorization,
  profileController.updateProfileData,
);
userRoute.post(
  '/api/profile/updateProfilePicture',
  userAuthMiddleware.authorization,
  profileController.updateUserProfilePicture,
);

userRoute.put(
  '/api/profile/changePassword',
  userAuthMiddleware.authorization,
  profileController.changePassword,
);

// Courses

userRoute.get('/api/courses', courseController.fetchPaginatedCourse);
userRoute.get('/api/categories', courseController.fetchCategories);
userRoute.get('/api/course/:id', courseController.fetchCourseById);

export default userRoute;
