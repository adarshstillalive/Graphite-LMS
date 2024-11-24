import mongoose, { Schema, Document } from 'mongoose';

export interface ISocialAccount {
  provider: 'Facebook' | 'Google' | 'X';
  createdAt?: Date;
}

export interface IUser extends Document {
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

const userSchema: Schema<IUser> = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isInstructor: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  socialAccounts: [
    {
      provider: {
        type: String,
        enum: ['Facebook', 'Google', 'X'],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  isSocialAuthenticated: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
