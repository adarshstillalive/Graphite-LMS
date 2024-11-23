import { Request, Response } from 'express';
import RefreshAccessToken from '../../../application/useCases/token/refreshAccessToken.js';
import PostgresRefreshTokenRepository from '../../../infrastructure/databases/postgreSQL/PostgresRefreshTokenRepository.js';
import { createResponse } from '../../../utils/createResponse.js';

const refreshTokenRepository = new PostgresRefreshTokenRepository();
const refreshAccessToken = new RefreshAccessToken(refreshTokenRepository);

const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;
    const { email } = req.body;

    if (!refreshToken) {
      res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const accessToken = await refreshAccessToken.execute(email, refreshToken);

    const data = { accessToken };

    res
      .status(201)
      .json(createResponse(true, 'Access token created successfully', data));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

export default {
  refreshToken,
};
