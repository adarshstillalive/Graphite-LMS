import { Request, Response } from 'express';
import { createResponse } from '../../../utils/createResponse.js';
import UserProfileUseCases from '../../../application/useCases/user/userProfileUseCases.js';
import UserUploadService from '../../../infrastructure/cloudinary/userUploadService.js';
import MongoUserProfileRepository from '../../../infrastructure/databases/mongoDB/user/MongoUserProfileRepository.js';
import { UploadedFile } from 'express-fileupload';
import PostgresUserRepository from '../../../infrastructure/databases/postgreSQL/PostgresUserRepository.js';

const userProfileRepository = new MongoUserProfileRepository();
const userAuthRepository = new PostgresUserRepository();
const userUploadService = new UserUploadService();
const userProfileUseCases = new UserProfileUseCases(
  userAuthRepository,
  userProfileRepository,
  userUploadService,
);

const updateProfileData = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      throw new Error('Controller error: User fetching failed');
    }
    const { userFormData } = req.body;
    const user = await userProfileUseCases.updateProfileData(
      userId,
      userFormData,
    );

    res
      .status(200)
      .json(createResponse(true, 'User data updation successful', user));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res
      .status(400)
      .json(
        createResponse(
          false,
          'Controller Error: Updation failed',
          {},
          error?.message,
        ),
      );
  }
};

const updateUserProfilePicture = async (req: Request, res: Response) => {
  try {
    if (!req.files || !req.files.file) {
      throw new Error('Error fetching image');
    }
    const file = req.files.file as UploadedFile;
    const userId = req.user?._id;
    if (!userId) {
      throw new Error('Server error');
    }
    const userData = await userProfileUseCases.updateProfilePicture(
      file,
      userId,
    );

    res
      .status(200)
      .json(createResponse(true, 'Profile picture updated', userData));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const changePassword = async (req: Request, res: Response) => {
  try {
    const { credentials } = req.body;

    const userId = req.user?._id;
    const email = req.user?.email;
    if (!userId || !email) {
      throw new Error('Server error');
    }
    await userProfileUseCases.changePassword(email, userId, credentials);

    res.status(200).json(createResponse(true, 'Password changed'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

export default {
  updateProfileData,
  updateUserProfilePicture,
  changePassword,
};
