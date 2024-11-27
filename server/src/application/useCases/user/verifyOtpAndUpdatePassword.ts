import OtpRepository from '../../../domain/repositories/OtpRepository.js';
import UserAuthRepository from '../../../domain/repositories/UserAuthRepository.js';
import UserRepository from '../../../domain/repositories/UserRepository.js';
import { hashPassword } from '../../../utils/hashPassword.js';

class VerifyOtpAndUpdatePassword {
  constructor(
    private otpRepository: OtpRepository,
    private userAuthRepository: UserAuthRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(email: string, otpCode: string, newPassword: string) {
    try {
      const otp = await this.otpRepository.findByEmail(email);
      const userExist = await this.userAuthRepository.findByEmail(email);

      if (!userExist) {
        throw new Error("User doesn't exists");
      }

      if (!otp || otp.code !== otpCode) {
        throw new Error('Invalid OTP');
      }

      if (otp.expiresAt < new Date()) {
        throw new Error('OTP expired');
      }
      const hashedPassword = await hashPassword(newPassword);

      await this.userAuthRepository.updatePassword(email, hashedPassword);
      await this.userRepository.updatePassword(email, hashedPassword);
      await this.otpRepository.deleteByEmail(email);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in verifying otp and updating password', error);

      throw new Error(error);
    }
  }
}

export default VerifyOtpAndUpdatePassword;
