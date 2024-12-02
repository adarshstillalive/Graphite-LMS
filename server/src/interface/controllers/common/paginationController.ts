import { Request, Response } from 'express';
import MongoGenericRepository from '../../../infrastructure/databases/mongoDB/MongoGenericRepository.js';
import getModelByType from '../../../utils/getModelByType.js';
import { createResponse } from '../../../utils/createResponse.js';

const paginationApi = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    console.log(req.query.type);

    const model = getModelByType(String(req.query.type));
    const filter = req.query.filter
      ? JSON.parse(req.query.filter as string)
      : {};
    if (!model) {
      throw new Error('invalid request');
    }
    const userRepository = new MongoGenericRepository(model);

    const result = await userRepository.getPaginated(page, limit, filter);

    res
      .status(200)
      .json(createResponse(true, 'Page generation success', result));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(createResponse(false, 'Error fetching paginated data', error));
  }
};

export default {
  paginationApi,
};
