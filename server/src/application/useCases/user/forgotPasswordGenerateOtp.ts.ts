import EmailOtp from '../../../domain/entities/EmailOtp.js';
import OtpRepository from '../../../domain/repositories/OtpRepository.js';
import UserAuthRepository from '../../../domain/repositories/UserAuthRepository.js';
import EmailService from '../../../infrastructure/email/EmailService.js';

class ForgotPasswordGenerateOtp {
  constructor(
    private otpRepository: OtpRepository,
    private emailService: EmailService,
    private userAuthRepository: UserAuthRepository,
  ) {}

  async execute(email: string) {
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
}

export default ForgotPasswordGenerateOtp;
