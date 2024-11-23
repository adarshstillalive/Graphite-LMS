import OtpRepository from '../../../domain/repositories/OtpRepository.js';
import UserAuthRepository from '../../../domain/repositories/UserAuthRepository.js';
import UserAuth from '../../../domain/entities/UserAuth.js';
import UserRepository from '../../../domain/repositories/UserRepository.js';

class VerifyOtpAndCreateUser {
  constructor(
    private otpRepository: OtpRepository,
    private userAuthRepository: UserAuthRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(
    email: string,
    otpCode: string,
    firstName: string,
    lastName: string,
    password: string,
  ) {
    try {
      const otp = await this.otpRepository.findByEmail(email);
      const userExist = await this.userAuthRepository.findByEmail(email);

      if (userExist) {
        throw new Error('User already exists');
      }

      if (!otp || otp.code !== otpCode) {
        throw new Error('Invalid OTP');
      }

      if (otp.expiresAt < new Date()) {
        throw new Error('OTP expired');
      }

      const user = new UserAuth(firstName, lastName, email, password);
      await this.userAuthRepository.create(user);
      await this.userRepository.create(user);
      await this.otpRepository.deleteByEmail(email);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in verifying otp and creating user', error);

      throw new Error(error);
    }
  }
}

export default VerifyOtpAndCreateUser;
