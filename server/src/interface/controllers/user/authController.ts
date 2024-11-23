import { Request, Response } from 'express';
import GenerateOtp from '../../../application/useCases/user/generateOtp.js';
import VerifyOtpAndCreateUser from '../../../application/useCases/user/verifyOtpAndCreateUser.js';
import PostgresOtpRepository from '../../../infrastructure/databases/postgreSQL/PostgresOtpRepository.js';
import PostgresUserRepository from '../../../infrastructure/databases/postgreSQL/PostgresUserRepository.js';
import EmailService from '../../../infrastructure/email/EmailService.js';
import hashPassword from '../../../helpers/hashPassword.js';
import MongoUserRepository from '../../../infrastructure/databases/mongoDB/MongoUserRepository.js';

const otpRepository = new PostgresOtpRepository();
const userAuthRepository = new PostgresUserRepository();
const userRepository = new MongoUserRepository();
const emailService = new EmailService();

const generateOtp = new GenerateOtp(otpRepository, emailService);
const verifyOtpAndCreateUser = new VerifyOtpAndCreateUser(
  otpRepository,
  userAuthRepository,
  userRepository,
);

const requestOtp = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    await generateOtp.execute(email);
    res.status(200).json({
      success: true,
      message: 'OTP sent to email',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error?.message,
    });
  }
};

const verifyAndSignup = async (req: Request, res: Response) => {
  const { email, otp, firstName, lastName, password } = req.body.data;

  try {
    const hashedPassword = await hashPassword(password);

    await verifyOtpAndCreateUser.execute(
      email,
      otp,
      firstName,
      lastName,
      hashedPassword,
    );

    const user = await userRepository.findByEmail(email);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error?.message,
    });
  }
};

export default {
  requestOtp,
  verifyAndSignup,
};
