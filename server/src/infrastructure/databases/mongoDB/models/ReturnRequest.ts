import mongoose, { Schema } from 'mongoose';
import { IMongoOrder } from './OrderModel.js';
import { IMongoUser } from './UserModel.js';
import { IMongoCourse } from './CourseModel.js';

export interface IMongoReturn {
  orderId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  itemId: mongoose.Schema.Types.ObjectId;
  price: number;
  reason: string;
  isApproved: boolean;
  isRejected: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface IPopulatedReturnRequests {
  orderId: IMongoOrder;
  userId: IMongoUser;
  itemId: IMongoCourse;
  price: number;
  reason: string;
  isApproved: boolean;
  isRejected: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const returnSchema: Schema<IMongoReturn> = new Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Order',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
    price: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isRejected: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const ReturnModel = mongoose.model<IMongoReturn>('Return', returnSchema);

export default ReturnModel;
