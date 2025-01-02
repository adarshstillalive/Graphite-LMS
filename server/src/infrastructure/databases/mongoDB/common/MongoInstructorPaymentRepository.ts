import mongoose from 'mongoose';
import InstructorPaymentRepository from '../../../../domain/repositories/admin/InstructorPaymentRepository.js';
import OrderModel, { IMongoOrder } from '../models/OrderModel.js';
import WalletModel from '../models/Wallet.js';
import InstructorPaymentLogModel from '../models/InstructorPaymentLogModel.js';
import CourseModel from '../models/CourseModel.js';

class MongoInstructorPaymentRepository implements InstructorPaymentRepository {
  async fetchValidOrders(): Promise<IMongoOrder[]> {
    try {
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const orders = await OrderModel.find({
        createdAt: { $lte: sevenDaysAgo },
        isInstructorPaymentCompleted: false,
      });

      return orders;
    } catch (error) {
      console.log(error);
      throw new Error('Mongo Error: Fetching valid orders');
    }
  }

  async updatePayment(
    courseId: string,
    orderId: string,
    creditAmount: number,
    totalAmount: number,
  ): Promise<void> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const course = await CourseModel.findById(courseId, null, {
        session,
      }).populate('instructorId');

      if (!course || !course.instructorId) {
        throw new Error(
          `Course or instructor not found for courseId: ${courseId}`,
        );
      }

      const instructorId = course.instructorId.instructorId;
      const userId = course.instructorId._id;

      if (!userId) {
        throw new Error(`User ID not found for instructor: ${instructorId}`);
      }

      const transaction = {
        type: 'Credit',
        amount: creditAmount,
        date: new Date(),
      };

      await WalletModel.updateOne(
        { userId },
        {
          $inc: { balance: creditAmount },
          $push: { transaction },
        },
        { session },
      );

      const log = {
        instructorId,
        orderId,
        totalAmount,
        creditedAmount: creditAmount,
        status: 'Success',
      };

      await InstructorPaymentLogModel.create([log], { session });

      await OrderModel.updateOne(
        { _id: orderId },
        { $set: { isInstructorPaymentCompleted: true } },
        { session },
      );

      await session.commitTransaction();
      console.log(`Payment successfully updated for order: ${orderId}`);
    } catch (error) {
      await session.abortTransaction();
      console.error(
        `Error updating payment for courseId: ${courseId}, orderId: ${orderId}`,
        error,
      );
      throw new Error(`Mongo Error: Updating payment - ${error}`);
    } finally {
      session.endSession();
    }
  }
}

export default MongoInstructorPaymentRepository;
