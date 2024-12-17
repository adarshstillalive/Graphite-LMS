import { IUserProfileUpdationFormData } from '../../../../application/useCases/instructor/instructorProfileUseCases.js';
import UserProfileRepository from '../../../../domain/repositories/user/UserProfileRepository.js';
import UserModel, { IMongoUser } from '../models/UserModel.js';

class MongoUserProfileRepository implements UserProfileRepository {
  async fetchUserById(userId: string): Promise<IMongoUser> {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new Error('user not found');
      }
      return user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in fetching instructor', error);

      throw new Error(error);
    }
  }

  async updateProfilePicture(userId: string, url: string): Promise<void> {
    try {
      const update = await UserModel.updateOne(
        { _id: userId },
        { $set: { profilePicture: url } },
      );
      if (update.modifiedCount <= 0) {
        throw new Error('Database error: Profile picture updation failed');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo error: Uploading profile picture', error);

      throw new Error(error);
    }
  }

  async updateProfileData(
    userId: string,
    userFormData: IUserProfileUpdationFormData,
  ): Promise<void> {
    try {
      const updateUser = await UserModel.updateOne(
        { _id: userId },
        { $set: userFormData },
      );
      if (updateUser.matchedCount === 0) {
        throw new Error('Mongo Error: Updating profile');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo Error: Updating profile', error);

      throw new Error(error);
    }
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    try {
      console.log(newPassword);

      const updateData = await UserModel.updateOne(
        { _id: userId },
        { $set: { password: newPassword } },
      );
      if (updateData.modifiedCount <= 0) {
        throw new Error('Database error');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in updating user Password', error);

      throw new Error(error);
    }
  }
}

export default MongoUserProfileRepository;
