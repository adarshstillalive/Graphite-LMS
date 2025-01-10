/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRequestData } from '../../../../application/useCases/user/userOrderUseCases.js';
import OrderRepository from '../../../../domain/repositories/user/OrderRepository.js';
import CourseModel from '../models/CourseModel.js';
import CourseProgressModel from '../models/CourseProgress.js';
import OrderModel, { IMongoOrder, IOrder } from '../models/OrderModel.js';
import ReturnModel from '../models/ReturnRequest.js';
import UserModel, { IMongoUser } from '../models/UserModel.js';

class MongoOrderRepository implements OrderRepository {
  async fetchCartItems(userId: string): Promise<IMongoUser> {
    try {
      const userData = await UserModel.findById(userId).populate('cart');
      if (!userData) {
        throw new Error('DB Error: Fetching cart data');
      }
      return userData;
    } catch (error) {
      console.error('Error fetching cart items:', error);
      throw new Error('DB Error: Fetching cart data');
    }
  }

  async orderCreationData(userId: string): Promise<IMongoUser> {
    try {
      const userData = await UserModel.findById(userId).populate('cart');
      if (!userData) {
        throw new Error('DB Error: Fetching order creation data');
      }
      return userData;
    } catch (error) {
      console.error('Error order creation data', error);
      throw new Error('DB Error: order creation data');
    }
  }

  async createOrder(orderData: IOrder): Promise<void> {
    try {
      const order = await OrderModel.create(orderData);
      if (!order) {
        throw new Error('DB Error: order creation');
      }
    } catch (error) {
      console.error('Mongo Error in order creation ', error);
      throw new Error('DB Error: order creation');
    }
  }

  async updateUserWithOrderDetails(
    coursesId: string[],
    userId: string,
  ): Promise<IMongoUser> {
    try {
      const user = await UserModel.findById(userId);
      if (!user || !user.purchasedCourses) {
        throw new Error(
          'DB Error: User not found or purchasedCourses is missing',
        );
      }
      // @ts-expect-error Not populated
      user.purchasedCourses = [...user.purchasedCourses, ...coursesId];
      user.cart = [];

      await user.save();

      return user;
    } catch (error) {
      console.error('Mongo Error in order creation:', error);
      throw new Error('DB Error: Order creation failed');
    }
  }

  async initializeCourseProgress(
    userId: string,
    courseIds: string[],
  ): Promise<void> {
    try {
      const purchasedCourses = await CourseModel.find({
        _id: { $in: courseIds },
      })
        .select('title chapters')
        .lean();
      const progressData = purchasedCourses.map((course) => ({
        userId,
        courseId: course._id,
        // @ts-expect-error Not populated
        chapters: course.chapters.map((chapter: any) => ({
          chapterId: chapter._id,
          episodes: chapter.episodes.map((episode: any) => ({
            episodeId: episode._id,
            progress: 0,
          })),
        })),
        totalProgress: 0,
      }));

      await CourseProgressModel.insertMany(progressData);
      console.log('Course progress initialized successfully');
    } catch (error) {
      console.error('Error initializing course progress:', error);
      throw new Error('Failed to initialize course progress');
    }
  }

  async fetchOrderById(userId: string, orderId: string): Promise<IMongoOrder> {
    try {
      const orderData = await OrderModel.findOne({
        userId,
        _id: orderId,
      }).populate('courses.courseId');
      if (!orderData) {
        throw new Error('DB Error: Order not found');
      }

      return orderData;
    } catch (error) {
      console.error('Mongo Error in order data fetching:', error);
      throw new Error('DB Error: Order fetching failed');
    }
  }

  async returnCourse(formData: IRequestData): Promise<IMongoOrder> {
    try {
      const request = await ReturnModel.create({ ...formData });
      if (!request) {
        throw new Error('DB Error: Failed to create return request');
      }

      const order = await OrderModel.findById(formData.orderId).populate(
        'courses.courseId',
      );
      if (!order) {
        throw new Error('DB Error: Order not found');
      }

      const course = order.courses.find(
        (c) => c.courseId._id.toString() === formData.itemId,
      );

      if (!course) {
        throw new Error('Invalid Item: Course not found in the order');
      }

      course.returned = 'Pending';
      course.returningReason = formData.reason;
      course.returnedDate = new Date();

      await order.save();

      return order;
    } catch (error) {
      console.error('Mongo Error: Request creation failed', error);
      throw new Error('DB Error: Request creation failed');
    }
  }
}

export default MongoOrderRepository;
