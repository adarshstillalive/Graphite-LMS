import express from 'express';
import requestController from '../controllers/instructor/requestController.js';
const instructorRoute = express.Router();

instructorRoute.post('/api/request', requestController.sendRequest);

export default instructorRoute;
