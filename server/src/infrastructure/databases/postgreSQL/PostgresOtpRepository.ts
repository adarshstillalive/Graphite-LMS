import OtpRepository from '../../../domain/repositories/OtpRepository.js';
import EmailOtp from '../../../domain/entities/EmailOtp.js';
import prisma from '../../orm/prismaClient.js';
import { Prisma } from '@prisma/client';

class PostgresOtpRepository implements OtpRepository {
  async save(otp: EmailOtp): Promise<void> {
    try {
      await prisma.otp.upsert({
        where: {
          email: otp.email,
        },
        update: {
          code: otp.code,
          expiresAt: otp.expiresAt,
        },
        create: {
          email: otp.email,
          code: otp.code,
          expiresAt: otp.expiresAt,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error('Failed to save OTP:', error);
      }
      throw error;
    }
  }

  async findByEmail(email: string): Promise<EmailOtp | null> {
    const otpRecord = await prisma.otp.findFirst({ where: { email } });
    return otpRecord
      ? new EmailOtp(otpRecord.email, otpRecord.code, otpRecord.expiresAt)
      : null;
  }

  async deleteByEmail(email: string): Promise<void> {
    await prisma.otp.deleteMany({ where: { email } });
  }
}

export default PostgresOtpRepository;
