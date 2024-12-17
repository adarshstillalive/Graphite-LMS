import express from 'express';
import authController from '../controllers/user/authController.js';
import tokenController from '../controllers/token/tokenController.js';
import courseController from '../controllers/user/courseController.js';

const userRoute = express.Router();

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

// Courses

userRoute.get('/api/courses', courseController.fetchPaginatedCourse);
userRoute.get('/api/categories', courseController.fetchCategories);
userRoute.get('/api/course/:id', courseController.fetchCourseById);

export default userRoute;
