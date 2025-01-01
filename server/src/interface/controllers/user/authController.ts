import { Request, Response } from 'express';
import PostgresOtpRepository from '../../../infrastructure/databases/postgreSQL/PostgresOtpRepository.js';
import PostgresUserRepository from '../../../infrastructure/databases/postgreSQL/PostgresUserRepository.js';
import EmailService from '../../../infrastructure/email/EmailService.js';

import MongoUserRepository from '../../../infrastructure/databases/mongoDB/MongoUserRepository.js';
import GenerateAndAddTokens from '../../../application/useCases/token/generateAndAddTokens.js';
import PostgresRefreshTokenRepository from '../../../infrastructure/databases/postgreSQL/PostgresRefreshTokenRepository.js';
import { createResponse } from '../../../utils/createResponse.js';
import GoogleAuth from '../../../application/useCases/social/googleAuth.js';
import UserAuthUseCases from '../../../application/useCases/user/userAuthUseCases.js';

const otpRepository = new PostgresOtpRepository();
const userAuthRepository = new PostgresUserRepository();
const userRepository = new MongoUserRepository();
const refreshTokenRepository = new PostgresRefreshTokenRepository();
const emailService = new EmailService();

const userAuthUseCases = new UserAuthUseCases(
  otpRepository,
  userAuthRepository,
  userRepository,
  emailService,
);

const generateAndAddToken = new GenerateAndAddTokens(refreshTokenRepository);
const googleAuth = new GoogleAuth(userRepository, userAuthRepository);

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

const verifyAndSignup = async (req: Request, res: Response) => {
  const { email, otp, firstName, lastName, password } = req.body.data;

  try {
    await userAuthUseCases.verifyOtpAndCreateUser(
      email,
      otp,
      firstName,
      lastName,
      password,
    );

    const { accessToken, refreshToken } = await generateAndAddToken.execute(
      email,
      'User',
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const user = await userRepository.findByEmail(email);

    const data = { user, accessToken };

    res
      .status(201)
      .json(createResponse(true, 'User created successfully', data));
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

    const { accessToken, refreshToken } = await generateAndAddToken.execute(
      email,
      'User',
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const data = { user, accessToken };

    res.status(200).json(createResponse(true, 'Login successful', data));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const googleSignIn = async (req: Request, res: Response) => {
  try {
    const { credential } = req.body;
    const { user, email } = await googleAuth.execute(credential);
    const { accessToken, refreshToken } = await generateAndAddToken.execute(
      email,
      'User',
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const data = { user, accessToken };

    res.status(200).json(createResponse(true, 'Login successful', data));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const forgotPasswordRequestOtp = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    await userAuthUseCases.forgotPasswordGenerateOtp(email);
    res.status(200).json(createResponse(true, 'OTP sent to email'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const updatePassword = async (req: Request, res: Response) => {
  const { email, otp, password } = req.body;

  try {
    await userAuthUseCases.verifyOtpAndupdatePassword(email, otp, password);

    res.status(200).json(createResponse(true, 'Password updated successfully'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

export default {
  requestOtp,
  verifyAndSignup,
  login,
  googleSignIn,
  forgotPasswordRequestOtp,
  updatePassword,
};
