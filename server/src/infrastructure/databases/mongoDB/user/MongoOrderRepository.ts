import OrderRepository from '../../../../domain/repositories/user/OrderRepository.js';
import OrderModel, { IOrder } from '../models/OrderModel.js';
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

      user.purchasedCourses = [...user.purchasedCourses, ...coursesId];
      user.cart = [];

      await user.save();

      return user;
    } catch (error) {
      console.error('Mongo Error in order creation:', error);
      throw new Error('DB Error: Order creation failed');
    }
  }
}

export default MongoOrderRepository;
