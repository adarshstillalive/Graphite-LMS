import mongoose, { Schema, Document } from 'mongoose';
import { IMongoInstructor } from './InstructorModel.js';
import { IMongoOrder } from './OrderModel.js';

export interface IMongoInstructorPaymentLogPopulated {
  instructorId: IMongoInstructor;
  orderId: IMongoOrder;
  totalAmount: number;
  creditedAmount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMongoInstructorPaymentLog extends Document {
  instructorId: mongoose.Schema.Types.ObjectId;
  orderId: mongoose.Schema.Types.ObjectId;
  totalAmount: number;
  creditedAmount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const instructorPaymentLogSchema: Schema<IMongoInstructorPaymentLog> =
  new Schema(
    {
      instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Instructor',
      },
      orderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Order',
      },
      totalAmount: {
        type: Number,
        required: true,
      },
      creditedAmount: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ['Success', 'Failed'],
        required: true,
        default: 'Success',
      },
    },
    {
      timestamps: true,
    },
  );

instructorPaymentLogSchema.index({ instructorId: 1 });
instructorPaymentLogSchema.index({ orderId: 1 });

const InstructorPaymentLogModel = mongoose.model<IMongoInstructorPaymentLog>(
  'InstructorPaymentLog',
  instructorPaymentLogSchema,
);

export default InstructorPaymentLogModel;
