import RefreshTokenRepository from '../../../domain/repositories/RefreshTokenRepository.js';
import { generateAccessToken, verifyRefreshToken } from '../../../utils/jwt.js';

class RefreshAccessToken {
  constructor(private refreshTokenRepository: RefreshTokenRepository) {}

  async execute(email: string, refreshToken: string) {
    const checkRefreshTokenInDb = await this.refreshTokenRepository.checkToken(
      email,
      refreshToken,
    );
    console.log(checkRefreshTokenInDb, 'checking in sql');

    if (!checkRefreshTokenInDb) {
      throw new Error('Invalid refresh token');
    }
    const verifiedRefreshToken = await verifyRefreshToken(refreshToken);

    return generateAccessToken({
      email: verifiedRefreshToken.email,
      role: verifiedRefreshToken.role,
    });
  }
}

export default RefreshAccessToken;
