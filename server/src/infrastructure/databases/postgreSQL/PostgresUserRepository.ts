import UserAuth from '../../../domain/entities/UserAuth.js';
import prisma from '../../orm/prismaClient.js';
import UserAuthRepository from '../../../domain/repositories/UserAuthRepository.js';

class PostgresUserRepository implements UserAuthRepository {
  async create(user: UserAuth): Promise<UserAuth> {
    try {
      const newUser = await prisma.user.create({
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
        },
      });

      return new UserAuth(
        newUser.firstName,
        newUser.lastName,
        newUser.email,
        newUser.password,
      );
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  async findByEmail(email: string): Promise<UserAuth | null> {
    try {
      const userRecord = await prisma.user.findUnique({ where: { email } });
      return userRecord
        ? new UserAuth(
            userRecord.firstName,
            userRecord.lastName,
            userRecord.email,
            userRecord.password,
          )
        : null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new Error('Failed to find user');
    }
  }

  async updatePassword(email: string, newPassword: string): Promise<void> {
    try {
      const updatedUser = await prisma.user.update({
        where: { email },
        data: { password: newPassword },
      });

      if (!updatedUser) {
        throw new Error('Database error');
      }

      console.log('Password updated successfully');
    } catch (error) {
      console.error('Error updating password:', error);
      throw new Error('Failed to update password');
    }
  }
}

export default PostgresUserRepository;
