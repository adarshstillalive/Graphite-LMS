import RefreshToken from '../../../domain/entities/RefreshToken.js';
import RefreshTokenRepository from '../../../domain/repositories/RefreshTokenRepository.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../../utils/jwt.js';

class GenerateAndAddTokens {
  constructor(private refreshTokenRepository: RefreshTokenRepository) {}

  async execute(email: string, role: string) {
    try {
      const accessToken = generateAccessToken({ email, role });
      const refreshToken = generateRefreshToken({ email, role });
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      const tokenObj = new RefreshToken(email, refreshToken, expiresAt);
      await this.refreshTokenRepository.save(tokenObj);
      return { accessToken, refreshToken };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in saving token', error);

      throw new Error(error);
    }
  }
}

export default GenerateAndAddTokens;
