import { Request, Response } from 'express';
import { createResponse } from '../../../utils/createResponse.js';
import ReturnModel from '../../../infrastructure/databases/mongoDB/models/ReturnRequest.js';
import MongoGenericRepository from '../../../infrastructure/databases/mongoDB/MongoGenericRepository.js';
import { SortOrder } from 'mongoose';
import AdminOrderUseCase from '../../../application/useCases/admin/order/adminOrderUseCase.js';
import MongoOrderRepository from '../../../infrastructure/databases/mongoDB/admin/MongoOrderRepository.js';

const orderRepository = new MongoOrderRepository();
const adminOrderUseCase = new AdminOrderUseCase(orderRepository);

const fetchReturnRequests = async (req: Request, res: Response) => {
  try {
    const sort = req.query.sort as string;
    const [[field, order]] = Object.entries(sort);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 2;
    const filter = req.query.filter
      ? JSON.parse(req.query.filter as string)
      : {};

    const model = ReturnModel;
    const courseRequestRepository = new MongoGenericRepository(model);

    const result = await courseRequestRepository.getPaginatedReturnRequests(
      page,
      limit,
      filter,
      { [field]: Number(order) as SortOrder },
    );

    res
      .status(200)
      .json(createResponse(true, 'Fetching request successfull', result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const handleReturnRequest = async (req: Request, res: Response) => {
  try {
    const { requestId, orderId, userId, status } = req.params;

    await adminOrderUseCase.handleReturnRequest(
      requestId,
      orderId,
      userId,
      status,
    );

    res
      .status(200)
      .json(createResponse(true, 'Handling return request successfull'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

export default {
  fetchReturnRequests,
  handleReturnRequest,
};
