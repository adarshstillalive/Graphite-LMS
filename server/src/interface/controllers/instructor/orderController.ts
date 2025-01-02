import { Request, Response } from 'express';
import InstructorOrderUseCase from '../../../application/useCases/instructor/instructorOrderUseCase.js';
import MongoOrderRepository from '../../../infrastructure/databases/mongoDB/instructor/MongoOrderRepository.js';
import { createResponse } from '../../../utils/createResponse.js';

const orderRepository = new MongoOrderRepository();
const instructorOrderUseCase = new InstructorOrderUseCase(orderRepository);

const fetchInstructorOrders = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user?._id);
    if (!userId) {
      throw new Error('Server error');
    }

    const orders = await instructorOrderUseCase.fetchInstructorOrders(userId);

    res
      .status(200)
      .json(createResponse(true, 'Orders fetched successfully', orders));
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(
        createResponse(false, 'Controller Error: Fetching orders', {}, error),
      );
  }
};

export default {
  fetchInstructorOrders,
};
