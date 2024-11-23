import UserRepository from '../../../domain/repositories/UserRepository.js';

import User from '../../../domain/entities/User.js';
import UserModel from './models/UserModel.js';

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
      const userData = await UserModel.findOne({ email }).lean();
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
}

export default MongoUserRepository;
