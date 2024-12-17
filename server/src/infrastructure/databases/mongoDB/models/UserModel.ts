import mongoose, { Schema } from 'mongoose';

export interface ISocialAccount {
  provider: 'Facebook' | 'Google' | 'X';
  createdAt?: Date;
}

export interface IUser {
  _id: string;
  firstName?: string;
  lastName?: string;
  instructorId?: string;
  email: string;
  password?: string;
  profilePicture?: string;
  isBlocked?: boolean;
  isInstructor?: boolean;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  socialAccounts?: ISocialAccount[];
  isSocialAuthenticated?: boolean;
}

export interface IMongoUser {
  _id: mongoose.Schema.Types.ObjectId;
  firstName?: string;
  lastName?: string;
  instructorId?: string;
  email: string;
  password?: string;
  profilePicture?: string;
  isBlocked?: boolean;
  isInstructor?: boolean;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  socialAccounts?: ISocialAccount[];
  isSocialAuthenticated?: boolean;
}

const userSchema: Schema<IMongoUser> = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Instructor',
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    profilePicture: {
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
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
