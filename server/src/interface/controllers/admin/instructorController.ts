import { Request, Response } from 'express';
import { createResponse } from '../../../utils/createResponse.js';
import GetRequests from '../../../application/useCases/admin/getRequests.js';
import MongoAdminRepository from '../../../infrastructure/databases/mongoDB/MongoAdminRepository.js';
import ApproveRequest from '../../../application/useCases/admin/approveRequest.js';

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

export default {
  getInstructorRequests,
  approveInstructorRequest,
};
