import { UploadedFile } from 'express-fileupload';
import cloudinaryV2 from '../../config/cloudinary.js';

class InstructorUploadService {
  async uploadfile(
    file: UploadedFile,
    folderPath: string,
    instructorId: string,
  ) {
    return cloudinaryV2.uploader.upload(file.tempFilePath, {
      folder: folderPath,
      public_id: `instructor/${instructorId}`,
      overwrite: true,
    });
  }
}

export default InstructorUploadService;
