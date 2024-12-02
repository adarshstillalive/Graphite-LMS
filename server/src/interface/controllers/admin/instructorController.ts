import { Request, Response } from 'express';
import { createResponse } from '../../../utils/createResponse.js';
import GetRequests from '../../../application/useCases/admin/getRequests.js';
import MongoAdminRepository from '../../../infrastructure/databases/mongoDB/MongoAdminRepository.js';
import ApproveRequest from '../../../application/useCases/admin/approveRequest.js';
import InstructorModel from '../../../infrastructure/databases/mongoDB/models/InstructorModel.js';
import MongoGenericRepository from '../../../infrastructure/databases/mongoDB/MongoGenericRepository.js';

const adminRepository = new MongoAdminRepository();
const getRequests = new GetRequests(adminRepository);
const approveRequest = new ApproveRequest(adminRepository);

const getInstructorRequests = async (req: Request, res: Response) => {
  try {
    const requests = await getRequests.execute();
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
    const requests = await approveRequest.execute(id, userId);
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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const filter = req.query.filter
      ? JSON.parse(req.query.filter as string)
      : {};
    const model = InstructorModel;
    const instructorRepository = new MongoGenericRepository(model);

    const result = await instructorRepository.getPaginatedInstructor(
      page,
      limit,
      filter,
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

export default {
  getInstructorRequests,
  approveInstructorRequest,
  paginatedInstructorsList,
};
