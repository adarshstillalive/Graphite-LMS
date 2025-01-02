import { IMongoOrder } from '../../../infrastructure/databases/mongoDB/models/OrderModel.js';

interface OrderRepository {
  fetchInstructorOrders(instructorId: string): Promise<IMongoOrder[]>;
}

export default OrderRepository;
