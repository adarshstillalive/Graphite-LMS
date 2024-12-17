import { UploadedFile } from 'express-fileupload';
import UserProfileRepository from '../../../domain/repositories/user/UserProfileRepository.js';
import UserUploadService from '../../../infrastructure/cloudinary/userUploadService.js';
import { IUserProfileUpdationFormData } from '../instructor/instructorProfileUseCases.js';
import hashPassword, { comparePassword } from '../../../utils/hashPassword.js';
import UserAuthRepository from '../../../domain/repositories/UserAuthRepository.js';

export interface ChangePasswordCredentials {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

class UserProfileUseCases {
  constructor(
    private userAuthRepository: UserAuthRepository,
    private userProfileRepository: UserProfileRepository,
    private userUploadService: UserUploadService,
  ) {}

  async updateProfilePicture(file: UploadedFile, userId: string) {
    try {
      if (!file.mimetype.startsWith('image/')) {
        throw new Error('Invalid file type. Only images are allowed.');
      }
      const folderPath = `user/profile_pictures`;
      const result = await this.userUploadService.uploadProfilePicture(
        file,
        userId,
        folderPath,
      );
      const imageUrl = result.secure_url;
      await this.userProfileRepository.updateProfilePicture(userId, imageUrl);
      const userData = await this.userProfileRepository.fetchUserById(userId);
      return userData;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase: Error in uploading profile picture', error);

      throw new Error(error);
    }
  }

  async updateProfileData(
    id: string,
    userFormData: IUserProfileUpdationFormData,
  ) {
    try {
      await this.userProfileRepository.updateProfileData(id, userFormData);
      return await this.userProfileRepository.fetchUserById(id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase: Error in updating profile data', error);

      throw new Error(error);
    }
  }

  async changePassword(
    email: string,
    userId: string,
    credentials: ChangePasswordCredentials,
  ) {
    try {
      if (credentials.password !== credentials.confirmPassword) {
        throw new Error('UseCase Error: Enter valid password');
      }
      const user = await this.userProfileRepository.fetchUserById(userId);
      if (!user.password) {
        throw new Error('Usecase Error: Fetching from DB');
      }
      const verify = await comparePassword(
        credentials.currentPassword,
        user.password,
      );
      if (!verify) {
        throw new Error('UseCase Error: Enter valid password');
      }
      const hashedPassword = await hashPassword(credentials.password);
      await this.userAuthRepository.updatePassword(email, hashedPassword);
      await this.userProfileRepository.updatePassword(userId, hashedPassword);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase: Error in updating profile data', error);

      throw new Error(error);
    }
  }
}

export default UserProfileUseCases;
