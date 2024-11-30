import mongoose, { Schema, Document } from 'mongoose';

export interface ISocialAccount {
  provider: 'Facebook' | 'Google' | 'X';
  createdAt?: Date;
}

export interface IUser extends Document {
  _id: string;
  firstName?: string;
  lastName?: string;
  instructorId?: string;
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

const userSchema: Schema<IUser> = new Schema(
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

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
