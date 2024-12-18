export interface ISocialAccount {
  provider: 'Facebook' | 'Google' | 'X';
  socialToken: string;
  createdAt?: Date;
}

export interface IUser {
  firstName?: string;
  lastName?: string;
  instructorId: string;
  email?: string;
  password?: string;
  profilePicture: string;
  isBlocked?: boolean;
  isInstructor?: boolean;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  socialAccounts?: ISocialAccount[];
  isSocialAuthenticated?: boolean;
  _id: string;
}
