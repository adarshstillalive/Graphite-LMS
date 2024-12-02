import { UploadedFile } from 'express-fileupload';
import cloudinaryV2 from '../../config/cloudinary.js';

class InstructorUploadService {
  async uploadfile(
    file: UploadedFile,
    instructorId: string,
    folderPath: string,
  ) {
    console.log(folderPath);

    return cloudinaryV2.uploader.upload(file.tempFilePath, {
      folder: folderPath,
      public_id: instructorId,
      overwrite: true,
    });
  }
}

export default InstructorUploadService;
