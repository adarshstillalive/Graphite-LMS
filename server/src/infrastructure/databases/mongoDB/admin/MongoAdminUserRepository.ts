import AdminUserRepository from '../../../../domain/repositories/admin/AdminUserRepository.js';
import UserModel, { IMongoUser } from '../models/UserModel.js';

class MongoAdminUserRepository implements AdminUserRepository {
  async userAction(id: string): Promise<IMongoUser> {
    try {
      const userData = await UserModel.findById(id);
      if (!userData) {
        throw new Error('Database Error');
      }

      userData.isBlocked = !userData.isBlocked;
      const updatedUser = await userData.save();
      return updatedUser;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Action failed:', error);
      throw new Error(error.message || 'User action failed');
    }
  }
}

export default MongoAdminUserRepository;
