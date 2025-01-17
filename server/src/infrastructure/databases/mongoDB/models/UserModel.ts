import mongoose, { Schema } from 'mongoose';
import { IMongoCoursePopulated } from './CourseModel.js';
import { ICourse } from '../../../../domain/entities/Course.js';

export interface ISocialAccount {
  provider: 'Facebook' | 'Google' | 'X';
  createdAt?: Date;
}

export interface ICompletePopulatedUser {
  _id: mongoose.Schema.Types.ObjectId;
  firstName?: string;
  lastName?: string;
  instructorId?: string;
  email: string;
  password?: string;
  profilePicture?: string;
  cart?: IMongoCoursePopulated[];
  wishlist?: IMongoCoursePopulated[];
  purchasedCourses: IMongoCoursePopulated[];
  isBlocked?: boolean;
  isInstructor?: boolean;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  socialAccounts?: ISocialAccount[];
  isSocialAuthenticated?: boolean;
}

export interface IUser {
  _id: string;
  firstName?: string;
  lastName?: string;
  instructorId?: string;
  email: string;
  password?: string;
  profilePicture?: string;
  cart?: string[];
  wishlist?: string[];
  purchasedCourses: string[];
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
  cart?: mongoose.Schema.Types.ObjectId[];
  wishlist?: mongoose.Schema.Types.ObjectId[];
  purchasedCourses: mongoose.Schema.Types.ObjectId[];
  isBlocked?: boolean;
  isInstructor?: boolean;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  socialAccounts?: ISocialAccount[];
  isSocialAuthenticated?: boolean;
}

export interface IMongoUserPopulated {
  _id: mongoose.Schema.Types.ObjectId;
  firstName?: string;
  lastName?: string;
  instructorId?: string;
  email: string;
  password?: string;
  profilePicture?: string;
  cart?: ICourse[];
  wishlist?: ICourse[];
  purchasedCourses: ICourse[];
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
    cart: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Course',
    },
    wishlist: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Course',
    },
    purchasedCourses: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Course',
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
