import express from 'express';
import authController from '../controllers/user/authController.js';

const userRoute = express.Router();

userRoute.post('/api/auth/requestOtp', authController.requestOtp);
userRoute.post('/api/auth/signup', authController.verifyAndSignup);

export default userRoute;
