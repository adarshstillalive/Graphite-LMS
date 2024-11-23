import UserAuthRepository from '../../../domain/repositories/UserAuthRepository.js';
import { comparePassword } from '../../../utils/hashPassword.js';

class LoginUser {
  constructor(private userAuthRepository: UserAuthRepository) {}

  async execute(email: string, password: string) {
    try {
      const user = await this.userAuthRepository.findByEmail(email);
      if (!user) {
        throw new Error("User doesn't exist");
      }
      const checkPassword = await comparePassword(password, user.password);
      if (!checkPassword) {
        throw new Error('Wrong password');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in verifying otp and creating user', error);

      throw new Error(error);
    }
  }
}

export default LoginUser;
