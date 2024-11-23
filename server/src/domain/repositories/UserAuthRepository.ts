import UserAuth from '../entities/UserAuth.js';

interface UserAuthRepository {
  create(user: UserAuth): Promise<UserAuth>;
  findByEmail(email: string): Promise<UserAuth | null>;
}

export default UserAuthRepository;
