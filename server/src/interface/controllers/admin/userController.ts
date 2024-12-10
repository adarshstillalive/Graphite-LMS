import { Request, Response } from 'express';
import UserModel from '../../../infrastructure/databases/mongoDB/models/UserModel.js';
import MongoGenericRepository from '../../../infrastructure/databases/mongoDB/MongoGenericRepository.js';
import { createResponse } from '../../../utils/createResponse.js';

const paginatedUsersList = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const filter = req.query.filter
      ? JSON.parse(req.query.filter as string)
      : {};
    const model = UserModel;
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
  paginatedUsersList,
};
