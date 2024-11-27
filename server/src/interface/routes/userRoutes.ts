import express from 'express';
import authController from '../controllers/user/authController.js';
import tokenController from '../controllers/token/tokenController.js';

const userRoute = express.Router();

userRoute.post('/auth/refreshToken', tokenController.refreshToken);

userRoute.post('/api/auth/requestOtp', authController.requestOtp);
userRoute.post('/api/auth/signup', authController.verifyAndSignup);
userRoute.post('/api/auth/login', authController.login);
userRoute.post(
  '/api/auth/forgotPassword/requestOtp',
  authController.forgotPasswordRequestOtp,
);
userRoute.patch('/api/auth/forgotPassword', authController.updatePassword);

userRoute.post('/auth/google', authController.googleSignIn);

export default userRoute;
