import User from '../domain/entities/User.ts';
import { IMongoUser } from '../infrastructure/databases/mongoDB/models/UserModel.ts';

declare global {
  namespace Express {
    interface Request {
      user?: User | IMongoUser;
    }
  }
}
