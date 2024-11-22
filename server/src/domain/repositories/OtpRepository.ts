import EmailOtp from '../entities/EmailOtp.js';

interface OtpRepository {
  save(otp: EmailOtp): Promise<void>;
  findByEmail(email: string): Promise<EmailOtp | null>;
  deleteByEmail(email: string): Promise<void>;
}

export default OtpRepository;
