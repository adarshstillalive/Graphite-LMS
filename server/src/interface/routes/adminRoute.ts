import express from 'express';
import tokenController from '../controllers/token/tokenController.js';
import authController from '../controllers/admin/authController.js';

const adminRoute = express.Router();

adminRoute.post('/auth/refreshToken', tokenController.refreshToken);

adminRoute.post('/api/auth/requestOtp', authController.requestOtp);
adminRoute.post('/api/auth/login', authController.login);

export default adminRoute;
