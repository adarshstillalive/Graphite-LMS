import { ISocialAccount } from '../../infrastructure/databases/mongoDB/models/UserModel.js';

class User {
  constructor(
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public password?: string,
    public isBlocked?: boolean,
    public createdAt?: Date,
    public updatedAt?: Date,
    public socialAccounts?: ISocialAccount[],
    public isSocialAuthenticated?: boolean,
  ) {}
}

export default User;
