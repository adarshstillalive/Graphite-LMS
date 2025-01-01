import mongoose, { Schema } from 'mongoose';

export interface IMongoInstructorReview {
  _id?: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  instructorId: mongoose.Schema.Types.ObjectId;
  rating: number;
  review: string;
  createdAt: Date;
  updatedAt: Date;
}

const instructorReviewSchema: Schema<IMongoInstructorReview> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Instructor',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

instructorReviewSchema.index({ instructorId: 1 });
instructorReviewSchema.index({ rating: 1 });
instructorReviewSchema.index({ createdAt: -1 });
instructorReviewSchema.index({ instructorId: 1, rating: -1 });
instructorReviewSchema.index({ userId: 1, instructorId: 1 }, { unique: true });

const InstructorReviewModel = mongoose.model<IMongoInstructorReview>(
  'InstructorReview',
  instructorReviewSchema,
);

export default InstructorReviewModel;
