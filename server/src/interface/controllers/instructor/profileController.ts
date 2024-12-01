import { Request, Response } from 'express';
import { createResponse } from '../../../utils/createResponse.js';
import { UploadedFile } from 'express-fileupload';
import UpdateProfilePicture from '../../../application/useCases/instructor/updateProfilePicture.js';
import MongoInstructorRepository from '../../../infrastructure/databases/mongoDB/MongoInstructorRepository.js';
import InstructorUploadService from '../../../infrastructure/cloudinary/InstructorUploadService.js';

const instructorRepository = new MongoInstructorRepository();
const instructorUploadService = new InstructorUploadService();
const updateProfilePicture = new UpdateProfilePicture(
  instructorRepository,
  instructorUploadService,
);

const updateInstructorProfilePicture = async (req: Request, res: Response) => {
  try {
    if (!req.files || !req.files.file) {
      throw new Error('Error fetching image');
    }
    const file = req.files.file as UploadedFile;
    const userId = req.user?._id;
    if (!userId) {
      throw new Error('Server error');
    }
    const instructorData = await updateProfilePicture.execute(file, userId);

    res
      .status(200)
      .json(createResponse(true, 'Profile picture updated', instructorData));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

export default { updateInstructorProfilePicture };
