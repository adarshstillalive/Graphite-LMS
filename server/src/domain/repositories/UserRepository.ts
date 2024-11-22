import User from '../entities/User.js';

interface UserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}

export default UserRepository;
