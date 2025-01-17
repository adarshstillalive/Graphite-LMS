import { ICourse } from './Course';
import { IUser } from './User';

export interface IProduct {
  courseId: ICourse;
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
  _id?: string;
}

export interface IPopulatedOrder {
  orderId: string;
  userId: IUser;
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
  _id?: string;
}
