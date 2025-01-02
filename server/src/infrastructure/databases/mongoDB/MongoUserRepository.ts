import UserRepository from '../../../domain/repositories/UserRepository.js';

import User from '../../../domain/entities/User.js';
import UserModel, { ISocialAccount } from './models/UserModel.js';
import WalletModel from './models/Wallet.js';

class MongoUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    try {
      const newUser = new UserModel(user);
      const savedUser = await newUser.save();

      await WalletModel.create({ userId: savedUser._id });

      return savedUser.toObject();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in verifying otp and creating user', error);

      throw new Error(error);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const userData = await UserModel.findOne({ email })
        .populate('wishlist')
        .populate('cart')
        .populate('purchasedCourses');
      if (!userData) {
        throw new Error('Database error');
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
        {
          upsert: true,
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

  async updatePassword(email: string, newPassword: string): Promise<void> {
    try {
      const updateData = await UserModel.updateOne(
        { email: email },
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

export default MongoUserRepository;
