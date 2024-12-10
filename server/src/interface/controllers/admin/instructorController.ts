import { Request, Response } from 'express';
import { createResponse } from '../../../utils/createResponse.js';
import MongoAdminInstructorRepository from '../../../infrastructure/databases/mongoDB/admin/MongoAdminInstructorRepository.js';
import InstructorModel from '../../../infrastructure/databases/mongoDB/models/InstructorModel.js';
import MongoGenericRepository from '../../../infrastructure/databases/mongoDB/MongoGenericRepository.js';
import InstructorAccessManagement from '../../../application/useCases/admin/instructor/instructorAccessManagement.js';
import { SortOrder } from 'mongoose';

const adminRepository = new MongoAdminInstructorRepository();
const instructorAccessManagement = new InstructorAccessManagement(
  adminRepository,
);

const getInstructorRequests = async (req: Request, res: Response) => {
  try {
    const requests = await instructorAccessManagement.getRequests();
    if (!requests) {
      res
        .status(200)
        .json(createResponse(false, 'No requests available', requests));
    } else {
      res
        .status(200)
        .json(createResponse(true, 'Requests fetch successful', requests));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const approveInstructorRequest = async (req: Request, res: Response) => {
  try {
    const { id, userId } = req.params;
    const requests = await instructorAccessManagement.approveRequest(
      id,
      userId,
    );
    res
      .status(200)
      .json(createResponse(true, 'Updated successfully', requests));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const paginatedInstructorsList = async (req: Request, res: Response) => {
  try {
    const sort = req.query.sort as string;
    const [[field, order]] = Object.entries(sort);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const filter = req.query.filter
      ? JSON.parse(req.query.filter as string)
      : {};
    const model = InstructorModel;
    const instructorRepository = new MongoGenericRepository(model);

    const result = await instructorRepository.getPaginatedWithPopulatedUserId(
      page,
      limit,
      filter,
      { [field]: Number(order) as SortOrder },
    );

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

const instructorAction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await instructorAccessManagement.handleAccess(id);
    res.status(200).json(createResponse(true, 'Action successful'));
  } catch (error) {
    console.log(error);
    res.status(500).json(createResponse(false, 'Error making action', error));
  }
};

export default {
  getInstructorRequests,
  approveInstructorRequest,
  paginatedInstructorsList,
  instructorAction,
};
