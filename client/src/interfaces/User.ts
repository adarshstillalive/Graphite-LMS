export interface ISocialAccount {
  provider: 'Facebook' | 'Google' | 'X';
  socialToken: string;
  createdAt?: Date;
}

export interface User {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  isBlocked?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  socialAccounts?: ISocialAccount[];
  isSocialAuthenticated?: boolean;
}
