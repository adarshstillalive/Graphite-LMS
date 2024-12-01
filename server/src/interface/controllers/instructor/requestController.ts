import { Request, Response } from 'express';
import { createResponse } from '../../../utils/createResponse.js';
import SendRequest from '../../../application/useCases/instructor/sendRequest.js';
import MongoInstructorRepository from '../../../infrastructure/databases/mongoDB/MongoInstructorRepository.js';
import MongoUserRepository from '../../../infrastructure/databases/mongoDB/MongoUserRepository.js';
import { verifyAccessToken } from '../../../utils/jwt.js';

const userRepository = new MongoUserRepository();
const instructorRepository = new MongoInstructorRepository();
const sendRequest = new SendRequest(instructorRepository, userRepository);

const createRequest = async (req: Request, res: Response) => {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      throw new Error('Empty access token');
    }
    const { email } = await verifyAccessToken(accessToken);
    const { expertise, qualifications, additionalInfo } = req.body;
    const requestData = await sendRequest.execute(
      expertise,
      qualifications,
      additionalInfo,
      email,
    );
    res.status(201).json(createResponse(true, 'Request created', requestData));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const instructorDetails = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      throw new Error('DB error: User fetching failed');
    }
    const instructor = await instructorRepository.fetchInstructor(userId);

    res
      .status(200)
      .json(createResponse(true, 'User data fetching successful', instructor));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const getRequest = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      throw new Error('DB error: User fetching failed');
    }
    const requestData = await instructorRepository.fetchRequest(userId);
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
  instructorDetails,
  getRequest,
};
