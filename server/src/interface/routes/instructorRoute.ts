import express from 'express';
import requestController from '../controllers/instructor/requestController.js';
import userAuthMiddleware from '../../infrastructure/middleware/userAuthMiddleware.js';
const instructorRoute = express.Router();

instructorRoute.post(
  '/api/request',
  userAuthMiddleware.authorization,
  requestController.createRequest,
);
instructorRoute.get(
  '/api/profile',
  userAuthMiddleware.authorization,
  requestController.instructorDetails,
);
instructorRoute.get(
  '/api/request',
  userAuthMiddleware.authorization,
  requestController.getRequest,
);

export default instructorRoute;
