import OrderRepository from '../../../domain/repositories/user/OrderRepository.js';
import { IOrder } from '../../../infrastructure/databases/mongoDB/models/OrderModel.js';
import {
  capturePayment,
  convert,
  createOrder,
} from '../../../infrastructure/paypal/paypal.js';

export interface IRequestData {
  orderId: string;
  userId: string;
  itemId: string;
  price: string;
  reason: string;
}

function generateOrderId() {
  const timestamp = Date.now();

  const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();

  const orderId = `ORD-${timestamp}-${randomString}`;

  return orderId;
}

class UserOrderUseCases {
  constructor(private orderRepository: OrderRepository) {}

  async paypalCreateOrder(userId: string) {
    try {
      const userData = await this.orderRepository.fetchCartItems(userId);
      if (!userData || !userData.cart) {
        throw new Error('Usecase Error: Cart');
      }
      const cartItems = userData.cart;
      const items = await Promise.all(
        cartItems.map(async (item) => {
          const convertedPrice = await convert(item.price);
          return {
            name: item.title,
            quantity: 1,
            unit_amount: {
              currency_code: 'USD',
              value: convertedPrice.toFixed(2),
            },
          };
        }),
      );

      const approvalUrl = await createOrder(items);
      return approvalUrl;
    } catch (error) {
      console.error('Error in paypalCreateOrder', error);
      throw error;
    }
  }

  async capturePayment(userId: string, orderId: string) {
    try {
      const capturedData = await capturePayment(orderId);
      if (capturedData.status !== 'COMPLETED') {
        throw new Error('Usecase Error: Payment not completed.');
      }

      const populatedUserData =
        await this.orderRepository.orderCreationData(userId);

      if (!populatedUserData || !populatedUserData.cart) {
        throw new Error('Usecase Error: User data or cart is missing.');
      }
      const generatedOrderId = generateOrderId();
      const products = populatedUserData.cart.map((item) => ({
        courseId: String(item._id),
        price: item.price,
      }));

      const order: IOrder = {
        orderId: generatedOrderId,
        userId,
        courses: products,
        totalAmount: products.reduce((acc, curr) => acc + curr.price, 0),
        orderStatus: 'Order Completed',
        paymentMethod: 'Paypal',
      };

      await this.orderRepository.createOrder(order);

      const courseIds = populatedUserData.cart.map((item) => String(item._id));

      const userData = await this.orderRepository.updateUserWithOrderDetails(
        courseIds,
        userId,
      );

      await this.orderRepository.initializeCourseProgress(userId, courseIds);

      return userData;
    } catch (error) {
      console.error('Usecase Error: Capturing payment', error);
      throw new Error('An error occurred while processing the payment.');
    }
  }

  async fetchOrderById(userId: string, orderId: string) {
    try {
      return await this.orderRepository.fetchOrderById(userId, orderId);
    } catch (error) {
      console.error('Usecase Error: Fetching order details', error);
      throw new Error('An error occurred while fwtching the order.');
    }
  }

  async returnCourse(formData: IRequestData) {
    try {
      return await this.orderRepository.returnCourse(formData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase Error: Fetching instructor data', error);

      throw new Error(error);
    }
  }
}

export default UserOrderUseCases;
