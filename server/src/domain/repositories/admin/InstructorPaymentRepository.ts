import { IMongoOrder } from '../../../infrastructure/databases/mongoDB/models/OrderModel.js';

interface InstructorPaymentRepository {
  fetchValidOrders(): Promise<IMongoOrder[]>;
  updatePayment(
    courseId: string,
    orderId: string,
    creditAmount: number,
    totalAmount: number,
  ): Promise<void>;
}

export default InstructorPaymentRepository;
