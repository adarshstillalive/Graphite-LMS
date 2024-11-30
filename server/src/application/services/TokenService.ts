import User from '../../domain/entities/User.js';
import UserRepository from '../../domain/repositories/UserRepository.js';
import { verifyAccessToken } from '../../utils/jwt.js';

class TokenService {
  constructor(private userRepository: UserRepository) {}

  async verifyToken(token: string): Promise<User> {
    try {
      const { email } = await verifyAccessToken(token);

      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        throw new Error("User doesn't exist, Contact admin");
      }
      return user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error('Invalid or expired token', error);
    }
  }
}

export default TokenService;
