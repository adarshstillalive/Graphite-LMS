import { UploadedFile } from 'express-fileupload';
import InstructorUploadService from '../../../infrastructure/cloudinary/InstructorUploadService.js';
import InstructorProfieRepository from '../../../domain/repositories/instructor/InstructorProfileRepository.js';

class InstructorProfileUseCases {
  constructor(
    private instructorProfileRepository: InstructorProfieRepository,
    private instructorUploadService: InstructorUploadService,
  ) {}
  async updateProfilePicture(file: UploadedFile, instructorId: string) {
    try {
      if (!file.mimetype.startsWith('image/')) {
        throw new Error('Invalid file type. Only images are allowed.');
      }
      const folderPath = `instructor/profile_pictures`;
      const result = await this.instructorUploadService.uploadfile(
        file,
        instructorId,
        folderPath,
      );
      const imageUrl = result.secure_url;
      await this.instructorProfileRepository.updateProfilePicture(
        instructorId,
        imageUrl,
      );
      const instructorData = await this.fetchInstructor(instructorId);
      return instructorData;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase: Error in uploading profile picture', error);

      throw new Error(error);
    }
  }

  async fetchInstructor(id: string) {
    try {
      return await this.instructorProfileRepository.fetchInstructor(id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase: Error in fetching instructor data', error);

      throw new Error(error);
    }
  }
}

export default InstructorProfileUseCases;
