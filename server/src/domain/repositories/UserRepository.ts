import { ISocialAccount } from '../../infrastructure/databases/mongoDB/models/UserModel.js';
import User from '../entities/User.js';

interface UserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  updateSocialAuth(
    email: string,
    socialAccount: ISocialAccount,
    isSocialAuthenticated: boolean,
  ): Promise<User | null>;
}

export default UserRepository;
