import { Request, Response } from 'express';
import UserModel from '../../../infrastructure/databases/mongoDB/models/UserModel.js';
import MongoGenericRepository from '../../../infrastructure/databases/mongoDB/MongoGenericRepository.js';
import { createResponse } from '../../../utils/createResponse.js';
import { SortOrder } from 'mongoose';
import UserAccessManagement from '../../../application/useCases/admin/user/userAccessManagement.js';
import MongoAdminUserRepository from '../../../infrastructure/databases/mongoDB/admin/MongoAdminUserRepository.js';

const adminUserRepository = new MongoAdminUserRepository();
const userAccessManagement = new UserAccessManagement(adminUserRepository);

const paginatedUsersList = async (req: Request, res: Response) => {
  try {
    const sort = req.query.sort as string;
    const [[field, order]] = Object.entries(sort);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const filter = req.query.filter
      ? JSON.parse(req.query.filter as string)
      : {};
    const model = UserModel;
    const userRepository = new MongoGenericRepository(model);

    const result = await userRepository.getPaginated(page, limit, filter, {
      [field]: Number(order) as SortOrder,
    });

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

const userAction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedUser = await userAccessManagement.handleAccess(id);
    res
      .status(200)
      .json(createResponse(true, 'Action successful', updatedUser));
  } catch (error) {
    console.log(error);
    res.status(500).json(createResponse(false, 'Error making action', error));
  }
};

export default {
  paginatedUsersList,
  userAction,
};
