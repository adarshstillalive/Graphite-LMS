import { UploadedFile } from 'express-fileupload';
import cloudinaryV2 from '../../config/cloudinary.js';

class InstructorUploadService {
  async uploadfile(
    file: UploadedFile,
    instructorId: string,
    folderPath: string,
  ) {
    try {
      return cloudinaryV2.uploader.upload(file.tempFilePath, {
        folder: folderPath,
        public_id: instructorId,
        width: 300,
        height: 200,
        crop: 'fill',
        gravity: 'auto',
      });
    } catch (error) {
      console.log(error);

      throw new Error('Cloudinary Error: Upload failed');
    }
  }

  async removefile(publicId: string) {
    try {
      await cloudinaryV2.uploader.destroy(publicId);
    } catch (error) {
      console.log(error);
      throw new Error('Cloudinary Error: Remove failed');
    }
  }
}

export default InstructorUploadService;
