import { UploadedFile } from 'express-fileupload';
import cloudinaryV2 from '../../config/cloudinary.js';

class UserUploadService {
  async uploadProfilePicture(
    file: UploadedFile,
    userId: string,
    folderPath: string,
  ) {
    try {
      return cloudinaryV2.uploader.upload(file.tempFilePath, {
        folder: folderPath,
        public_id: userId,
        overwrite: true,
        width: 300,
        height: 300,
        crop: 'fill',
        gravity: 'auto',
      });
    } catch (error) {
      console.log(error);

      throw new Error('Cloudinary Error: Upload failed');
    }
  }
}

export default UserUploadService;
