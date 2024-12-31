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

  async addToWishlist(userId: string, courseId: string) {
    try {
      await this.userProfileRepository.addToWishlist(userId, courseId);
      return await this.userProfileRepository.fetchUserById(userId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase: Error in adding course to wishlist', error);

      throw new Error(error);
    }
  }

  async removeFromWishlist(userId: string, courseId: string) {
    try {
      await this.userProfileRepository.removeFromWishlist(userId, courseId);
      return await this.userProfileRepository.fetchUserById(userId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase: Error in removing course from wishlist', error);

      throw new Error(error);
    }
  }

  async addToCart(userId: string, courseId: string) {
    try {
      await this.userProfileRepository.addToCart(userId, courseId);
      return await this.userProfileRepository.fetchUserById(userId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase: Error in adding course to cart', error);

      throw new Error(error);
    }
  }

  async removeFromCart(userId: string, courseId: string) {
    try {
      await this.userProfileRepository.removeFromCart(userId, courseId);
      return await this.userProfileRepository.fetchUserById(userId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase: Error in removing course from cart', error);

      throw new Error(error);
    }
  }

  async fetchPurchasedCourses(userId: string) {
    try {
      return await this.userProfileRepository.fetchPurchasedCourses(userId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase: Error in removing course from cart', error);

      throw new Error(error);
    }
  }

  async updateCourseProgress(
    userId: string,
    courseId: string,
    chapterId: string,
    episodeId: string,
    progress: number,
  ) {
    try {
      await this.userProfileRepository.updateCourseProgress(
        userId,
        courseId,
        chapterId,
        episodeId,
        progress,
      );
      return this.userProfileRepository.fetchProgress(userId, courseId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase: Error in updating progress', error);

      throw new Error(error);
    }
  }

  async fetchWallet(userId: string) {
    try {
      return await this.userProfileRepository.fetchWallet(userId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase: Error in fetching wallet', error);

      throw new Error(error);
    }
  }

  async fetchProgress(userId: string, courseId: string) {
    try {
      return await this.userProfileRepository.fetchProgress(userId, courseId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase: Error in fetching progress', error);

      throw new Error(error);
    }
  }
}

export default UserProfileUseCases;
