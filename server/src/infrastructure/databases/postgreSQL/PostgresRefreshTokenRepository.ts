import prisma from '../../orm/prismaClient.js';
import { Prisma } from '@prisma/client';
import RefreshTokenRepository from '../../../domain/repositories/RefreshTokenRepository.js';
import RefreshToken from '../../../domain/entities/RefreshToken.js';

class PostgresRefreshTokenRepository implements RefreshTokenRepository {
  async save(refreshToken: RefreshToken): Promise<void> {
    try {
      await prisma.refreshToken.upsert({
        where: {
          email: refreshToken.email,
        },
        update: {
          token: refreshToken.token,
          expiresAt: refreshToken.expiresAt,
        },
        create: {
          email: refreshToken.email,
          token: refreshToken.token,
          expiresAt: refreshToken.expiresAt,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error('Failed to save refresh token:', error);
      }
      throw error;
    }
  }

  async checkToken(email: string, token: string): Promise<boolean> {
    const tokenStatus = await prisma.refreshToken.findFirst({
      where: { email },
    });
    return tokenStatus && tokenStatus.token === token ? true : false;
  }
}

export default PostgresRefreshTokenRepository;
