import mongoose, { Schema } from 'mongoose';
import { IInstructor } from '../../../../domain/entities/Instructor.js';

const instructorSchema: Schema<IInstructor> = new Schema(
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
    courses: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
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
