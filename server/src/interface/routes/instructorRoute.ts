import express from 'express';
import requestController from '../controllers/instructor/requestController.js';
import profileController from '../controllers/instructor/profileController.js';
import userAuthMiddleware from '../../infrastructure/middleware/userAuthMiddleware.js';
import courseController from '../controllers/instructor/courseController.js';
const instructorRoute = express.Router();

instructorRoute.post(
  '/api/request',
  userAuthMiddleware.authorization,
  requestController.createRequest,
);
instructorRoute.get(
  '/api/request',
  userAuthMiddleware.authorization,
  requestController.getRequest,
);
instructorRoute.get(
  '/api/profile',
  userAuthMiddleware.authorization,
  requestController.instructorDetails,
);
instructorRoute.post(
  '/api/profile/updateProfilePicture',
  userAuthMiddleware.authorization,
  profileController.updateInstructorProfilePicture,
);

// Course

instructorRoute.get(
  '/api/courses',
  userAuthMiddleware.authorization,
  courseController.fetchCourses,
);

instructorRoute.post(
  '/api/course',
  userAuthMiddleware.authorization,
  courseController.createCourse,
);

instructorRoute.post(
  '/api/course/videoUrl',
  userAuthMiddleware.authorization,
  courseController.uploadVideoUrl,
);

instructorRoute.get(
  '/api/course/upload/videoSign',
  userAuthMiddleware.authorization,
  courseController.getvideoSign,
);

instructorRoute.get(
  '/api/categories',
  userAuthMiddleware.authorization,
  courseController.fetchCategories,
);

export default instructorRoute;
