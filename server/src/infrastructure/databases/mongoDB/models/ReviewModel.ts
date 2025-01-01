import mongoose, { Schema } from 'mongoose';

export interface IMongoReview {
  _id?: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  courseId: mongoose.Schema.Types.ObjectId;
  rating: number;
  review: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema: Schema<IMongoReview> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
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

reviewSchema.index({ courseId: 1 });
reviewSchema.index({ rating: 1 });
reviewSchema.index({ createdAt: -1 });
reviewSchema.index({ courseId: 1, rating: -1 });
reviewSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const ReviewModel = mongoose.model<IMongoReview>('Review', reviewSchema);

export default ReviewModel;
