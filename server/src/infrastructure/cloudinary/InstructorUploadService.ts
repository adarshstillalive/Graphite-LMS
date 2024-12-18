import { UploadedFile } from 'express-fileupload';
import cloudinaryV2 from '../../config/cloudinary.js';
import { v4 as uuidv4 } from 'uuid';

class InstructorUploadService {
  async uploadfile(
    file: UploadedFile,
    instructorId: string,
    folderPath: string,
  ) {
    try {
      const uniqueId = uuidv4();
      const publicId = `${instructorId}-${uniqueId}`;
      return cloudinaryV2.uploader.upload(file.tempFilePath, {
        folder: folderPath,
        public_id: publicId,
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

  async uploadProfilePicture(
    file: UploadedFile,
    instructorId: string,
    folderPath: string,
  ) {
    try {
      return cloudinaryV2.uploader.upload(file.tempFilePath, {
        folder: folderPath,
        public_id: instructorId,
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

  async removefile(publicId: string) {
    try {
      await cloudinaryV2.uploader.destroy(publicId);
    } catch (error) {
      console.log(error);
      throw new Error('Cloudinary Error: Remove failed');
    }
  }

  async bulkDeleteFromCloudinary(publicIds: string[]) {
    try {
      await cloudinaryV2.api.delete_resources(publicIds);
    } catch (error) {
      console.log(error);
      throw new Error('Cloudinary Error: Remove failed');
    }
  }
}

export default InstructorUploadService;
