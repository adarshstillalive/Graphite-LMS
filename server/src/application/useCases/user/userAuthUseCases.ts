import EmailOtp from '../../../domain/entities/EmailOtp.js';
import UserAuth from '../../../domain/entities/UserAuth.js';
import OtpRepository from '../../../domain/repositories/OtpRepository.js';
import UserAuthRepository from '../../../domain/repositories/UserAuthRepository.js';
import UserRepository from '../../../domain/repositories/UserRepository.js';
import EmailService from '../../../infrastructure/email/EmailService.js';
import hashPassword, { comparePassword } from '../../../utils/hashPassword.js';

class UserAuthUseCases {
  constructor(
    private otpRepository: OtpRepository,
    private userAuthRepository: UserAuthRepository,
    private userRepository: UserRepository,
    private emailService: EmailService,
  ) {}

  async generateOtp(email: string) {
    const otpCode = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); //10 minutes
    const otp = new EmailOtp(email, otpCode, expiresAt);

    await this.otpRepository.save(otp);

    await this.emailService.sendOtp(email, otpCode);
  }

  async forgotPasswordGenerateOtp(email: string) {
    const userExist = await this.userAuthRepository.findByEmail(email);

    if (!userExist) {
      throw new Error("User doesn't exists");
    }
    const otpCode = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); //10 minutes
    const otp = new EmailOtp(email, otpCode, expiresAt);

    await this.otpRepository.save(otp);

    await this.emailService.sendOtp(email, otpCode);
  }

  async loginUser(email: string, password: string) {
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
      console.log('Error in user login', error);

      throw new Error(error);
    }
  }

  async verifyOtpAndCreateUser(
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

      const hashedPassword = await hashPassword(password);

      const user = new UserAuth(firstName, lastName, email, hashedPassword);
      await this.userAuthRepository.create(user);
      await this.userRepository.create(user);
      await this.otpRepository.deleteByEmail(email);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in verifying otp and creating user', error);

      throw new Error(error);
    }
  }

  async verifyOtpAndupdatePassword(
    email: string,
    otpCode: string,
    newPassword: string,
  ) {
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

export default UserAuthUseCases;
