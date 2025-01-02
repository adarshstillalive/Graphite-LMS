import mongoose, { Schema, Document } from 'mongoose';

export interface IMongoProduct {
  courseId: mongoose.Types.ObjectId;
  price: number;
  returned?: string;
  returnedDate?: Date;
  returningReason?: string;
}
export interface IProduct {
  courseId: string;
  price: number;
  returned?: string;
  returnedDate?: Date;
  returningReason?: string;
}

export interface IOrder {
  orderId: string;
  userId: string;
  courses: IProduct[];
  totalAmount: number;
  coupon?: string;
  orderStatus?: string;
  paymentMethod: string;
  cancelledDate?: Date;
  cancellingReason?: string;
  isInstructorPaymentCompleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMongoOrder extends Document {
  orderId: string;
  userId: mongoose.Types.ObjectId;
  courses: IMongoProduct[];
  totalAmount: number;
  coupon?: string;
  orderStatus?: string;
  paymentMethod: string;
  cancelledDate?: Date;
  cancellingReason?: string;
  isInstructorPaymentCompleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  _id: mongoose.Schema.Types.ObjectId;
}

const productSchema: Schema<IMongoProduct> = new Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Course',
  },
  price: {
    type: Number,
    required: true,
  },
  returned: {
    type: String,
    enum: ['Approved', 'Rejected', 'Pending'],
  },
  returnedDate: {
    type: Date,
  },
  returningReason: {
    type: String,
  },
});

const orderSchema: Schema<IMongoOrder> = new Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    courses: [productSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
    coupon: {
      type: String,
    },
    orderStatus: {
      type: String,
      enum: ['Order Completed', 'Cancelled', 'Returned', 'Payment Failed'],
      default: 'Order Completed',
    },
    paymentMethod: {
      type: String,
      enum: ['Paypal', 'Wallet'],
      required: true,
    },
    cancelledDate: {
      type: Date,
    },
    cancellingReason: {
      type: String,
    },
    isInstructorPaymentCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const OrderModel = mongoose.model<IMongoOrder>('Order', orderSchema);

export default OrderModel;
