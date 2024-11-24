import { ISocialAccount } from '../../infrastructure/databases/mongoDB/models/UserModel.js';

class User {
  constructor(
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public password?: string,
    public socialAccounts?: ISocialAccount[],
    public isSocialAuthenticated?: boolean,
    public isInstructor?: boolean,
    public isAdmin?: boolean,
    public isBlocked?: boolean,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}

export default User;
