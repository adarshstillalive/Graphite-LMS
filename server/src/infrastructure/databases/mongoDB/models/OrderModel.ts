import mongoose, { Schema, Document } from 'mongoose';

export interface IMongoProduct {
  courseId: mongoose.Types.ObjectId;
  price: number;
  returned: boolean;
}
export interface IProduct {
  courseId: string;
  price: number;
  returned: boolean;
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
  returnedDate?: Date;
  returningReason?: string;
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
  returnedDate?: Date;
  returningReason?: string;
  createdAt?: Date;
  updatedAt?: Date;
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
    type: Boolean,
    default: false,
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
    returnedDate: {
      type: Date,
    },
    returningReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const OrderModel = mongoose.model<IMongoOrder>('Order', orderSchema);

export default OrderModel;
