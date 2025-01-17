import { Request, Response } from 'express';
import UserOrderUseCases from '../../../application/useCases/user/userOrderUseCases.js';
import MongoOrderRepository from '../../../infrastructure/databases/mongoDB/user/MongoOrderRepository.js';
import { createResponse } from '../../../utils/createResponse.js';
import OrderModel from '../../../infrastructure/databases/mongoDB/models/OrderModel.js';
import MongoGenericRepository from '../../../infrastructure/databases/mongoDB/MongoGenericRepository.js';
import { SortOrder } from 'mongoose';
import MongoUserProfileRepository from '../../../infrastructure/databases/mongoDB/user/MongoUserProfileRepository.js';

const orderRepository = new MongoOrderRepository();
const userProfileRepository = new MongoUserProfileRepository();
const userOrderUseCases = new UserOrderUseCases(
  orderRepository,
  userProfileRepository,
);

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

const walletCreateOrder = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user?._id);
    if (!userId) {
      throw new Error('Server error');
    }
    const userData = await userOrderUseCases.walletCreateOrder(userId);
    req.user = userData;
    res.status(200).json(createResponse(true, 'Order created successfully'));
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(createResponse(false, 'Controller Error: Paypal', {}, error));
  }
};

const getPaginatedUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user?._id);
    if (!userId) {
      throw new Error('Server error');
    }

    const filter = req.query.filter
      ? JSON.parse(req.query.filter as string)
      : {};

    const sort = req.query.sort as string;
    const [[field, order]] = Object.entries(sort);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const model = OrderModel;
    const orderRepository = new MongoGenericRepository(model);

    const result = await orderRepository.getPaginatedOrders(
      userId,
      page,
      limit,
      filter,
      { [field]: Number(order) as SortOrder },
    );
    res
      .status(200)
      .json(createResponse(true, 'Order fetched successfully', result));
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(
        createResponse(false, 'Controller Error: Orders fetching', {}, error),
      );
  }
};

const fetchOrderById = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user?._id);
    if (!userId) {
      throw new Error('Server error');
    }
    const { orderId } = req.params;

    const orderDetails = await orderRepository.fetchOrderById(userId, orderId);
    res
      .status(200)
      .json(createResponse(true, 'Order fetched successfully', orderDetails));
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(
        createResponse(false, 'Controller Error: Orders fetching', {}, error),
      );
  }
};

const returnCourse = async (req: Request, res: Response) => {
  try {
    const { formData } = req.body;
    console.log(formData);

    const orderData = await userOrderUseCases.returnCourse(formData);

    res
      .status(200)
      .json(createResponse(true, 'Return request submitted', orderData));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res
      .status(400)
      .json(
        createResponse(
          false,
          'Controller Error: Request submission failed',
          {},
          error?.message,
        ),
      );
  }
};

export default {
  paypalCreateOrder,
  capturePayment,
  walletCreateOrder,
  getPaginatedUserOrders,
  fetchOrderById,
  returnCourse,
};
