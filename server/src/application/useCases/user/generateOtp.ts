import EmailOtp from '../../../domain/entities/EmailOtp.js';
import OtpRepository from '../../../domain/repositories/OtpRepository.js';
import EmailService from '../../../infrastructure/email/EmailService.js';

class GenerateOtp {
  constructor(
    private otpRepository: OtpRepository,
    private emailService: EmailService,
  ) {}

  async execute(email: string) {
    const otpCode = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); //10 minutes
    const otp = new EmailOtp(email, otpCode, expiresAt);

    await this.otpRepository.save(otp);

    await this.emailService.sendOtp(email, otpCode);
  }
}

export default GenerateOtp;
