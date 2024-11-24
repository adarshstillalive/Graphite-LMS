export interface ISocialAccount {
  provider: 'Facebook' | 'Google' | 'X';
  socialToken: string;
  createdAt?: Date;
}

export interface IUser {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  isBlocked?: boolean;
  isInstructor?: boolean;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  socialAccounts?: ISocialAccount[];
  isSocialAuthenticated?: boolean;
}
