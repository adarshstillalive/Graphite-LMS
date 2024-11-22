import UserRepository from '../../../domain/repositories/UserRepository.js';
import User from '../../../domain/entities/User.js';
import prisma from '../../orm/prismaClient.js';

class PostgresUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const newUser = await prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      },
    });
    return new User(
      newUser.firstName,
      newUser.lastName,
      newUser.email,
      newUser.password,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const userRecord = await prisma.user.findUnique({ where: { email } });
    return userRecord
      ? new User(
          userRecord.firstName,
          userRecord.lastName,
          userRecord.email,
          userRecord.password,
        )
      : null;
  }
}

export default PostgresUserRepository;
