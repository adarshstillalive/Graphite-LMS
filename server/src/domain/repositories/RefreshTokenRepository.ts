import RefreshToken from '../entities/RefreshToken.js';

interface RefreshTokenRepository {
  save(refreshToken: RefreshToken): Promise<void>;
  checkToken(email: string, token: string): Promise<boolean>;
}

export default RefreshTokenRepository;
