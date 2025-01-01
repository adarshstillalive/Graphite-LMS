import mongoose, { Schema } from 'mongoose';
import { IMongoCourse } from './CourseModel.js';

export interface SocialAccounts {
  provider: string;
  link: string;
}

export interface IMongoInstructor {
  userId: mongoose.Schema.Types.ObjectId;
  profilePicture: string;
  expertise?: string[];
  qualifications?: string[];
  additionalInfo?: string[];
  bio?: string;
  socialAccounts?: SocialAccounts[];
  courses?: IMongoCourse[];
  rating?: number;
  reviews?: mongoose.Schema.Types.ObjectId[];
  isBlocked?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: mongoose.Schema.Types.ObjectId;
}

const instructorSchema: Schema<IMongoInstructor> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    profilePicture: {
      type: String,
    },
    expertise: {
      type: [String],
      default: [],
    },
    qualifications: {
      type: [String],
      default: [],
    },
    additionalInfo: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
    },
    socialAccounts: [
      {
        provider: {
          type: String,
        },
        link: {
          type: String,
        },
      },
    ],
    courses: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Course',
        },
        createdAt: {
          type: Date,
          required: true,
        },
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: [mongoose.Schema.Types.ObjectId],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const InstructorModel = mongoose.model('Instructor', instructorSchema);

export default InstructorModel;
