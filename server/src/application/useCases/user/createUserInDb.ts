import UserAuthRepository from '../../../domain/repositories/UserAuthRepository.js';
import UserAuth from '../../../domain/entities/UserAuth.js';
import UserRepository from '../../../domain/repositories/UserRepository.js';
import User from '../../../domain/entities/User.js';
import { ISocialAccount } from '../../../infrastructure/databases/mongoDB/models/UserModel.js';

class CreateUserInDb {
  constructor(
    private userAuthRepository: UserAuthRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ) {
    try {
      const userAuth = new UserAuth(firstName, lastName, email, password);
      await this.userAuthRepository.create(userAuth);
      const socialAccounts: ISocialAccount[] = [
        { provider: 'Google', createdAt: new Date() },
      ];
      const isSocialAuthenticated = true;
      const user = new User(
        firstName,
        lastName,
        email,
        password,
        socialAccounts,
        isSocialAuthenticated,
      );

      return await this.userRepository.create(user);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in verifying otp and creating user', error);

      throw new Error(error);
    }
  }
}

export default CreateUserInDb;
