import { IOrder } from '../../../infrastructure/databases/mongoDB/models/OrderModel.js';
import { IMongoUser } from '../../../infrastructure/databases/mongoDB/models/UserModel.js';

interface OrderRepository {
  fetchCartItems(userId: string): Promise<IMongoUser>;
  orderCreationData(userId: string): Promise<IMongoUser>;
  createOrder(orderData: IOrder): Promise<void>;
  updateUserWithOrderDetails(
    coursesId: string[],
    userId: string,
  ): Promise<IMongoUser>;
}

export default OrderRepository;
