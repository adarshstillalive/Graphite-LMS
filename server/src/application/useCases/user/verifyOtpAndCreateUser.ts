import OtpRepository from '../../../domain/repositories/OtpRepository.js';
import UserRepository from '../../../domain/repositories/UserRepository.js';
import User from '../../../domain/entities/User.js';

class VerifyOtpAndCreateUser {
  constructor(
    private otpRepository: OtpRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(
    email: string,
    otpCode: string,
    firstName: string,
    lastName: string,
    password: string,
  ) {
    const otp = await this.otpRepository.findByEmail(email);
    if (!otp || otp.code !== otpCode) {
      throw new Error('Invalid OTP');
    }

    if (otp.expiresAt < new Date()) {
      throw new Error('OTP expired');
    }

    const user = new User(firstName, lastName, email, password);
    await this.userRepository.create(user);
    await this.otpRepository.deleteByEmail(email);
  }
}

export default VerifyOtpAndCreateUser;
