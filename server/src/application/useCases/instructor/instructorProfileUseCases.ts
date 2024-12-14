import { UploadedFile } from 'express-fileupload';
import InstructorUploadService from '../../../infrastructure/cloudinary/InstructorUploadService.js';
import InstructorProfieRepository from '../../../domain/repositories/instructor/InstructorProfileRepository.js';

interface ISocialAccount {
  provider: string;
  link: string;
}

export interface IUserProfileUpdationFormData {
  firstName: string;
  lastName: string;
}

export interface IInstructorProfileUpdationFormData {
  bio: string;
  expertise: string[];
  education: string[];
  socialAccounts: ISocialAccount[];
}

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
      const result = await this.instructorUploadService.uploadProfilePicture(
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

  async updateProfileData(
    id: string,
    userFormData: IUserProfileUpdationFormData,
    instructorFormData: IInstructorProfileUpdationFormData,
  ) {
    try {
      await this.instructorProfileRepository.updateProfileData(
        id,
        userFormData,
        instructorFormData,
      );
      return await this.fetchInstructor(id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase: Error in updating profile data', error);

      throw new Error(error);
    }
  }
}

export default InstructorProfileUseCases;
