import { Request, Response } from 'express';
import UserOrderUseCases from '../../../application/useCases/user/userOrderUseCases.js';
import MongoOrderRepository from '../../../infrastructure/databases/mongoDB/user/MongoOrderRepository.js';
import { createResponse } from '../../../utils/createResponse.js';

const orderRepository = new MongoOrderRepository();
const userOrderUseCases = new UserOrderUseCases(orderRepository);

const paypalCreateOrder = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user?._id);
    if (!userId) {
      throw new Error('Server error');
    }
    const url = await userOrderUseCases.paypalCreateOrder(userId);
    res
      .status(200)
      .json(createResponse(true, 'Url generated successfully', url));
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(createResponse(false, 'Controller Error: Paypal', {}, error));
  }
};

const capturePayment = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const userId = String(req.user?._id);
    if (!userId) {
      throw new Error('Server error');
    }
    const userData = await userOrderUseCases.capturePayment(userId, orderId);
    req.user = userData;
    res.status(200).json(createResponse(true, 'Order created successfully'));
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(createResponse(false, 'Controller Error: Paypal', {}, error));
  }
};

export default { paypalCreateOrder, capturePayment };
