import { UploadedFile } from 'express-fileupload';
import InstructorRepository from '../../../domain/repositories/InstructorRepository.js';
import InstructorUploadService from '../../../infrastructure/cloudinary/InstructorUploadService.js';

class UpdateProfilePicture {
  constructor(
    private instructorRepository: InstructorRepository,
    private instructorUploadService: InstructorUploadService,
  ) {}
  async execute(file: UploadedFile, instructorId: string) {
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
    await this.instructorRepository.updateProfilePicture(
      instructorId,
      imageUrl,
    );
    const instructorData =
      await this.instructorRepository.fetchInstructor(instructorId);
    return instructorData;
  }
}

export default UpdateProfilePicture;
