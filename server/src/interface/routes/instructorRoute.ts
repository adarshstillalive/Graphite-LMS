import express from 'express';
import requestController from '../controllers/instructor/requestController.js';
import profileController from '../controllers/instructor/profileController.js';
import userAuthMiddleware from '../../infrastructure/middleware/userAuthMiddleware.js';
import courseController from '../controllers/instructor/courseController.js';
import orderController from '../controllers/instructor/orderController.js';
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
  profileController.instructorDetails,
);
instructorRoute.patch(
  '/api/profile',
  userAuthMiddleware.authorization,
  profileController.updateProfileData,
);
instructorRoute.post(
  '/api/profile/updateProfilePicture',
  userAuthMiddleware.authorization,
  profileController.updateInstructorProfilePicture,
);
instructorRoute.get(
  '/api/profile/chat',
  userAuthMiddleware.authorization,
  profileController.fetchInitialChatData,
);

// Course

instructorRoute.get(
  '/api/courses',
  userAuthMiddleware.authorization,
  courseController.fetchCourses,
);

instructorRoute.get(
  '/api/course/:id',
  userAuthMiddleware.authorization,
  courseController.fetchCourseById,
);

instructorRoute.post(
  '/api/course',
  userAuthMiddleware.authorization,
  courseController.createCourse,
);

instructorRoute.put(
  '/api/course/:id',
  userAuthMiddleware.authorization,
  courseController.editCourse,
);

instructorRoute.delete(
  '/api/course/:id',
  userAuthMiddleware.authorization,
  courseController.deleteCourse,
);

instructorRoute.post(
  '/api/thumbnail',
  userAuthMiddleware.authorization,
  courseController.uploadCourseThumbnail,
);

instructorRoute.delete(
  '/api/thumbnail',
  userAuthMiddleware.authorization,
  courseController.removeCourseThumbnail,
);

instructorRoute.patch(
  '/api/publish/:id',
  userAuthMiddleware.authorization,
  courseController.publishAction,
);

instructorRoute.post(
  '/api/videoUrl',
  userAuthMiddleware.authorization,
  courseController.uploadVideoUrl,
);

instructorRoute.get(
  '/api/upload/videoSign',
  userAuthMiddleware.authorization,
  courseController.getvideoSign,
);

instructorRoute.get(
  '/api/categories',
  userAuthMiddleware.authorization,
  courseController.fetchCategories,
);

// Order

instructorRoute.get(
  '/api/orders',
  userAuthMiddleware.authorization,
  orderController.fetchInstructorOrders,
);

export default instructorRoute;
