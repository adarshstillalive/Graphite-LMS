import UserRepository from '../../../domain/repositories/UserRepository.js';

import User from '../../../domain/entities/User.js';
import UserModel from './models/UserModel.js';

class MongoUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const newUser = new UserModel(user);
    await newUser.save();
    return newUser.toObject();
  }

  async findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email }).lean();
  }
}

export default MongoUserRepository;
