import express from 'express';
import authController from '../controllers/user/authController.js';
import tokenController from '../controllers/token/tokenController.js';
import courseController from '../controllers/user/courseController.js';
import userAuthMiddleware from '../../infrastructure/middleware/userAuthMiddleware.js';
import profileController from '../controllers/user/profileController.js';
import orderController from '../controllers/user/orderController.js';

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
userRoute.post(
  '/api/profile/wishlist',
  userAuthMiddleware.authorization,
  profileController.addToWishlist,
);
userRoute.delete(
  '/api/profile/wishlist/:id',
  userAuthMiddleware.authorization,
  profileController.removeFromWishlist,
);
userRoute.post(
  '/api/profile/cart',
  userAuthMiddleware.authorization,
  profileController.addToCart,
);
userRoute.delete(
  '/api/profile/cart/:id',
  userAuthMiddleware.authorization,
  profileController.removeFromCart,
);
userRoute.get(
  '/api/profile/courses',
  userAuthMiddleware.authorization,
  profileController.fetchPurchasedCourses,
);
userRoute.patch(
  '/api/profile/courses/progress/:courseId/:chapterId/:episodeId/:progress',
  userAuthMiddleware.authorization,
  profileController.updateCourseProgress,
);
userRoute.get(
  '/api/profile/wallet',
  userAuthMiddleware.authorization,
  profileController.fetchWallet,
);
userRoute.get(
  '/api/profile/progress/:courseId',
  userAuthMiddleware.authorization,
  profileController.fetchProgress,
);
userRoute.get(
  '/api/profile/chat',
  userAuthMiddleware.authorization,
  profileController.fetchInitialChatData,
);
userRoute.post(
  '/api/profile/chat',
  userAuthMiddleware.authorization,
  profileController.setInstructorChat,
);
userRoute.get(
  '/api/profile/chat/message/:chatId',
  userAuthMiddleware.authorization,
  profileController.fetchUserChat,
);

// Courses

userRoute.get('/api/courses', courseController.fetchPaginatedCourse);
userRoute.get(
  '/api/courses/rating',
  courseController.fetchPaginatedCourseSortedByRating,
);
userRoute.get(
  '/api/courses/productpage',
  courseController.fetchPaginatedCourseProductPage,
);
userRoute.get('/api/courses/search', courseController.searchCourses);
userRoute.get('/api/categories', courseController.fetchCategories);
userRoute.get('/api/course/:id', courseController.fetchCourseById);
userRoute.get(
  '/api/course/instructorProfile/:instructorId',
  courseController.fetchInstructor,
);
userRoute.get(
  '/api/course/:courseId/reviews/:userId',
  userAuthMiddleware.authorization,
  courseController.fetchReviewsWithUser,
);
userRoute.get('/api/course/:courseId/reviews', courseController.fetchReviews);
userRoute.put(
  '/api/course/reviews',
  userAuthMiddleware.authorization,
  courseController.addOrUpdateReview,
);
userRoute.get(
  '/api/instructor/:instructorId/reviews/:userId',
  userAuthMiddleware.authorization,
  courseController.fetchInstructorReviewsWithUser,
);
userRoute.get(
  '/api/instructor/:instructorId/reviews',
  courseController.fetchInstructorReviews,
);
userRoute.put(
  '/api/instructor/reviews',
  userAuthMiddleware.authorization,
  courseController.addOrUpdateInstructorReview,
);
// Order

userRoute.post(
  '/api/order/paypal',
  userAuthMiddleware.authorization,
  orderController.paypalCreateOrder,
);
userRoute.get(
  '/api/capturePayment/:orderId',
  userAuthMiddleware.authorization,
  orderController.capturePayment,
);
userRoute.post(
  '/api/order/wallet',
  userAuthMiddleware.authorization,
  orderController.walletCreateOrder,
);
userRoute.get(
  '/api/orders',
  userAuthMiddleware.authorization,
  orderController.getPaginatedUserOrders,
);
userRoute.get(
  '/api/order/:orderId',
  userAuthMiddleware.authorization,
  orderController.fetchOrderById,
);

userRoute.post(
  '/api/order/return',
  userAuthMiddleware.authorization,
  orderController.returnCourse,
);

export default userRoute;
