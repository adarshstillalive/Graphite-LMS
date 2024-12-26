import { IRequestData } from '../../../application/useCases/user/userOrderUseCases.js';
import {
  IMongoOrder,
  IOrder,
} from '../../../infrastructure/databases/mongoDB/models/OrderModel.js';
import { IMongoUser } from '../../../infrastructure/databases/mongoDB/models/UserModel.js';

interface OrderRepository {
  fetchCartItems(userId: string): Promise<IMongoUser>;
  orderCreationData(userId: string): Promise<IMongoUser>;
  createOrder(orderData: IOrder): Promise<void>;
  updateUserWithOrderDetails(
    coursesId: string[],
    userId: string,
  ): Promise<IMongoUser>;
  initializeCourseProgress(userId: string, courseIds: string[]): Promise<void>;
  fetchOrderById(userId: string, orderId: string): Promise<IMongoOrder>;
  returnCourse(formData: IRequestData): Promise<IMongoOrder>;
}

export default OrderRepository;
