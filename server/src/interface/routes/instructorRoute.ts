import express from 'express';
import requestController from '../controllers/instructor/requestController.js';
const instructorRoute = express.Router();

instructorRoute.post('/api/request', requestController.createRequest);
instructorRoute.get('/api/user', requestController.userDetails);
instructorRoute.get('/api/request', requestController.getRequest);

export default instructorRoute;
