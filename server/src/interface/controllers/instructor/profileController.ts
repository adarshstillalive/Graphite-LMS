import { Request, Response } from 'express';
import { createResponse } from '../../../utils/createResponse.js';
import { UploadedFile } from 'express-fileupload';
import InstructorUploadService from '../../../infrastructure/cloudinary/InstructorUploadService.js';
import InstructorProfileUseCases from '../../../application/useCases/instructor/instructorProfileUseCases.js';
import MongoInstructorProfileRepository from '../../../infrastructure/databases/mongoDB/instructor/MongoInstructorProfileRepository.js';

const instructorProfileRepository = new MongoInstructorProfileRepository();
const instructorUploadService = new InstructorUploadService();
const instructorProfileUseCases = new InstructorProfileUseCases(
  instructorProfileRepository,
  instructorUploadService,
);

const instructorDetails = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user?._id);
    if (!userId) {
      throw new Error('Controller error: User fetching failed');
    }
    const instructor = await instructorProfileUseCases.fetchInstructor(userId);

    res
      .status(200)
      .json(createResponse(true, 'User data fetching successful', instructor));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const updateProfileData = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user?._id);
    if (!userId) {
      throw new Error('Controller error: User fetching failed');
    }
    const { userFormData, instructorFormData } = req.body;
    const instructor = await instructorProfileUseCases.updateProfileData(
      userId,
      userFormData,
      instructorFormData,
    );

    res
      .status(200)
      .json(createResponse(true, 'User data updation successful', instructor));
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

const updateInstructorProfilePicture = async (req: Request, res: Response) => {
  try {
    if (!req.files || !req.files.file) {
      throw new Error('Error fetching image');
    }
    const file = req.files.file as UploadedFile;
    const userId = String(req.user?._id);
    if (!userId) {
      throw new Error('Server error');
    }
    const instructorData = await instructorProfileUseCases.updateProfilePicture(
      file,
      userId,
    );

    res
      .status(200)
      .json(createResponse(true, 'Profile picture updated', instructorData));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const fetchInitialChatData = async (req: Request, res: Response) => {
  try {
    const instructorId = String(req.user?.instructorId);
    if (!instructorId) {
      throw new Error('Server error');
    }
    const result =
      await instructorProfileUseCases.fetchInitialChatData(instructorId);
    res
      .status(200)
      .json(createResponse(true, 'Initial data fetching successfull', result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

export default {
  instructorDetails,
  updateInstructorProfilePicture,
  updateProfileData,
  fetchInitialChatData,
};
