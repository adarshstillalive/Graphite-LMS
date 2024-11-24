import UserAuthRepository from '../../../domain/repositories/UserAuthRepository.js';
import UserRepository from '../../../domain/repositories/UserRepository.js';
import { ISocialAccount } from '../../../infrastructure/databases/mongoDB/models/UserModel.js';
import { signin } from '../../../utils/googleSignin.js';
import CreateUserInDb from '../user/createUserInDb.js';

class GoogleAuth {
  constructor(
    private userRepository: UserRepository,
    private userAuthRepository: UserAuthRepository,
    private createUserInDb: CreateUserInDb,
  ) {}

  async execute(credential: string) {
    try {
      const { email, name } = await signin(credential);
      const userAuth = await this.userAuthRepository.findByEmail(email);

      if (!userAuth) {
        const firstName = name?.split(' ')[0] || '';
        const lastName = name?.split(' ')[1] || '';
        const user = await this.createUserInDb.execute(
          email,
          firstName,
          lastName,
          '',
        );
        return { user, email };
      } else {
        const socialAccount: ISocialAccount = {
          provider: 'Google',
          createdAt: new Date(),
        };

        const isSocialAuthenticated = true;
        const user = await this.userRepository.updateSocialAuth(
          email,
          socialAccount,
          isSocialAuthenticated,
        );
        if (!user) {
          throw new Error('Database error');
        }
        return { user, email };
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in Google authentication', error);

      throw new Error(error);
    }
  }
}

export default GoogleAuth;
