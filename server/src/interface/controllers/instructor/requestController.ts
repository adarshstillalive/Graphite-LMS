import { Request, Response } from 'express';
import { createResponse } from '../../../utils/createResponse.js';
import MongoUserRepository from '../../../infrastructure/databases/mongoDB/MongoUserRepository.js';
import InstructorRequestUseCases from '../../../application/useCases/instructor/instructorRequestUseCases.js';
import MongoRequestRepository from '../../../infrastructure/databases/mongoDB/instructor/MongoRequestRepository.js';

const userRepository = new MongoUserRepository();
const requestRepository = new MongoRequestRepository();
const instructorRequestUseCases = new InstructorRequestUseCases(
  requestRepository,
  userRepository,
);

const createRequest = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user?._id);
    if (!userId) {
      throw new Error('Server error');
    }
    const { expertise, qualifications, additionalInfo } = req.body;
    const requestData = await instructorRequestUseCases.sendRequest(
      expertise,
      qualifications,
      additionalInfo,
      userId,
    );
    res.status(201).json(createResponse(true, 'Request created', requestData));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const getRequest = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user?._id);
    if (!userId) {
      throw new Error('DB error: User fetching failed');
    }
    const requestData = await instructorRequestUseCases.getRequest(userId);
    res
      .status(200)
      .json(createResponse(true, 'Request fetching successful', requestData));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

export default {
  createRequest,
  getRequest,
};
