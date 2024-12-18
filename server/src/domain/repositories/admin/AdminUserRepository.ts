import { IMongoUser } from '../../../infrastructure/databases/mongoDB/models/UserModel.js';

interface AdminUserRepository {
  userAction(id: string): Promise<IMongoUser>;
}

export default AdminUserRepository;
