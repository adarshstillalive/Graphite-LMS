import mongoose from 'mongoose';
import OrderRepository from '../../../../domain/repositories/admin/OrderRepository.js';
import OrderModel from '../models/OrderModel.js';
import ReturnModel from '../models/ReturnRequest.js';
import UserModel from '../models/UserModel.js';
import WalletModel from '../models/Wallet.js';
import {
  ChartLineData,
  Counts,
  GroupCondition,
  MatchCondition,
} from '../../../../application/useCases/admin/order/adminOrderUseCase.js';
import CourseModel from '../models/CourseModel.js';
import InstructorModel from '../models/InstructorModel.js';

class MongoOrderRepository implements OrderRepository {
  async approveReturnRequest(
    requestId: string,
    orderId: string,
    userId: string,
  ): Promise<void> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const requestStatus = await ReturnModel.findByIdAndUpdate(
        requestId,
        { $set: { isApproved: true, isRejected: false } },
        { new: true, session },
      );
      if (!requestStatus) {
        throw new Error('Return request not found for approval.');
      }

      const order = await OrderModel.findById(orderId).session(session);
      if (!order) {
        throw new Error('Order not found for the given ID.');
      }
      order.totalAmount -= requestStatus.price;
      const course = order.courses.find(
        (course) =>
          course.courseId.toString() === requestStatus.itemId.toString(),
      );
      if (!course) {
        throw new Error('Course not found in the order.');
      }
      course.returned = 'Approved';
      await order.save();

      const user = await UserModel.findByIdAndUpdate(
        userId,
        { $pull: { purchasedCourses: course.courseId } },
        { new: true, session },
      );
      if (!user) {
        throw new Error('User not found or update failed.');
      }

      const transaction = {
        type: 'Credit',
        amount: course.price,
        date: new Date(),
      };
      await WalletModel.updateOne(
        { userId },
        {
          $inc: { balance: course.price },
          $push: { transaction: transaction },
        },
        { upsert: true, session },
      );

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      console.error('Error in approving return request: ', error);
      throw new Error('Failed to approve return request.');
    } finally {
      session.endSession();
    }
  }

  async fetchListingCounts(): Promise<Counts> {
    try {
      const [courses, users, instructors, orders] = await Promise.all([
        CourseModel.countDocuments({ isPublished: true }),
        UserModel.countDocuments({ isAdmin: false }),
        InstructorModel.countDocuments(),
        OrderModel.countDocuments(),
      ]);

      return {
        courses,
        users,
        instructors,
        orders,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Mongo Error: Fetching listing counts');
    }
  }

  async fetchOrdersForChartLine(
    matchCondition: MatchCondition,
    groupCondition: GroupCondition,
    limit: number,
  ): Promise<ChartLineData[]> {
    try {
      const orders = await OrderModel.aggregate([
        { $match: matchCondition },
        { $group: groupCondition },
        { $sort: { _id: 1 } },
        { $limit: limit },
      ]);

      const chartData = orders.map((order) => ({
        label: order._id,
        value: order.totalOrders,
      }));

      return chartData;
    } catch (error) {
      console.log(error);
      throw new Error('Mongo Error: Fetching listing counts');
    }
  }
}

export default MongoOrderRepository;
