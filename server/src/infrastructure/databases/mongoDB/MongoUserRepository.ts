import UserRepository from '../../../domain/repositories/UserRepository.js';

import User from '../../../domain/entities/User.js';
import UserModel, { ISocialAccount } from './models/UserModel.js';

class MongoUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    try {
      const newUser = new UserModel(user);
      await newUser.save();
      return newUser.toObject();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in verifying otp and creating user', error);

      throw new Error(error);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const userData = await UserModel.findOne({ email });
      if (!userData) {
        throw new Error('Database error');
      }
      if (userData?.isBlocked) {
        throw new Error('User blocked, contact Admin');
      }
      return userData;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in verifying otp and creating user', error);

      throw new Error(error);
    }
  }

  async updateSocialAuth(
    email: string,
    socialAccount: ISocialAccount,
    isSocialAuthenticated: boolean,
  ): Promise<User | null> {
    try {
      const updateData = await UserModel.updateOne(
        {
          email,
          'socialAccounts.provider': { $ne: socialAccount.provider },
        },
        {
          $set: { isSocialAuthenticated },
          $push: { socialAccounts: socialAccount },
        },
      );

      if (!updateData) {
        throw new Error('Database error');
      }
      const userData = await UserModel.findOne({ email });
      if (!userData) {
        throw new Error('Database error');
      }

      return userData;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in updating user social provider details', error);

      throw new Error(error);
    }
  }
}

export default MongoUserRepository;
