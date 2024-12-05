import { Request, Response } from 'express';
import PostgresOtpRepository from '../../../infrastructure/databases/postgreSQL/PostgresOtpRepository.js';
import PostgresUserRepository from '../../../infrastructure/databases/postgreSQL/PostgresUserRepository.js';
import EmailService from '../../../infrastructure/email/EmailService.js';

import MongoUserRepository from '../../../infrastructure/databases/mongoDB/MongoUserRepository.js';
import GenerateAndAddTokens from '../../../application/useCases/token/generateAndAddTokens.js';
import PostgresRefreshTokenRepository from '../../../infrastructure/databases/postgreSQL/PostgresRefreshTokenRepository.js';
import { createResponse } from '../../../utils/createResponse.js';
import UserAuthUseCases from '../../../application/useCases/user/userAuthUseCases.js';

const otpRepository = new PostgresOtpRepository();
const userAuthRepository = new PostgresUserRepository();
const userRepository = new MongoUserRepository();
const refreshTokenRepository = new PostgresRefreshTokenRepository();
const emailService = new EmailService();

const generateAndAddToken = new GenerateAndAddTokens(refreshTokenRepository);
const userAuthUseCases = new UserAuthUseCases(
  otpRepository,
  userAuthRepository,
  userRepository,
  emailService,
);

const requestOtp = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    await userAuthUseCases.generateOtp(email);
    res.status(200).json(createResponse(true, 'OTP sent to email'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    await userAuthUseCases.loginUser(email, password);
    const user = await userRepository.findByEmail(email);

    if (!user?.isAdmin) {
      throw new Error('Not a valid admin');
    }
    const { accessToken, refreshToken } = await generateAndAddToken.execute(
      email,
      'Admin',
    );

    res.cookie('adminRefreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const data = { user, accessToken };

    res.status(200).json(createResponse(true, 'Login successful', data));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

export default {
  requestOtp,
  login,
};
