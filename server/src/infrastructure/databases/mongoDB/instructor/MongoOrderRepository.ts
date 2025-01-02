import mongoose from 'mongoose';
import OrderRepository from '../../../../domain/repositories/instructor/OrderRepository.js';
import OrderModel, { IMongoOrder } from '../models/OrderModel.js';

class MongoOrderRepository implements OrderRepository {
  async fetchInstructorOrders(instructorId: string): Promise<IMongoOrder[]> {
    try {
      const orders = await OrderModel.aggregate([
        {
          $unwind: '$courses',
        },
        {
          $lookup: {
            from: 'courses',
            localField: 'courses.courseId',
            foreignField: '_id',
            as: 'courseDetails',
          },
        },
        {
          $unwind: '$courseDetails',
        },
        {
          $match: {
            'courseDetails.instructorId': new mongoose.Types.ObjectId(
              instructorId,
            ),
          },
        },
        {
          $group: {
            _id: '$_id',
            orderId: { $first: '$orderId' },
            userId: { $first: '$userId' },
            courses: { $push: '$courseDetails' }, // Replace courses with populated course details
            totalAmount: { $first: '$totalAmount' },
            orderStatus: { $first: '$orderStatus' },
            paymentMethod: { $first: '$paymentMethod' },
            isInstructorPaymentCompleted: {
              $first: '$isInstructorPaymentCompleted',
            },
            createdAt: { $first: '$createdAt' },
          },
        },
        // Populate userId directly
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userId',
          },
        },
        {
          $unwind: { path: '$userId', preserveNullAndEmptyArrays: true },
        },
      ]);

      return orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw new Error('Unable to fetch orders');
    }
  }
}

export default MongoOrderRepository;
