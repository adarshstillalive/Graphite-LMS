import mongoose from 'mongoose';
import OrderRepository from '../../../../domain/repositories/admin/OrderRepository.js';
import OrderModel from '../models/OrderModel.js';
import ReturnModel from '../models/ReturnRequest.js';
import UserModel from '../models/UserModel.js';
import WalletModel from '../models/Wallet.js';

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
}

export default MongoOrderRepository;
